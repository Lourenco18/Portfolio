import { useState } from 'react'
import { useProjects } from '../data/useContent'
import ProjectCard from '../components/ProjectCard'
import styles from './Projects.module.css'

const TECHS = ['Todos', 'HTML', 'CSS', 'JavaScript', 'React', 'NodeJS', 'C', 'Python', 'Supabase', 'Clerk']

export default function Projects() {
  const { projects, loading } = useProjects()
  const [tech, setTech] = useState('Todos')
  const [search, setSearch] = useState('')

  const filtered = projects.filter(p => {
    const matchTech = tech === 'Todos' || (p.tags || []).includes(tech)
    const q = search.toLowerCase()
    const matchSearch = !q || p.title.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      (p.tags||[]).some(t => t.toLowerCase().includes(q))
    return matchTech && matchSearch
  })

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className={styles.label}>Trabalho</p>
        <h1 className={styles.title}>Projetos</h1>
        <p className={styles.subtitle}>Todos os projetos que desenvolvi.</p>
      </div>

      <div className={styles.filters}>
        <input type="text" placeholder="Pesquisar projetos..."
          value={search} onChange={e => setSearch(e.target.value)}
          className={styles.search} />
        <div className={styles.pills}>
          {TECHS.map(t => (
            <button key={t} onClick={() => setTech(t)}
              className={`${styles.pill} ${tech === t ? styles.active : ''}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className={styles.resultsBar}>
        <span className={styles.count}>{loading ? '' : `${filtered.length} projeto${filtered.length !== 1 ? 's' : ''}`}</span>
        {(tech !== 'Todos' || search) && (
          <button onClick={() => { setTech('Todos'); setSearch('') }} className={styles.clear}>Limpar ×</button>
        )}
      </div>

      {loading ? (
        <div className={styles.grid}>{[1,2,3,4,5,6].map(i => <div key={i} className={styles.skeleton} />)}</div>
      ) : filtered.length > 0 ? (
        <div className={styles.grid}>{filtered.map(p => <ProjectCard key={p.slug} project={p} />)}</div>
      ) : (
        <div className={styles.empty}>
          {projects.length === 0
            ? <p>Ainda não tens projetos.</p>
            : <><p>Nenhum resultado para os filtros aplicados.</p>
               <button onClick={() => { setTech('Todos'); setSearch('') }} className={styles.adminCta}>Limpar filtros</button></>
          }
        </div>
      )}
    </div>
  )
}
