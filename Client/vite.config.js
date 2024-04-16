import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";


// Calculate the base folder for certificates (if needed)
// const baseFolder = ...;

// const certificateName = "reactapp1.client";
// const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
// const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

// Remove certificate creation logic

const target = "http://localhost:5173"; // Adjust the target URL if needed

export default defineConfig({
  base: "/",
  plugins: [plugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    proxy: {
      "/api": {
        target,
        secure: false
      }
    },
    port: 5173,
    // Remove HTTPS configuration
    // https: {
    //     key: fs.readFileSync(keyFilePath),
    //     cert: fs.readFileSync(certFilePath),
    // }
  }
});
