import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "./app/App";
import "./styles/index.css";

const rootEl = document.getElementById("root");
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

if (rootEl) {
  createRoot(rootEl).render(
    <BrowserRouter basename={routerBasename || undefined}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>,
  );
}
