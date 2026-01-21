import Modal from "@/components/common/Modal";
import React from "react";

const Confirm = ({
  open,
  onClose,
  handleDelete,
  heading,
  paragraph,
  cancel,
  success,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#111811] dk:text-[#e8f5e8]">
          {heading}
        </h2>

        <p className="text-sm text-[#618961]">{paragraph}</p>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 capitalize hover:bg-gray-200 duration-300 cursor-pointer"
          >
            {cancel}
          </button>

          <button
            onClick={() => {
              handleDelete();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-red-600 text-white capitalize hover:bg-red-600/70 duration-300 cursor-pointer"
          >
            {success}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;
