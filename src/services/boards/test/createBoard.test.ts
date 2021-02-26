import boardsModel from "@models/boards";
import BoardsService from "../index";

boardsModel.create = jest.fn();

const body = "sdfsfsd";
const category = "React";
const hashtag = ["df", "asd"];
const thumbnail = "asdad";
const title = "qweqwewqe";

describe("BoardsService/createBoard", () => {
  it("BoardsService.createBoard 함수를 호출한다", () => {
    expect(typeof BoardsService.createBoard).toBe("function");
  });

  it("create 함수를 호출 할 때 boardsData를 인자값으로 준다", async () => {
    await BoardsService.createBoard({ body, category, hashtag, thumbnail, title });
    expect(boardsModel.create).toBeCalledWith({ body, category, hashtag, thumbnail, title });
  });

  it("게시글 생성 후 리턴 값은 params과 일치한다", async () => {
    boardsModel.create = jest.fn().mockReturnValueOnce({ body, category, hashtag, thumbnail, title });
    const result = await BoardsService.createBoard({ body, category, hashtag, thumbnail, title });
    expect(result.body).toBe(body);
    expect(result.category).toBe(category);
    expect(result.hashtag).toBe(hashtag);
    expect(result.thumbnail).toBe(thumbnail);
    expect(result.title).toBe(title);
  });
});
