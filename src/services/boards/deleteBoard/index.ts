import boardsModel from "@models/boards";

const deleteBoard = async ({ id }: { id: string }) => {
  await boardsModel.findByIdAndDelete(id);
};

export default deleteBoard;
