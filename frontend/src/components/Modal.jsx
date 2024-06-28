/* eslint-disable react/prop-types */

import { useContext } from "react";
import { MyContext } from "../../utils/MyProvider";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Contact from "../pages/Contact";
import AccountInfo from "../pages/AccountInfo";

export default function Modal({ type, isOpen }) {
  const { setModal } = useContext(MyContext);
  const navigate = useNavigate();

  if (!isOpen && type === "") return null;

  const onClose = () => {
    setModal({ isOpen: false, type: "" });
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-lg shadow-lg relative border-primary border-8">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          <IoIosCloseCircleOutline size={32} />
        </button>
        {type === "contact" ? (
          <Contact />
        ) : type === "account" ? (
          <AccountInfo />
        ) : null}
      </div>
    </div>
  );
}
