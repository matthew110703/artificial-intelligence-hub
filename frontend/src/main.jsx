import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import LoginAndRegisterPage from "./pages/LoginAndRegisterPage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import MainLayout from "./components/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AiChat from "./pages/tools/AiChat.jsx";
import EmailWriter from "./pages/tools/EmailWriter.jsx";
import TextToSpeech from "./pages/tools/TextToSpeech.jsx";
import TextToImage from "./pages/tools/TextToImage.jsx";
import Modal from "./components/Modal.jsx";
import { MyProvider } from "../utils/MyProvider.jsx";
import { CookiesProvider } from "react-cookie";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
    children: [
      {
        path: "/contact",
        element: <Modal isOpen type="contact" />,
      },
      {
        path: "/account",
        element: <Modal isOpen type="account" />,
      },
    ],
  },

  {
    path: "/explore",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <ExplorePage />,
      },
      {
        path: "chat-with-ai",
        element: <AiChat />,
      },
      {
        path: "email-writer",
        element: <EmailWriter />,
      },
      {
        path: "text-to-speech",
        element: <TextToSpeech />,
      },
      {
        path: "text-to-image",
        element: <TextToImage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginAndRegisterPage isLoginPage={true} />,
  },
  {
    path: "/register",
    element: <LoginAndRegisterPage isLoginPage={false} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <MyProvider>
        <RouterProvider router={router} />
      </MyProvider>
    </CookiesProvider>
  </React.StrictMode>
);
