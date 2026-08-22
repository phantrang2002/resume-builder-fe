import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "@/app/App";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} />
  </StrictMode>,
);
