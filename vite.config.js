import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        allowedHosts: [
            'guide-guess.gl.at.ply.gg',
            '.ply.gg', // Allow all playit.gg subdomains
        ],
    },
})
