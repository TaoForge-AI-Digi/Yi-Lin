import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const CHAR_DIR = resolve(import.meta.dirname, '../../data/characters')

export const characterContentStore = {
  get(agentId: string) {
    const dir = resolve(CHAR_DIR, agentId)
    const read = (section: string) => {
      const f = resolve(dir, `${section}.md`)
      return existsSync(f) ? readFileSync(f, 'utf-8') : ''
    }
    return { soul: read('soul'), user: read('user'), memory: read('memory') }
  },
}
