import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'NASA Asteroids Dashboard',
        short_name: 'NeoWs Dash',
        description: 'Monitoreo de asteroides cercanos a la Tierra',
        theme_color: '#0b3d91', 
        icons: [
          {
            src: '/pwa-192x192.png', 
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})