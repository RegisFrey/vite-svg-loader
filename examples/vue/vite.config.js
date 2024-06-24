import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import viteSvgLoader from '@vite-svg-loader/loader'
// const viteSvgLoader = await import('@vite-svg-loader/loader')

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const viteSvgLoader = await (await import('@vite-svg-loader/loader')).default

  return {
    plugins: [vue(), viteSvgLoader()]
  }
})
