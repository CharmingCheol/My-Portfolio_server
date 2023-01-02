export interface Writing {
  // createdAt: string;
  createdAt: Date;
  id: string;
  content: string;
  title: string;
}

export interface WritingPagination {
  list: Writing[];
  totalCount: number;
}
