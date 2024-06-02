import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.production",
});

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    port: 5000,
  },
  preview: {
    host: process.env.VITE_HOST,
    port: +process.env.VITE_PORT,
  },

  plugins: [react()],
});
