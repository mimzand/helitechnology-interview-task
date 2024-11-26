import { memo, useState } from "react";
import useStore from "../store/useStore";
import { PostCardProps } from "../interfaces";
import ReportModal from "./ReportModal";
import useToast from "./Toast";

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
        <button
          onClick={() => toggleLike(id)}
          className={`px-4 py-2 w-20 rounded ${
            liked ? "bg-red-500 text-white" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {liked ? "Unlike" : "Like"}
        </button>
        <button
          onClick={() => {
            toggleBookmark(id);
            addToast("The requested changes have been successfully applied.");
          }}
          className={`px-4 py-2 w-32 rounded ${
            bookmarked
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {bookmarked ? "Unsave" : "Save"}
        </button>

        <button
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
          onClick={() => toggleReportModal(true)}
        >
          Report
        </button>
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
