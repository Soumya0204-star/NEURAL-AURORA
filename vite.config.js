import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import Razorpay from 'razorpay'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['images/pwa-icon-192x192.png', 'images/pwa-icon-512x512.png'],
        manifest: {
          name: 'NEURAL AURORA | Techhackontime999',
          short_name: 'NEURAL AURORA',
          description: 'Full-Stack Developer & UI/UX Architect — crafting neural-inspired digital experiences.',
          theme_color: '#080C14',
          background_color: '#080C14',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          orientation: 'portrait-primary',
          icons: [
            {
              src: '/images/pwa-icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/images/pwa-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/images/pwa-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'],
          maximumFileSizeToCacheInBytes: 3000000,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts',
                expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
              urlPattern: /^https:\/\/api\.fontshare\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'fontshare',
                expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
          ],
        },
      }),
      {
        name: 'api-routes',
        configureServer(server) {
          server.middlewares.use('/api/create-order', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }
            let body = ''
            req.on('data', chunk => body += chunk)
            req.on('end', async () => {
              try {
                const { amount, currency = 'INR' } = JSON.parse(body)
                const razorpay = new Razorpay({
                  key_id: env.RAZORPAY_KEY_ID,
                  key_secret: env.RAZORPAY_KEY_SECRET,
                })
                const order = await razorpay.orders.create({ amount, currency, receipt: `receipt_${Date.now()}` })
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(order))
              } catch (err) {
                console.error('[API] Order creation failed:', err)
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Failed to create order' }))
              }
            })
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      dedupe: ['three'],
    },
    optimizeDeps: {
      include: ['three', '@react-three/fiber', '@react-three/drei'],
    },
  }
})
