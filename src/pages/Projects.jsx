import { useState } from 'react'
import { useProjects } from '../data/useContent'
import ProjectCard from '../components/ProjectCard'
import styles from './Projects.module.css'

const CATEGORIES = ['Todos', 'Web', 'Mobile', 'Design', 'Open Source', 'Other']
const STATUSES = ['Todos', 'Live', 'In Progress', 'Archived']

export default function Projects() {
  const { projects, loading } = useProjects()
  const [category, setCategory] = useState('Todos')
  const [status, setStatus] = useState('Todos')
  const [search, setSearch] = useState('')

  const filtered = projects.filter(p => {
    const matchCat = category === 'Todos' || p.category === category
    const matchStatus = status === 'Todos' || p.status === status
    const q = search.toLowerCase()
    const matchSearch = !q || p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tags || []).some(t => t.toLowerCase().includes(q))
    return matchCat && matchStatus && matchSearch
  })

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.label + ' mono'}>Todos os projetos</p>
          <h1 className={styles.title}>Trabalho</h1>
          <p className={styles.subtitle}>
            Uma coleção dos projetos que construí — desde produtos lançados até experiências e explorações.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.searchWrap}>
            <input
              type="text"
              placeholder="Pesquisar projetos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.search + ' mono'}
            />
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel + ' mono'}>Categoria</span>
            <div className={styles.pills}>
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`${styles.pill} mono ${category === c ? styles.active : ''}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel + ' mono'}>Estado</span>
            <div className={styles.pills}>
              {STATUSES.map(s => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`${styles.pill} mono ${status === s ? styles.active : ''}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className={styles.resultsBar}>
          <span className={styles.count + ' mono'}>
            {loading ? '...' : `${filtered.length} projeto${filtered.length !== 1 ? 's' : ''}`}
          </span>
        </div>

        {loading ? (
          <div className={styles.grid}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className={styles.skeleton}></div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Nenhum projeto encontrado.</p>
            <button onClick={() => { setCategory('Todos'); setStatus('Todos'); setSearch('') }} className={styles.resetBtn + ' mono'}>
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
