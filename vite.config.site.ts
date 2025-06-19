import { defineConfig, mergeConfig } from 'vite'
import baseConfig from './vite.config.base'
import tailwindcss from '@tailwindcss/vite'

// 网站构建配置
export default mergeConfig(baseConfig, defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: "dist-site",
    sourcemap: true,
  },
})) 