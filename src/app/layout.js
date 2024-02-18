"use client";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { appWithTranslation } from "next-i18next";
import { I18nextProvider } from "react-i18next";
import i18n from "../locales/i18n";
import { Provider } from "react-redux";
import store from "@/redux";
import { createContext, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export const WebSocketContext = createContext();
function RootLayout({ children }) {
  const ws = useRef();
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nextProvider i18n={i18n}>
          <WebSocketContext.Provider value={ws}>
            <Provider store={store}>
              {children}
              <ToastContainer position="bottom-left" />
            </Provider>
          </WebSocketContext.Provider>
        </I18nextProvider>
      </body>
    </html>
  );
}
export default appWithTranslation(RootLayout);
