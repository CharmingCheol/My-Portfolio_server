import boardsModel from "@models/boards";
import { OK_TEST_ID, WRONG_TEST_ID } from "@utils/const";
import BoardsService from "../index";

boardsModel.findOneAndUpdate = jest.fn();

const body = "sdfsfsd";
const category = "React";
const hashtag = ["df", "asd"];
const thumbnail = "asdad";
const title = "qweqwewqe";

describe("BoardsService/updateBoard", () => {
  it("BoardsService.updateBoard 함수를 호출한다", () => {
    expect(typeof BoardsService.updateBoard).toBe("function");
  });

  it("findOneAndUpdate를 호출한다", async () => {
    await BoardsService.updateBoard({ body, category, hashtag, id: OK_TEST_ID, thumbnail, title });
    expect(boardsModel.findOneAndUpdate).toBeCalledWith(
      { _id: OK_TEST_ID },
      { body, category, hashtag, thumbnail, title },
      { new: true },
    );
  });

  it("변경 된 게시글 데이터를 리턴한다", async () => {
    const data = { body, category, hashtag, id: WRONG_TEST_ID, thumbnail, title };
    boardsModel.findOneAndUpdate = jest.fn().mockReturnValue(data);
    const result = await BoardsService.updateBoard(data);
    expect(result).toStrictEqual(data);
  });
});
