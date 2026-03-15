import { useAbout, useProjects } from '../data/useContent'
import { Github, Linkedin, Mail } from 'lucide-react'
import styles from './About.module.css'

const TECH_COLORS = {
  'HTML':       { bg: '#fff4ed', color: '#c2410c' },
  'CSS':        { bg: '#eff6ff', color: '#1d4ed8' },
  'JavaScript': { bg: '#fefce8', color: '#92400e' },
  'React':      { bg: '#f0f9ff', color: '#0369a1' },
  'NodeJS':     { bg: '#f0fdf4', color: '#15803d' },
  'C':          { bg: '#faf5ff', color: '#7e22ce' },
  'Python':     { bg: '#fefce8', color: '#854d0e' },
  'Supabase':   { bg: '#f0fdf4', color: '#065f46' },
  'Clerk':      { bg: '#fdf4ff', color: '#86198f' },
}

export default function About() {
  const about = useAbout()
  const { projects } = useProjects()
  const allTags = [...new Set(projects.flatMap(p => p.tags || []))]

  return (
    <div className={styles.page}>
      <div className={styles.profile}>
        {about?.avatar
          ? <img src={about.avatar} alt={about.name} className={styles.avatar} />
          : <div className={styles.avatarPlaceholder}>{(about?.name || 'P')[0]}</div>
        }

        <div>
          <h1 className={styles.name}>{about?.name}</h1>
          <p className={styles.role}>{about?.role}</p>
          {about?.bio && <p className={styles.bio}>{about.bio}</p>}

          <div className={styles.links}>
            {about?.github && (
              <a href={about.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <Github size={15} /> GitHub
              </a>
            )}
            {about?.linkedin && (
              <a href={about.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <Linkedin size={15} /> LinkedIn
              </a>
            )}
            {about?.email && (
              <a href={`mailto:${about.email}`} className={styles.link}>
                <Mail size={15} /> {about.email}
              </a>
            )}
          </div>
        </div>
      </div>

      {allTags.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Tecnologias</h2>
          <div className={styles.tags}>
            {allTags.map(t => {
              const c = TECH_COLORS[t] || { bg: '#f3f4f6', color: '#374151' }
              return (
                <span key={t} className={styles.tag} style={{ background: c.bg, color: c.color }}>{t}</span>
              )
            })}
          </div>
        </div>
      )}

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNum}>{projects.length}</span>
          <span className={styles.statLabel}>Projetos</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{projects.filter(p => p.status === 'Ativo').length}</span>
          <span className={styles.statLabel}>Ativos</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{allTags.length}</span>
          <span className={styles.statLabel}>Tecnologias</span>
        </div>
      </div>
    </div>
  )
}
