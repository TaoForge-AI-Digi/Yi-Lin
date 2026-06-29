import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { Server } from 'socket.io'
import { seedBuiltinCharacters } from './db/characterStore.js'
import { seedBuiltinCharacterContent } from './character/store.js'
import { registerChatSocket } from './ws/chat.js'
import providersRouter from './routes/providers.js'
import sessionsRouter from './routes/sessions.js'
import charactersRouter from './routes/characters.js'
import { getDb } from './db/schema.js'

process.on('uncaughtException', (err) => { console.error('[FATAL]', err) })
process.on('unhandledRejection', (err) => { console.error('[FATAL]', err) })

seedBuiltinCharacters()
seedBuiltinCharacterContent()
getDb()

const app = new Hono()
app.use('*', cors())
app.use('*', logger())
app.route('/api/providers', providersRouter)
app.route('/api/sessions', sessionsRouter)
app.route('/api/characters', charactersRouter)
app.get('/health', (c) => c.json({ ok: true }))

const port = Number(process.env.PORT) || 3001
const httpServer = serve({ fetch: app.fetch, port }, () => {
  console.log(`Yi-Lin server on :${port}`)
})
httpServer.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Kill the other process or change PORT env var.`)
  } else {
    console.error('Server error:', err)
  }
  process.exit(1)
})

const io = new Server(httpServer, { cors: { origin: '*', methods: ['GET', 'POST'] } })
io.on('connection', (socket) => registerChatSocket(io, socket))
