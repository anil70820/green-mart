import React from "react";
import Sidebar from "../common/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Cta from "../common/Cta";
import { logout } from "@/redux/slice/authSlice";
import { toast } from "react-toastify";

const Profile = ({ isOpen, onClose }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOutUser = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    toast.success("Logout successfully.");
  };
  return (
    <Sidebar isOpen={isOpen} onClose={onClose} position="right" title="Profile">
      <p>{isAuth && user.name}</p>
      <p className="mb-10">{isAuth && user.email}</p>
      <Cta onClick={logOutUser}>Logout</Cta>
    </Sidebar>
  );
};

export default Profile;
