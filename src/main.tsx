import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "@/app/App";
import "@/styles/index.css";
import "@/styles/toast.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar
      closeOnClick={false}
      toastClassName="app-toast-host"
    />
  </StrictMode>,
);
