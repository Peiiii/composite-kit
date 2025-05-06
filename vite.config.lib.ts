import { defineConfig, mergeConfig } from 'vite'
import { resolve } from 'path'
import baseConfig from './vite.config.base'
import dts from 'vite-plugin-dts'

// 库构建配置
export default mergeConfig(baseConfig, defineConfig({
  plugins: [
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/*.stories.tsx'],
      outDir: 'dist',
      rollupTypes: false,
      insertTypesEntry: true,
    }),
  ],
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