import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const normalizeBase = (value: string | undefined) => {
  if (!value || value === '/') return '/'
  return `/${value.replace(/^\/+|\/+$/g, '')}/`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  return {
    base: normalizeBase(env.VITE_BASE_PATH),
    plugins: [react()],
    server: { allowedHosts: ['terminal.local'] },
    test: { environment: 'jsdom', setupFiles: './src/test/setup.ts' },
  }
})
