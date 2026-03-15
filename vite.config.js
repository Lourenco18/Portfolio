import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

// Reads all JSON files from public/content/projects/ and merges into projects.json
// Also parses .md files with YAML frontmatter (Decap CMS default format)
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  const yaml = match[1]
  const obj = {}
  yaml.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) return
    const key = line.slice(0, colonIdx).trim()
    let val = line.slice(colonIdx + 1).trim()
    if (val === 'true') val = true
    else if (val === 'false') val = false
    else if (!isNaN(val) && val !== '') val = Number(val)
    else val = val.replace(/^["']|["']$/g, '')
    obj[key] = val
  })
  // Handle multiline longDescription
  const longDesc = content.match(/longDescription:\s*\|-?\n([\s\S]*?)(?=\n\w+:|$)/)
  if (longDesc) obj.longDescription = longDesc[1].replace(/^  /gm, '').trim()
  // Handle array fields (tags)
  const tagsMatch = yaml.match(/tags:\n((?:  - .+\n?)+)/)
  if (tagsMatch) {
    obj.tags = tagsMatch[1].match(/- (.+)/g)?.map(t => t.replace('- ', '').trim()) || []
  }
  return obj
}

function aggregateProjects() {
  return {
    name: 'aggregate-projects',
    buildStart() {
      const dir = join(process.cwd(), 'public', 'content', 'projects')
      const out = join(process.cwd(), 'public', 'content', 'projects.json')

      if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

      const files = readdirSync(dir).filter(f => f.endsWith('.json') || f.endsWith('.md'))

      const projects = files.map(file => {
        try {
          const raw = readFileSync(join(dir, file), 'utf-8')
          let data
          if (file.endsWith('.json')) {
            data = JSON.parse(raw)
          } else {
            data = parseFrontmatter(raw)
          }
          if (!data) return null
          return { ...data, slug: data.slug || file.replace(/\.(json|md)$/, '') }
        } catch (e) {
          console.warn(`[portfolio] Skipping ${file}:`, e.message)
          return null
        }
      }).filter(Boolean).sort((a, b) => (a.order || 0) - (b.order || 0))

      writeFileSync(out, JSON.stringify(projects, null, 2))
      console.log(`[portfolio] Built projects.json — ${projects.length} project(s)`)
    }
  }
}

export default defineConfig({
  plugins: [aggregateProjects(), react()],
  build: { outDir: 'dist' }
})
