/* eslint-disable react/prop-types */

import MainHeader from "./header/MainHeader";
import Footer from "./Footer";
import Modal from "./Modal";
import { useContext } from "react";
import { MyContext } from "../../utils/MyProvider";

export default function MainLayout({ children }) {
  const { modal } = useContext(MyContext);

  return (
    <>
      <MainHeader />
      <Modal isOpen={modal.open} type={modal.type} />
      {children}
      <Footer />
    </>
  );
}
