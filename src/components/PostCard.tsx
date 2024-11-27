import { memo, useState } from "react";
import ReportButton from "./Buttons/ReportButton";
import { PostCardProps } from "../interfaces";
import useStore from "../store/useStore";
import ReportModal from "./ReportModal";
import useToast from "./Toast";
import LikeButton from "./Buttons/LikeButton";
import BookmarkButton from "./Buttons/BookmarkButton";

const PostCard: React.FC<PostCardProps> = ({
  id,
  author,
  content,
  image,
  liked,
  bookmarked,
}) => {
  const [showReportModal, toggleReportModal] = useState(false);
  const toggleLike = useStore((state) => state.toggleLike);
  const toggleBookmark = useStore((state) => state.toggleBookmark);
  const { addToast } = useToast();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-4 mb-4">
      <h2 className="font-bold text-lg">{author}</h2>
      <p className="my-2">{content}</p>
      {image && (
        <img
          src={image}
          alt="Post"
          className="w-full h-96 object-cover mb-2 rounded"
        />
      )}
      <div className="flex justify-start items-center gap-2">
        <LikeButton marked={liked} onClick={() => toggleLike(id)} />

        <BookmarkButton
          marked={bookmarked}
          onClick={() => {
            toggleBookmark(id);
            addToast("The requested changes have been successfully applied.");
          }}
        />

        <ReportButton onClick={() => toggleReportModal(true)} />
      </div>

      <ReportModal
        postId={id}
        isOpen={showReportModal}
        toggle={() => toggleReportModal(false)}
      />
    </div>
  );
};

export default memo(PostCard);
