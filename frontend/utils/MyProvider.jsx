/* eslint-disable react/prop-types */

import { useState, createContext } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
  });

  return (
    <MyContext.Provider value={{ modal, setModal }}>
      {children}
    </MyContext.Provider>
  );
};
