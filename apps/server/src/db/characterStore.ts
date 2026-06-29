import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

const DATA_DIR = resolve(import.meta.dirname, '../../data')
const FILE = resolve(DATA_DIR, 'characters.json')
mkdirSync(DATA_DIR, { recursive: true })

export interface CharacterRecord {
  id: string; name: string; description?: string; color?: string
  permissions: { files: 'allow' | 'ask' | 'deny'; bash: 'allow' | 'ask' | 'deny' }
  builtIn?: boolean
}

function readAll(): CharacterRecord[] {
  if (!existsSync(FILE)) return []
  try { return JSON.parse(readFileSync(FILE, 'utf-8')) } catch { return [] }
}
function writeAll(items: CharacterRecord[]) { writeFileSync(FILE, JSON.stringify(items, null, 2), 'utf-8') }

const BUILTIN: CharacterRecord[] = [
  { id: 'general', name: 'General', description: '通用助手', color: '#6366f1', permissions: { files: 'allow', bash: 'deny' }, builtIn: true },
  { id: 'coder', name: 'Coder', description: '编程专家', color: '#10b981', permissions: { files: 'allow', bash: 'ask' }, builtIn: true },
  { id: 'reviewer', name: 'Reviewer', description: '代码审查', color: '#f59e0b', permissions: { files: 'deny', bash: 'deny' }, builtIn: true },
  { id: 'explorer', name: 'Explorer', description: '代码探索', color: '#8b5cf6', permissions: { files: 'allow', bash: 'deny' }, builtIn: true },
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
}
