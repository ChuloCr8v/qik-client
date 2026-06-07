import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/store";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#18c58a",
                    borderRadius: 8,
                    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
                },
                components: {
                    Table: {
                        headerBg: "#f8fafc",
                        headerColor: "#64748b",
                        rowHoverBg: "#f8fafc",
                        borderColor: "#e2e8f0"
                    },
                     Button: {
                       controlHeight: 36,

                    },
                    Tabs: {
                        titleFontSize: 10
                    }
                }
            }}
        >
            <Provider store={store}>
                <App />
            </Provider>
        </ConfigProvider>
    </StrictMode>
);
