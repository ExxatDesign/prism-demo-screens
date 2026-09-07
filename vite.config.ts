import path from "path";
import type { IncomingMessage, ServerResponse } from "http";
import type { Connect, Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const APP_BASE = "/prism-demo-screens";

function redirectToAppBase(): Plugin {
  const skip = (pathname: string) =>
    pathname.startsWith(APP_BASE) ||
    pathname.startsWith("/@") ||
    pathname.startsWith("/node_modules") ||
    pathname.startsWith("/src") ||
    pathname.startsWith("/__vite");

  const handler: Connect.NextHandleFunction = (
    req: IncomingMessage,
    res: ServerResponse,
    next: Connect.NextFunction,
  ) => {
    const raw = req.url ?? "/";
    const qIndex = raw.indexOf("?");
    const pathname = qIndex >= 0 ? raw.slice(0, qIndex) : raw;
    const search = qIndex >= 0 ? raw.slice(qIndex) : "";
    if (skip(pathname)) {
      next();
      return;
    }
    if (pathname.startsWith("/assets/") || pathname === "/" || !pathname.includes(".")) {
      res.statusCode = 302;
      res.setHeader("Location", `${APP_BASE}${pathname === "/" ? "/" : pathname}${search}`);
      res.end();
      return;
    }
    next();
  };

  return {
    name: "redirect-to-app-base",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig({
  base: `${APP_BASE}/`,
  server: {
    port: 4010,
    strictPort: true,
  },
  plugins: [redirectToAppBase(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.svg", "**/*.woff2", "**/*.ttf"],
});
