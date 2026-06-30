import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

const DATA_DIR = resolve(import.meta.dirname, '../../data')
const FILE = resolve(DATA_DIR, 'mcpservers.json')
mkdirSync(DATA_DIR, { recursive: true })

export interface MCPServerRecord {
  id: string
  name: string
  command: string
  args: string[]
  env: Record<string, string>
}

function readAll(): MCPServerRecord[] {
  if (!existsSync(FILE)) return []
  return JSON.parse(readFileSync(FILE, 'utf-8'))
}

function writeAll(items: MCPServerRecord[]) {
  writeFileSync(FILE, JSON.stringify(items, null, 2), 'utf-8')
}

export const mcpServerStore = {
  getAll: () => readAll(),
  getById: (id: string) => readAll().find(s => s.id === id) || null,
  create: (data: MCPServerRecord) => {
    const all = readAll()
    const record = { ...data, id: data.id || crypto.randomUUID() }
    all.push(record)
    writeAll(all)
    return record
  },
  update: (id: string, patch: Partial<MCPServerRecord>) => {
    const all = readAll()
    const idx = all.findIndex(s => s.id === id)
    if (idx < 0) return null
    all[idx] = { ...all[idx], ...patch, id }
    writeAll(all)
    return all[idx]
  },
  delete: (id: string) => {
    const all = readAll()
    const filtered = all.filter(s => s.id !== id)
    if (filtered.length === all.length) return false
    writeAll(filtered)
    return true
  },
}
