import { type FC, useCallback } from "react";
import { REPORT_REASONS } from "../constants";
import { ReportProps } from "../interfaces";
import useToast from "./Toast";
import Modal from "./Modal";

const ReportModal: FC<ReportProps> = ({ isOpen, toggle }) => {
  const { addToast } = useToast();

  const handleReport = useCallback(() => {
    addToast("Thank you for your report, we’ve received it!");
    toggle();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={toggle}>
      <div className="space-y-8">
        <h2>What is the reason for reporting this post?</h2>

        <div className="space-y-4">
          {REPORT_REASONS.map((reason) => (
            <button
              key={reason.id}
              onClick={() => handleReport()}
              className="block w-full py-2 px-4 rounded text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {reason.description}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ReportModal;
