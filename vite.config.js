import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [react()],
  server: { port: 5175, strictPort: true },
});
