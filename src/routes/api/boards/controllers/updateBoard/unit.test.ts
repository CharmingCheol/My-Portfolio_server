/* eslint-disable @typescript-eslint/no-explicit-any */
import httpMocks from "node-mocks-http";
import { CREATED, NOT_FOUND } from "http-status";
import { BoardsService, CategorysService } from "@services/index";
import { NOT_FOUND_CATEGORY } from "@utils/const";
import dummy from "@utils/dummy/boards.json";
import updateBoard from "./index";

CategorysService.decreaseCategory = jest.fn();
CategorysService.increaseCategory = jest.fn();
BoardsService.updateBoard = jest.fn();

const setup = async ({ category, id }: { category: string; id?: string }) => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  req.body = dummy;
  req.params.id = id;
  dummy.category = category;
  await updateBoard(req, res, next);
  return { req, res, next };
};

describe("updateBoard Unit Test", () => {
  it("updateBoard 함수를 호출한다", () => {
    expect(typeof updateBoard).toBe("function");
  });

  it("CategorysService.decreaseCategory 함수를 호출한다", async () => {
    await setup({ category: "React" });
    expect(CategorysService.decreaseCategory).toBeCalledWith({ category: "React" });
  });

  it("NOT_FOUND_CATEGORY를 전달받을 경우, 404와 메시지를 리턴한다", async () => {
    CategorysService.decreaseCategory = jest.fn().mockReturnValueOnce(NOT_FOUND_CATEGORY);
    const { res } = await setup({ category: " " });
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(NOT_FOUND);
    expect(res._getJSONData()).toStrictEqual({ message: NOT_FOUND_CATEGORY });
  });

  it("CategorysService.increaseCategory 함수를 호출한다", async () => {
    await setup({ category: "React" });
    expect(CategorysService.increaseCategory).toBeCalledWith({ category: "React" });
  });

  it("BoardsService.updateBoard 함수를 호출한다", async () => {
    await setup({ category: "React", id: "dfdfd" });
    expect(BoardsService.updateBoard).toBeCalledWith({
      body: dummy.body,
      category: dummy.category,
      hashtag: dummy.hashtag,
      id: "dfdfd",
      thumbnail: dummy.thumbnail,
      title: dummy.title,
    });
  });

  it("문제점이 없을 경우 수정 된 데이터와 201을 리턴한다", async () => {
    BoardsService.updateBoard = jest.fn().mockReturnValueOnce(dummy);
    const { res } = await setup({ category: "React" });
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(CREATED);
    expect(res._getJSONData()).toStrictEqual(dummy);
  });

  it("서버 내부 에러가 발생 할 경우, 다음 미들웨어로 next한다", async () => {
    const errorMessage = { message: "error message" };
    const promiseRejected = Promise.reject(errorMessage);
    BoardsService.updateBoard = jest.fn().mockReturnValueOnce(promiseRejected);
    const { next } = await setup({ category: "React" });
    expect(next).toBeCalledWith(errorMessage);
  });
});
