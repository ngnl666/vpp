import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages 專案站台部署於子路徑 /vpp/；本機開發維持根路徑。
  base: process.env.GITHUB_PAGES ? "/vpp/" : "/",
  plugins: [react()],
  staged: {
    "*": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: true } },
});
