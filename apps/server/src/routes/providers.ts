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

router.get('/:id/models', async (c) => {
  const provider = providerStore.getById(c.req.param('id'))
  if (!provider) return c.json({ error: 'Not found' }, 404)
  try {
    const res = await fetch(`${provider.base_url.replace(/\/+$/, '')}/models`, {
      headers: provider.api_key ? { Authorization: `Bearer ${provider.api_key}` } : {},
    })
    if (!res.ok) return c.json({ error: `Provider API ${res.status}` }, 502)
    const body = await res.json() as any
    const models = (body.data || body.models || []).map((m: any) => ({
      id: m.id || m.name,
      name: m.name || m.id,
    }))
    return c.json(models)
  } catch (e: any) {
    return c.json({ error: e.message }, 502)
  }
})

export default router
