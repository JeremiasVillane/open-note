import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./lib/i18n";
import Providers from "./providers";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
