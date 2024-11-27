import React, { memo } from "react";
import { ToggleButtonProps } from "../../interfaces";

const ReportButton: React.FC<ToggleButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
  >
    Report
  </button>
);

export default memo(ReportButton);
