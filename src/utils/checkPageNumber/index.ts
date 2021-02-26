/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { DEFAULT_PAGE_INDEX, PAGE_SIZE } from "@utils/const";

interface IParameters {
  model: mongoose.Model<any>;
  page: number;
}

const checkParameters = async ({ model, page }: IParameters) => {
  const totalDocumentCount = await model.estimatedDocumentCount();
  if (page <= 0) return DEFAULT_PAGE_INDEX; // page가 음수
  if (totalDocumentCount < page) return DEFAULT_PAGE_INDEX; // page가 총 갯수보다 클 경우
  if (totalDocumentCount <= (page - 1) * PAGE_SIZE) return DEFAULT_PAGE_INDEX; // 시작점이 총 갯수와 같거나 클 경우
  return page; // if절에 걸리지 않으면 page를 그대로 return
};

export default checkParameters;
