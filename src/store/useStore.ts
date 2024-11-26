// src/store/useStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { POSTS } from "../constants/posts";

interface Post {
  id: number;
  author: string;
  content: string;
  image: string;
  liked: boolean;
}

interface StoreState {
  posts: Post[];
  toggleLike: (id: number) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      posts: POSTS,
      toggleLike: (id: number) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, liked: !post.liked } : post
          ),
        })),
    }),
    {
      name: "posts-store",
    }
  )
);

export default useStore;
