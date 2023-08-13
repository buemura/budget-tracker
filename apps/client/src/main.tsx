import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";

import "./styles/globals.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={navigator.language}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
