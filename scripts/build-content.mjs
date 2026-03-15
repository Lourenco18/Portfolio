import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PROJECTS_DIR = join(ROOT, 'public', 'content', 'projects')
const OUTPUT = join(ROOT, 'public', 'content', 'projects.json')

if (!existsSync(PROJECTS_DIR)) {
  mkdirSync(PROJECTS_DIR, { recursive: true })
}

const files = existsSync(PROJECTS_DIR)
  ? readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.json'))
  : []

const projects = files.map(file => {
  const raw = readFileSync(join(PROJECTS_DIR, file), 'utf-8')
  const data = JSON.parse(raw)
  const slug = data.slug || file.replace('.json', '')
  return { ...data, slug }
}).sort((a, b) => (a.order || 0) - (b.order || 0))

writeFileSync(OUTPUT, JSON.stringify(projects, null, 2))
console.log(`Built projects.json with ${projects.length} project(s)`)
