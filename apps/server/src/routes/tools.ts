import { Hono } from 'hono'
import { mcpServerStore } from '../db/toolStore.js'

const router = new Hono()

const builtinTools = [
  { name: 'read', description: 'Read file contents from the workspace' },
  { name: 'write', description: 'Write content to a file in the workspace' },
  { name: 'edit', description: 'Apply an exact-string replacement to a file' },
  { name: 'bash', description: 'Execute a shell command in the workspace directory' },
  { name: 'grep', description: 'Search file contents using a regex pattern' },
  { name: 'glob', description: 'Find files matching a glob pattern' },
  { name: 'webfetch', description: 'Fetch and return the text content of a URL' },
  { name: 'websearch', description: 'Search the web for recent information' },
]

router.get('/', (c) => {
  const mcpServers = mcpServerStore.getAll()
  return c.json({ builtin: builtinTools, mcpServers })
})

router.post('/mcp', async (c) => {
  const body = await c.req.json()
  const record = mcpServerStore.create(body)
  return c.json(record, 201)
})

router.put('/mcp/:id', async (c) => {
  const body = await c.req.json()
  const updated = mcpServerStore.update(c.req.param('id'), body)
  if (!updated) return c.json({ error: 'Not found' }, 404)
  return c.json(updated)
})

router.delete('/mcp/:id', (c) => {
  if (!mcpServerStore.delete(c.req.param('id'))) return c.json({ error: 'Not found' }, 404)
  return c.json({ ok: true })
})

export default router
