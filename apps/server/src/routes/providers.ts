import { Hono } from 'hono'
import { providerStore } from '../db/providerStore.js'

const router = new Hono()

router.get('/', (c) => c.json(providerStore.getAll()))
router.post('/', async (c) => {
  const body = await c.req.json()
  return c.json(providerStore.create(body), 201)
})
router.put('/:id', async (c) => {
  const body = await c.req.json()
  const updated = providerStore.update(c.req.param('id'), body)
  if (!updated) return c.json({ error: 'Not found' }, 404)
  return c.json(updated)
})
router.delete('/:id', (c) => {
  if (!providerStore.delete(c.req.param('id'))) return c.json({ error: 'Not found' }, 404)
  return c.json({ ok: true })
})

export default router
