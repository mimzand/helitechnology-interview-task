import "@testing-library/jest-dom";
import { create } from "zustand";
import { POSTS } from "@/constants";
import useStore from "@/store/useStore";
import { StoreState } from "@/interfaces";
import BookmarkButton from "./BookmarkButton";
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
    toggleLike: jest.fn(),
    toggleBookmark: jest.fn((id: number) =>
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, bookmarked: !post.bookmarked } : post
        ),
      }))
    ),
  }));
});

describe("Bookmark Button", () => {
  const mockToggle = jest.fn();

  beforeEach(() => {
    mockToggle.mockClear();
  });

  it("The onClick function is triggered upon clicking.", () => {
    render(<BookmarkButton onClick={mockToggle} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('It displays as "Save" when it\'s not selected.', () => {
    render(<BookmarkButton marked={false} onClick={mockToggle} />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Save");
    expect(button).toHaveClass("bg-gray-200");
  });

  it('It displays as "Unsave" when it\'s selected.', () => {
    render(<BookmarkButton marked={true} onClick={mockToggle} />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Unsave");
    expect(button).toHaveClass("bg-blue-500");
  });
});

describe("PostCard Bookmark Store", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const store = useStore.getState();
    store.posts = POSTS;
  });

  it("It should switch the bookmark status", () => {
    const { result } = renderHook(() => useStore());
    const toggleBookmark = result.current.toggleBookmark;

    act(() => {
      toggleBookmark(1);
    });

    expect(toggleBookmark).toHaveBeenCalledTimes(1);
    expect(toggleBookmark).toHaveBeenCalledWith(1);

    const updatedPosts = result.current.posts;
    expect(updatedPosts.find((post) => post.id === 1)?.bookmarked).toBe(true);
  });
});
