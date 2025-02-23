import { useState } from "react";

// UI
import Button from "../ui/Button";
import NavLink from "../ui/NavLink";
import Icon from "../ui/Icon";

// Icons
import { editIcon, chatIcon, closeIcon } from "../../assets";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle For Mobile Devices */}
      <button
        className="bg-primary fixed top-1/6 rounded-r-full p-2 lg:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Open Sidebar"
      >
        <Icon src={chatIcon} size={24} alt={"Chats"} />
      </button>

      {/* Overlay For mobile  */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-10 bg-black/50 transition-opacity lg:hidden ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      ></div>

      {/* Sidebar + Drawer */}
      <div
        className={`dark:bg-dark/70 bg-light fixed top-0 left-0 z-50 h-screen w-64 p-5 shadow-lg transition-transform lg:block lg:w-[300px] ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0`}
      >
        {/* Close Button */}
        <button
          className="absolute top-0 right-0 p-2 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close Sidebar"
        >
          <Icon src={closeIcon} size={32} invert alt={"Close"} />
        </button>

        {/* Sidebar Content */}
        <div>
          <Button
            text={"New Chat"}
            startIcon={editIcon}
            className={"mx-auto mt-4 mb-4 max-w-[90%]"}
          />
          <div className="mini-scrollbar flex max-h-[90vh] min-h-[90vh] flex-col gap-1 overflow-y-auto py-2">
            <NavLink text={"Chat 1"} active />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />

            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
            <NavLink text={"Chat 1"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
