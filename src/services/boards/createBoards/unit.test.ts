import boardsModel from "@models/boards";
import boardsData from "@utils/dummy/boards.json";
import createBoards from "./index";

describe("service/createBoards", () => {
  it("createBoards 함수를 호출한다", () => {
    expect(typeof createBoards).toBe("function");
  });

  it("create 함수를 호출 할 때 boardsData를 인자값으로 준다", async () => {
    boardsModel.create = jest.fn();
    await createBoards(boardsData);
    expect(boardsModel.create).toBeCalledWith(boardsData);
  });

  it("data의 이상이 없을 경우 createdPost를 return한다", async () => {
    boardsModel.create = jest.fn().mockReturnValue(boardsData);
    const post = await createBoards(boardsData);
    expect(post).toBeDefined();
  });

  it("data에서 제목이 없을 경우 [400, 에러 메시지]를 리턴한다", async () => {
    const data = { ...boardsData };
    delete data.title;
    const post = await createBoards(data);
    expect(post[0]).toBe(400);
  });

  it("data에서 본문이 없을 경우 [400, 에러 메시지]를 리턴한다", async () => {
    const data = { ...boardsData };
    delete data.body;
    const post = await createBoards(data);
    expect(post[0]).toBe(400);
  });

  it("data에서 해시태그가 없을 경우 [400, 에러 메시지]를 리턴한다", async () => {
    const data = { ...boardsData };
    delete data.hashtag;
    const post = await createBoards(data);
    expect(post[0]).toBe(400);
  });

  it("해시태그의 갯수가 5개를 넘어설 경우 [400, 에러 메시지]를 리턴한다", async () => {
    const data = { ...boardsData };
    data.hashtag.push("1", "2", "3");
    const post = await createBoards(data);
    expect(data.hashtag.length).toBeGreaterThan(5);
    expect(post[0]).toBe(400);
  });
});
