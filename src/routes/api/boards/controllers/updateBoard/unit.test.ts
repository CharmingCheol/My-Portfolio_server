/* eslint-disable @typescript-eslint/no-explicit-any */
import httpMocks from "node-mocks-http";
import { CREATED, NOT_FOUND } from "http-status";
import boardsModel from "@models/boards";
import categorysModel from "@models/categorys";
import { NOT_FOUND_CATEGORY, NOT_FOUND_ID } from "@utils/const";
import dummy from "@utils/dummy/boards.json";
import updateBoard from "./index";

const setup = async ({ category }: { category: string }) => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  req.body.category = category;
  await updateBoard(req, res, next);
  return { req, res, next };
};

describe("updateBoard Unit Test", () => {
  it("updateBoard 함수를 호출한다", () => {
    expect(typeof updateBoard).toBe("function");
  });

  it("NOT_FOUND_CATEGORY를 전달받을 경우, 404와 메시지를 리턴한다", async () => {
    categorysModel.findOne = jest.fn().mockReturnValue(null);
    const { res } = await setup({ category: " " });
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(NOT_FOUND);
    expect(res._getJSONData()).toStrictEqual({ message: NOT_FOUND_CATEGORY });
  });

  it("NOT_FOUND_ID를 전달받을 경우, 404와 메시지를 리턴한다", async () => {
    categorysModel.findOne = jest.fn().mockReturnValue({ category: "React", count: 12 });
    categorysModel.findOneAndUpdate = jest.fn().mockReturnValue({ category: "React", count: 13 });
    boardsModel.findOneAndUpdate = jest.fn().mockReturnValue(null);
    const { res } = await setup({ category: "React" });
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(NOT_FOUND);
    expect(res._getJSONData()).toStrictEqual({ message: NOT_FOUND_ID });
  });

  it("문제점이 없을 경우 수정 된 데이터와 201을 리턴한다", async () => {
    categorysModel.findOne = jest.fn().mockReturnValue({ category: "React", count: 12 });
    categorysModel.findOneAndUpdate = jest.fn().mockReturnValue({ category: "React", count: 13 });
    boardsModel.findOneAndUpdate = jest.fn().mockReturnValue(dummy);
    const { res } = await setup({ category: "React" });
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(CREATED);
    expect(res._getJSONData()).toStrictEqual(dummy);
  });
});
