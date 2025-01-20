import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/app/App";
import GlobalStyle from "@/app/styles/global.style";
import { DebugToggle } from "./widgets/DebugToggle";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <App />
    <DebugToggle />
  </StrictMode>
);
