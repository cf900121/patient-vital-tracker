import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'YOUR_REPO_NAME' with 'patient-vital-tracker'
export default defineConfig({
  base: '/patient-vital-tracker/',
  plugins: [react()],
})
