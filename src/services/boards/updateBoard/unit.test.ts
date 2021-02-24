import boardsModel from "@models/boards";
import { NOT_FOUND_ID, OK_TEST_ID, WRONG_TEST_ID } from "@utils/const";
import updateBoard from "./index";

boardsModel.findOneAndUpdate = jest.fn();

const body = "sdfsfsd";
const category = "React";
const hashtag = ["df", "asd"];
const thumbnail = "asdad";
const title = "qweqwewqe";

describe("updateBoard Service", () => {
  it("updateBoard 함수를 호출한다", () => {
    expect(typeof updateBoard).toBe("function");
  });

  it("findOneAndUpdate를 호출한다", async () => {
    await updateBoard({ body, category, hashtag, id: OK_TEST_ID, thumbnail, title });
    expect(boardsModel.findOneAndUpdate).toBeCalledWith(
      { _id: OK_TEST_ID },
      { body, category, hashtag, thumbnail, title },
      { new: true },
    );
  });

  it("게시글을 찾지 못할 경우 NOT FOUND ID를 리턴한다", async () => {
    const result = await updateBoard({ body, category, hashtag, id: WRONG_TEST_ID, thumbnail, title });
    expect(result).toBe(NOT_FOUND_ID);
  });

  it("변경 된 게시글 데이터를 리턴한다", async () => {
    const data = { body, category, hashtag, id: WRONG_TEST_ID, thumbnail, title };
    boardsModel.findOneAndUpdate = jest.fn().mockReturnValue(data);
    const result = await updateBoard(data);
    expect(result).toStrictEqual(data);
  });
});
