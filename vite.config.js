import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Dev-only API proxy for /api/chat
      {
        name: 'api-proxy',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try {
                const { messages } = JSON.parse(body)
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
                  },
                  body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages,
                    max_tokens: 400,
                    temperature: 0.7,
                  }),
                })
                const data = await response.json()
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
              } catch (err) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: 'Failed to reach OpenAI' }))
              }
            })
          })
        },
      },
    ],
  }
})
