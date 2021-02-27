import boardsModel from "@models/boards";
import checkPageNumber from "@utils/checkPageNumber";
import { PAGE_SIZE } from "@utils/const";

interface BoardParams {
  body: string;
  category: string;
  hashtag: string[];
  thumbnail: string;
  title: string;
}

interface UpdateBoardParams extends BoardParams {
  id: string;
}

class BoardsService {
  // 게시글 생성
  static async createBoard({ body, category, hashtag, thumbnail, title }: BoardParams) {
    const post = await boardsModel.create({ body, category, hashtag, thumbnail, title });
    return post;
  }

  // 게시글 삭제
  static async deleteBoard({ id }: { id: string }) {
    await boardsModel.findByIdAndDelete(id);
  }

  // 아이디에 맞는 게시글 불러오기
  static async getBoardById({ id }: { id: string }) {
    const result = await boardsModel.findById(id);
    return result;
  }

  // 게시글 리스트 불러오기
  static async getBoards({ page }: { page: number }) {
    const pageIndex = await checkPageNumber({ model: boardsModel, page });
    const result = await boardsModel
      .find({})
      .sort({ createdAt: -1 })
      .skip((pageIndex - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);
    return result;
  }

  // 카테고리에 속한 게시글 불러오기
  static async getCategoryBoards({ category, page }: { category: string; page: number }) {
    const pageIndex = await checkPageNumber({ model: boardsModel, page });
    const boardList = await boardsModel
      .find({ category })
      .sort({ createdAt: -1 })
      .skip((pageIndex - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);
    return boardList;
  }

  // 카테고리에 속한 게시글 갯수 불러오기
  static async getCategoryBoardsCount({ category }: { category: string }) {
    const count = await boardsModel.countDocuments({ category });
    return count;
  }

  // 게시글 수정
  static async updateBoard({ body, category, hashtag, id, thumbnail, title }: UpdateBoardParams) {
    const updated = await boardsModel.findOneAndUpdate(
      { _id: id },
      { body, category, hashtag, thumbnail, title },
      { new: true },
    );
    return updated;
  }
}

export default BoardsService;
