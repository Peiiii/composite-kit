import { defineConfig, mergeConfig } from 'vite'
import { resolve } from 'path'
import baseConfig from './vite.config.base'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'   

// 库构建配置
export default mergeConfig(baseConfig, defineConfig({
  plugins: [
    tailwindcss(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/*.stories.tsx'],
      outDir: 'dist',
      rollupTypes: false,
      insertTypesEntry: true,
    }),
  ],
  build: {
    minify: false,
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
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css' || assetInfo.name?.includes('index.css')) {
            return 'index.css'
          }
          return assetInfo.name || 'unknown'
        },
      },
    },
    sourcemap: true,
    outDir: "dist",
    cssCodeSplit: false,
  },
  css: {
    postcss: {
      plugins: [
        // 如果需要，可以在这里添加额外的 PostCSS 插件
      ],
    },
  },
})) 