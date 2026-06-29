import { Hono } from 'hono'
import { characterMetaStore } from '../db/characterStore.js'

const router = new Hono()
router.get('/', (c) => c.json(characterMetaStore.getAll()))
export default router
