import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./app/App";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={navigator.language}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
