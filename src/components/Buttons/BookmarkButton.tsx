import React, { memo } from "react";
import { ToggleButtonProps } from "../../interfaces";

const BookmarkButton: React.FC<ToggleButtonProps> = ({ marked, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 w-20 rounded ${
      marked ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
    }`}
  >
    {marked ? "Unsave" : "Save"}
  </button>
);

export default memo(BookmarkButton);
