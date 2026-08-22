import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "@/app/store";
import AppRouter from "@/app/router";
import SessionBootstrapGate from "@/components/common/SessionBootstrapGate";

export default function App() {
  useEffect(() => {
    document.title = import.meta.env.VITE_APP_NAME ?? "Codebase FE React";
  }, []);

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#3478F5",
            borderRadius: 8,
            fontFamily: "\"Inter\", sans-serif",
          },
        }}
      >
        <BrowserRouter>
          <SessionBootstrapGate>
            <AppRouter />
          </SessionBootstrapGate>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
}
