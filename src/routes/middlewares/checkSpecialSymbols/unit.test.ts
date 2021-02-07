import httpMocks from "node-mocks-http";
import { BAD_REQUEST } from "http-status";
import checkSpecialSymbols from "./index";

const METHOD = "body";
const KEYWORD = "category";

const setup = (text) => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  req[METHOD][KEYWORD] = text;
  checkSpecialSymbols({ method: METHOD, key: KEYWORD })(req, res, next);
  return { req, res, next };
};

describe("CheckSpecialSymbols Middleware", () => {
  it("checkSpecialSymbols 함수를 호출한다", () => {
    expect(typeof checkSpecialSymbols).toBe("function");
  });

  it("text가 문자열이 아닐 경우, 400 에러와 메시지를 전달한다", () => {
    const { res: intType } = setup(1); // 정수형
    const { res: booleanType } = setup(false); // 불리언
    expect(intType._isEndCalled()).toBeTruthy();
    expect(intType.statusCode).toBe(BAD_REQUEST);
    expect(intType._getJSONData()).toStrictEqual({ message: `${KEYWORD} must be string type` });
    expect(booleanType._isEndCalled()).toBeTruthy();
    expect(booleanType.statusCode).toBe(BAD_REQUEST);
    expect(booleanType._getJSONData()).toStrictEqual({ message: `${KEYWORD} must be string type` });
  });

  it("공백문자가 포함되어 있는 경우, 400 에러와 메시지를 전달한다", () => {
    const { res: leftSpace } = setup(" dsfsdf");
    const { res: rightSpace } = setup("dsfsdf ");
    const { res: middleSpace } = setup("dsf sdf");
    expect(leftSpace.statusCode).toBe(BAD_REQUEST);
    expect(rightSpace.statusCode).toBe(BAD_REQUEST);
    expect(middleSpace.statusCode).toBe(BAD_REQUEST);
    expect(leftSpace._getJSONData()).toStrictEqual({ message: `${KEYWORD} must not contain space` });
    expect(rightSpace._getJSONData()).toStrictEqual({ message: `${KEYWORD} must not contain space` });
    expect(middleSpace._getJSONData()).toStrictEqual({ message: `${KEYWORD} must not contain space` });
  });

  it("특수문자가 포함된 문자열을 받게 되면, 400 에러와 메시지를 전달한다", () => {
    const { res } = setup("dfkjjhsaifjskd?$%&!");
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(BAD_REQUEST);
    expect(res._getJSONData()).toStrictEqual({ message: `${KEYWORD} must not contain special symbol` });
  });

  it("한글/영어가 혼합되어 있을 경우, 400 에러와 메시지를 전달한다", () => {
    // K : 한글, E: 영어
    const { res: KE } = setup("차민cheol");
    const { res: K } = setup("차민철");
    const { res: E } = setup("chamincheol");
    expect(K.statusCode).not.toBe(BAD_REQUEST);
    expect(E.statusCode).not.toBe(BAD_REQUEST);
    expect(KE.statusCode).toBe(BAD_REQUEST);
    expect(KE._getJSONData()).toStrictEqual({ message: "Korean and English should not be together" });
  });

  it("특수문자가 없는 문자열인 경우, next를 호출한다", () => {
    const { next } = setup("react");
    expect(next).toBeCalledWith();
  });
});
