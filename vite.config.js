import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import Razorpay from 'razorpay'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
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
