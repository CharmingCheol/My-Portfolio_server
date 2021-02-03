import boardsModel from "@models/boards";

const createBoards = async (data) => {
  const post = await boardsModel.create(data);
  return post;
};

export default createBoards;
