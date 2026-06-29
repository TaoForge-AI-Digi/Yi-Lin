import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

const DATA_DIR = resolve(import.meta.dirname, '../../data')
const FILE = resolve(DATA_DIR, 'characters.json')
mkdirSync(DATA_DIR, { recursive: true })

export interface CharacterPermission {
  edit: 'ask' | 'allow' | 'deny'
  bash: 'ask' | 'allow' | 'deny'
  webfetch: 'allow' | 'deny'
}

export interface CharacterMemory {
  enabled: boolean
  selfEvolution?: boolean
  charLimit?: number
  maxEntries?: number
}

export interface CharacterRecord {
  id: string
  name: string
  description?: string
  avatar?: string
  color?: string
  memory?: CharacterMemory
  model?: string
  provider?: string
  tools?: Record<string, boolean>
  permissions?: CharacterPermission
  maxSteps?: number
  mode?: 'primary' | 'subagent' | 'all'
  enabled?: boolean
  builtIn?: boolean
  createdAt?: number
  updatedAt?: number
}

function readAll(): CharacterRecord[] {
  if (!existsSync(FILE)) return []
  try { return JSON.parse(readFileSync(FILE, 'utf-8')) } catch { return [] }
}
function writeAll(items: CharacterRecord[]) { writeFileSync(FILE, JSON.stringify(items, null, 2), 'utf-8') }

function nextId(items: CharacterRecord[]): string {
  const max = items.reduce((m, c) => Math.max(m, parseInt(c.id) || 0), 0)
  return String(max + 1)
}

const NOW = Date.now()

const BUILTIN: CharacterRecord[] = [
  { id: 'general', name: 'General', description: '通用助手', color: '#6366f1', permissions: { edit: 'ask', bash: 'deny', webfetch: 'allow' }, mode: 'all', maxSteps: 10, enabled: true, builtIn: true, createdAt: NOW, updatedAt: NOW },
  { id: 'coder', name: 'Coder', description: '编程专家', color: '#10b981', permissions: { edit: 'ask', bash: 'ask', webfetch: 'allow' }, mode: 'primary', maxSteps: 20, enabled: true, builtIn: true, createdAt: NOW, updatedAt: NOW },
  { id: 'reviewer', name: 'Reviewer', description: '代码审查', color: '#f59e0b', permissions: { edit: 'ask', bash: 'deny', webfetch: 'deny' }, mode: 'subagent', maxSteps: 15, enabled: true, builtIn: true, createdAt: NOW, updatedAt: NOW },
  { id: 'explorer', name: 'Explorer', description: '代码探索', color: '#8b5cf6', permissions: { edit: 'allow', bash: 'deny', webfetch: 'allow' }, mode: 'all', maxSteps: 10, enabled: true, builtIn: true, createdAt: NOW, updatedAt: NOW },
]

export function seedBuiltinCharacters() {
  const all = readAll()
  const existing = new Set(all.map(a => a.id))
  let changed = false
  for (const c of BUILTIN) {
    if (!existing.has(c.id)) { all.push(c); changed = true }
  }
  if (changed) writeAll(all)
}

export const characterMetaStore = {
  getAll: () => readAll(),
  getById: (id: string) => readAll().find(a => a.id === id) || null,
  create: (data: Omit<CharacterRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    const all = readAll()
    const now = Date.now()
    const record: CharacterRecord = { ...data, id: nextId(all), createdAt: now, updatedAt: now }
    all.push(record)
    writeAll(all)
    return record
  },
  update: (id: string, data: Partial<CharacterRecord>) => {
    const all = readAll()
    const idx = all.findIndex(a => a.id === id)
    if (idx === -1) return null
    all[idx] = { ...all[idx], ...data, id, updatedAt: Date.now() }
    writeAll(all)
    return all[idx]
  },
  delete: (id: string) => {
    const all = readAll()
    const idx = all.findIndex(a => a.id === id)
    if (idx === -1) return false
    if (all[idx].builtIn) return false
    all.splice(idx, 1)
    writeAll(all)
    return true
  },
}
