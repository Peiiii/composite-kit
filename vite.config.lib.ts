import { defineConfig, mergeConfig } from 'vite'
import { resolve } from 'path'
import baseConfig from './vite.config.base'

// 库构建配置
export default mergeConfig(baseConfig, defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "CompositeKit",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    outDir: "dist",
  },
})) 