import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST } from "http-status";

interface IParameters {
  /* req의 methods */
  method: "body" | "query" | "params";
  /* method에 속한 객체에서 key 값 */
  key: string;
}

const checkSpecialSymbols = ({ method, key }: IParameters) => (req: Request, res: Response, next: NextFunction) => {
  const text = req[method][key];
  if (typeof text !== "string") {
    return res.status(BAD_REQUEST).json({ message: `${key} must be string type` });
  }
  if (/\s/.test(text)) {
    return res.status(BAD_REQUEST).json({ message: `${key} must not contain space` });
  }
  if (/[`~!@#$%^&*|\\\'\";:\/?]/.test(text)) {
    return res.status(BAD_REQUEST).json({ message: `${key} must not contain special symbol` });
  }
  if (/[a-z|A-Z]/.test(text) && /[ㄱ-ㅎ|가-힣]/.test(text)) {
    return res.status(BAD_REQUEST).json({ message: "Korean and English should not be together" });
  }
  next();
};

export default checkSpecialSymbols;
