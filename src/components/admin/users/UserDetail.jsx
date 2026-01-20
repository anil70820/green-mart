import Sidebar from "@/components/common/Sidebar";
import React from "react";

const UserDetail = ({ isOpen, onClose, user }) => {
  const safeUser = user || {};

  return (
    <Sidebar
      position="right"
      title={safeUser.name}
      isOpen={isOpen}
      onClose={onClose}
    >
      <p>{safeUser.name}</p>
      <p>{safeUser.email}</p>
    </Sidebar>
  );
};

export default UserDetail;
