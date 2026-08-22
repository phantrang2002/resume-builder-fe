import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import type { ProxyOptions, ServerOptions } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Same-origin dev proxy so HttpOnly refresh cookies from the API are stored
 * for localhost instead of the upstream API host.
 */
function devProxy(target: string): NonNullable<ServerOptions["proxy"]> {
  const options: ProxyOptions = {
    target,
    changeOrigin: true,
    secure: false,
    cookieDomainRewrite: "",
    configure: (proxy) => {
      proxy.on("proxyRes", (proxyRes) => {
        const setCookie = proxyRes.headers["set-cookie"];
        if (!setCookie) {
          return;
        }
        proxyRes.headers["set-cookie"] = setCookie.map((cookie) =>
          cookie
            .split(";")
            .filter((part) => part.trim().toLowerCase() !== "secure")
            .map((part) => (/^\s*samesite=/i.test(part) ? " SameSite=Lax" : part))
            .join(";"),
        );
      });
    },
  };

  return { "/api": options };
}

export default defineConfig(({ command, mode, isPreview }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxyTarget = (env.VITE_DEV_API_TARGET ?? "").trim();
  const isDevServer = command === "serve" && !isPreview;

  if (command === "build" && !(env.VITE_API_URL ?? "").trim()) {
    throw new Error(
      "VITE_API_URL must be set for a build. A built app has no dev proxy, so an empty value " +
        "would send every API request to the frontend's own origin.",
    );
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      port: 3000,
      proxy: isDevServer && proxyTarget ? devProxy(proxyTarget) : undefined,
    },
  };
});
