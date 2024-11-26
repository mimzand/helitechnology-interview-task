import { Post } from ".";

export interface StoreState {
  posts: Post[];
  toggleLike: (id: number) => void;
  toggleBookmark: (id: number) => void;
}
