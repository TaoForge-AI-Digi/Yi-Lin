import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { Server } from 'socket.io'
import { seedBuiltinCharacters } from './db/characterStore.js'
import { registerChatSocket } from './ws/chat.js'
import providersRouter from './routes/providers.js'
import sessionsRouter from './routes/sessions.js'
import charactersRouter from './routes/characters.js'
import { getDb } from './db/schema.js'

seedBuiltinCharacters()
getDb()

const app = new Hono()
app.use('*', cors())
app.route('/api/providers', providersRouter)
app.route('/api/sessions', sessionsRouter)
app.route('/api/characters', charactersRouter)
app.get('/health', (c) => c.json({ ok: true }))

const port = 3001
const httpServer = serve({ fetch: app.fetch, port }, () => {
  console.log(`Yi-Lin server on :${port}`)
})

const io = new Server(httpServer, { cors: { origin: '*', methods: ['GET', 'POST'] } })
io.on('connection', (socket) => registerChatSocket(io, socket))
