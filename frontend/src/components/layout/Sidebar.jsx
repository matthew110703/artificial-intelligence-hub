/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";

// UI
import Button from "../ui/Button";
import NavLink from "../ui/NavLink";
import Icon from "../ui/Icon";

// Icons
import { editIcon, chatIcon, closeIcon } from "../../assets";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { clearChat, setChat } from "../../store/chatSlice";

// Services
import { getAllChats, getChat } from "../../services/chatService";

const Sidebar = ({ handleReconnect }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [chats, setChats] = useState([]);

  // Redux
  const dispatch = useDispatch();
  const { chatId } = useSelector((state) => state.chat);
  const { isGuest } = useSelector((state) => state.auth);

  // Fetch Chats
  // const updateChats = useCallback(() => {
  //   getAllChats()
  //     .then((res) => setChats(res))
  //     .catch((err) => console.error("Error fetching chats:", err));
  // }, []);

  // useEffect(() => {
  //   updateChats();
  // }, [chatId]);

  // Handle New Chat
  const handleNewChat = () => {
    dispatch(clearChat());
    handleReconnect();
    // updateChats();
    setIsOpen(false);
  };

  // Handle Switch Chat
  const handleSwitchChat = async (id) => {
    if (id === chatId) return;

    try {
      const res = await getChat(id);
      console.log("Switching Chat:", res._id);

      // Update chatId in Redux first
      dispatch(setChat({ chatId: res._id, history: res.history }));

      // Ensure localStorage is updated before reconnecting
      localStorage.setItem("chatId", res._id);

      // Reconnect AFTER state update
      setTimeout(handleReconnect, 200);

      setIsOpen(false);
    } catch (err) {
      console.error("Error fetching chat:", err);
    }
  };

  return (
    <>
      {/* Toggle For Mobile Devices */}
      <button
        className="bg-primary fixed top-16 rounded-r-full p-2 lg:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Open Sidebar"
        aria-expanded={isOpen}
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
            text={isGuest ? "Sign in" : "New Chat"}
            startIcon={editIcon}
            className={"mx-auto mt-4 mb-4 max-w-[90%]"}
            onClick={isGuest ? null : () => handleNewChat()}
          />
          <div className="mini-scrollbar flex max-h-[90vh] min-h-[90vh] flex-col gap-1 overflow-y-auto py-2">
            {/* <p className="self-start pl-4 text-xs font-bold">
              {isGuest
                ? "Sign In to save chats"
                : chats.length > 0
                  ? "Chats"
                  : "No Chats"}
            </p> */}
            {/* {chats.map((chat) => (
              <NavLink
                key={chat._id}
                text={chat?.history[0]?.parts[0]?.text || "Untitled Chat"}
                onClick={() => handleSwitchChat(chat._id)}
                active={chatId === chat._id}
              />
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
