import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

// Plugin: merges public/content/projects/*.json → public/content/projects.json
function aggregateProjects() {
  return {
    name: 'aggregate-projects',
    buildStart() {
      const dir = join(process.cwd(), 'public', 'content', 'projects')
      const out = join(process.cwd(), 'public', 'content', 'projects.json')

      if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

      const files = existsSync(dir)
        ? readdirSync(dir).filter(f => f.endsWith('.json'))
        : []

      const projects = files.map(file => {
        try {
          const data = JSON.parse(readFileSync(join(dir, file), 'utf-8'))
          return { ...data, slug: data.slug || file.replace('.json', '') }
        } catch { return null }
      }).filter(Boolean).sort((a, b) => (a.order || 0) - (b.order || 0))

      writeFileSync(out, JSON.stringify(projects, null, 2))
      console.log(`[portfolio] Aggregated ${projects.length} project(s) → projects.json`)
    }
  }
}

export default defineConfig({
  plugins: [aggregateProjects(), react()],
  build: { outDir: 'dist' }
})
