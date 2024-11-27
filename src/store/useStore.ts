// src/store/useStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { POSTS } from "../constants";
import { StoreState } from "../interfaces/index";

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
      toggleBookmark: (id: number) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, bookmarked: !post.bookmarked } : post
          ),
        })),
    }),
    {
      name: "posts-store",
    }
  )
);

export default useStore;
