export interface MemoListItem {
  _id: string;
  name?: string;
  title?: string;
  createdAt: string;
  content?: string;
  updatedAt?: string;
  reply?: string;
}

export interface MemoDetail {
  _id: string;
  name?: string;
  title?: string;
  content: string;
  reply?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMemoInput {
  name?: string;
  title?: string;
  content: string;
}

export interface ReplyInput {
  reply: string;
}
