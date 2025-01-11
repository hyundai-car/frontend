import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/app/App";
import GlobalStyle from "@/app/styles/global.style";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
);
