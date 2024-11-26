import { useMemo } from "react";

import { Post } from "../interfaces";
import useStore from "../store/useStore";
import PostCard from "../components/PostCard";

const Bookmarks: React.FC = () => {
  const posts = useStore((state) => state.posts as Array<Post>);

  const bookmarks = useMemo(
    () => posts.filter((post) => post.bookmarked),
    [posts]
  );

  const bookmarksCount = useMemo(() => bookmarks.length, [bookmarks]);

  return (
    <div className="container mx-auto p-4">
      <>
        <h1 className="text-2xl font-bold mb-4">
          Saved Posts ({bookmarksCount})
        </h1>
        {bookmarks.map((post) => (
          <PostCard
            bookmarked
            id={post.id}
            key={post.id}
            image={post.image}
            liked={post.liked}
            author={post.author}
            content={post.content}
          />
        ))}
      </>
    </div>
  );
};

export default Bookmarks;
