import { Hono } from 'hono'
import { characterMetaStore } from '../db/characterStore.js'
import type { CharacterRecord } from '../db/characterStore.js'
import { characterContentStore } from '../character/store.js'

function mergeContent(meta: CharacterRecord, id: string) {
  const content = characterContentStore.get(id)
  return { ...meta, soul: content.soul, userProfile: content.user, memoryContent: content.memory }
}

const router = new Hono()
router.get('/', (c) => c.json(characterMetaStore.getAll()))
router.get('/:id', (c) => {
  const record = characterMetaStore.getById(c.req.param('id'))
  if (!record) return c.json({ error: 'Not found' }, 404)
  return c.json(mergeContent(record, record.id))
})
router.post('/', async (c) => {
  const body = await c.req.json() as any
  const { soul, userProfile, memoryContent, ...metaRest } = body
  const meta = characterMetaStore.create(metaRest)
  characterContentStore.save(meta.id, {
    soul: soul as string | undefined,
    user: userProfile as string | undefined,
    memory: memoryContent as string | undefined,
  })
  return c.json({ ...meta, soul: soul || '', userProfile: userProfile || '', memoryContent: memoryContent || '' }, 201)
})
router.put('/:id', async (c) => {
  const body = await c.req.json() as any
  const { soul, userProfile, memoryContent, ...metaRest } = body
  const meta = characterMetaStore.update(c.req.param('id'), metaRest)
  if (!meta) return c.json({ error: 'Not found' }, 404)
  characterContentStore.save(meta.id, {
    soul: soul as string | undefined,
    user: userProfile as string | undefined,
    memory: memoryContent as string | undefined,
  })
  return c.json({ ...meta, soul: soul || '', userProfile: userProfile || '', memoryContent: memoryContent || '' })
})
router.delete('/:id', (c) => {
  const ok = characterMetaStore.delete(c.req.param('id'))
  return ok ? c.json({ success: true }) : c.json({ error: 'Not found or built-in' }, 400)
})
export default router
