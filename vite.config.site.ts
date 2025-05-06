import { defineConfig, mergeConfig } from 'vite'
import baseConfig from './vite.config.base'

// 网站构建配置
export default mergeConfig(baseConfig, defineConfig({
  build: {
    outDir: "dist-site",
    sourcemap: true,
  },
})) 