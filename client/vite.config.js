import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  // Load env file based on the current mode (development / production)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: "https://real-estate-6kjl.onrender.com/",
    //       changeOrigin: true,
    //       secure: false,
    //     },
    //   },
    // },
    plugins: [react()],
  }
})
