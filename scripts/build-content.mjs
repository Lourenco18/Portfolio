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

/**
 * Parse YAML frontmatter from a markdown file.
 * Handles strings, booleans, numbers, and arrays (- item).
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null

  const yaml = match[1]
  const data = {}
  let currentKey = null
  let currentArray = null

  for (const line of yaml.split('\n')) {
    // Array item (indented "- value")
    const arrayMatch = line.match(/^\s+- (.+)/)
    if (arrayMatch && currentKey) {
      if (!currentArray) {
        currentArray = []
        data[currentKey] = currentArray
      }
      currentArray.push(parseValue(arrayMatch[1].trim()))
      continue
    }

    // Key-value pair
    const kvMatch = line.match(/^([a-zA-Z_]\w*)\s*:\s*(.*)/)
    if (kvMatch) {
      currentKey = kvMatch[1]
      currentArray = null
      const val = kvMatch[2].trim()
      if (val === '' || val === '|-' || val === '|') {
        // Value follows on next lines (multiline) or is an array — skip for now
        data[currentKey] = ''
      } else {
        data[currentKey] = parseValue(val)
      }
      continue
    }

    // Multiline string continuation
    if (currentKey && data[currentKey] !== undefined && typeof data[currentKey] === 'string' && !currentArray) {
      const trimmed = line.replace(/^ {2}/, '')
      data[currentKey] = data[currentKey] ? data[currentKey] + '\n' + trimmed : trimmed
    }
  }

  return data
}

function parseValue(val) {
  if (val === 'true') return true
  if (val === 'false') return false
  // Quoted string
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1)
  }
  // Number
  if (/^-?\d+(\.\d+)?$/.test(val)) return Number(val)
  return val
}

const files = existsSync(PROJECTS_DIR)
  ? readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.md') || f.endsWith('.json'))
  : []

const projects = files.map(file => {
  const raw = readFileSync(join(PROJECTS_DIR, file), 'utf-8')
  let data

  if (file.endsWith('.md')) {
    data = parseFrontmatter(raw)
    if (!data) return null
  } else {
    data = JSON.parse(raw)
  }

  const slug = data.slug || file.replace(/\.(md|json)$/, '')
  return { ...data, slug }
}).filter(Boolean).sort((a, b) => (a.order || 0) - (b.order || 0))

writeFileSync(OUTPUT, JSON.stringify(projects, null, 2))
console.log(`Built projects.json with ${projects.length} project(s)`)
