import { BAD_REQUEST } from "http-status";
import boardsModel from "@models/boards";
import {
  DOES_NOT_EXISTS_BODY,
  DOES_NOT_EXISTS_HASH_TAG,
  DOES_NOT_EXISTS_TITLE,
  GREATER_THAN_HASH_TAG,
} from "@utils/const";

const createBoards = async (data) => {
  if (!data.title) return [BAD_REQUEST, DOES_NOT_EXISTS_TITLE];
  if (!data.body) return [BAD_REQUEST, DOES_NOT_EXISTS_BODY];
  if (!data.hashtag) return [BAD_REQUEST, DOES_NOT_EXISTS_HASH_TAG];
  if (5 < data.hashtag.length) return [BAD_REQUEST, GREATER_THAN_HASH_TAG];
  const post = await boardsModel.create(data);
  return post;
};

export default createBoards;
