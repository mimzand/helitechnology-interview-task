import "@testing-library/jest-dom";
import { create } from "zustand";
import { POSTS } from "@/constants";
import useStore from "@/store/useStore";
import { StoreState } from "@/interfaces";
import LikeButton from "./LikeButton";
import {
  act,
  render,
  screen,
  fireEvent,
  renderHook,
} from "@testing-library/react";

jest.mock("@/store/useStore", () => {
  return create<StoreState>((set) => ({
    posts: [],
    toggleBookmark: jest.fn(),
    toggleLike: jest.fn((id: number) =>
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, liked: !post.liked } : post
        ),
      }))
    ),
  }));
});

describe("Like Button", () => {
  const mockToggle = jest.fn();

  beforeEach(() => {
    mockToggle.mockClear();
  });

  it("The onClick function is triggered upon clicking.", () => {
    render(<LikeButton onClick={mockToggle} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('It displays as "Like" when it\'s not selected.', () => {
    render(<LikeButton marked={false} onClick={mockToggle} />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Like");
    expect(button).toHaveClass("bg-gray-200");
  });

  it('It displays as "Unlike" when it\'s selected.', () => {
    render(<LikeButton marked={true} onClick={mockToggle} />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Unlike");
    expect(button).toHaveClass("bg-red-500");
  });
});

describe("PostCard Like Store", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const store = useStore.getState();
    store.posts = POSTS;
  });

  it("It should switch the bookmark status", () => {
    const { result } = renderHook(() => useStore());
    const toggleLike = result.current.toggleLike;

    act(() => {
      toggleLike(1);
    });

    expect(toggleLike).toHaveBeenCalledTimes(1);
    expect(toggleLike).toHaveBeenCalledWith(1);

    const updatedPosts = result.current.posts;
    expect(updatedPosts.find((post) => post.id === 1)?.liked).toBe(true);
  });
});
