import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  // Load env file based on the current mode (development / production)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      proxy: {
        '/api': {
          target: "http://localhost:3000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()],
  }
})
