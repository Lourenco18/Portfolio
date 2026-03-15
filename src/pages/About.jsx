import { useAbout, useProjects } from '../data/useContent'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import styles from './About.module.css'

const TECH_COLORS = {
  'HTML':       { bg:'rgba(234,88,12,0.12)',  color:'#f97316' },
  'CSS':        { bg:'rgba(59,130,246,0.12)', color:'#60a5fa' },
  'JavaScript': { bg:'rgba(234,179,8,0.12)',  color:'#facc15' },
  'React':      { bg:'rgba(14,165,233,0.12)', color:'#38bdf8' },
  'NodeJS':     { bg:'rgba(34,197,94,0.12)',  color:'#4ade80' },
  'C':          { bg:'rgba(168,85,247,0.12)', color:'#c084fc' },
  'Python':     { bg:'rgba(251,191,36,0.12)', color:'#fbbf24' },
  'Supabase':   { bg:'rgba(52,211,153,0.12)', color:'#34d399' },
  'Clerk':      { bg:'rgba(232,121,249,0.12)',color:'#e879f9' },
}

export default function About() {
  const about = useAbout()
  const { projects } = useProjects()
  const allTags = [...new Set(projects.flatMap(p => p.tags || []))]

  return (
    <div className={styles.page}>

      {/* Profile */}
      <section className={styles.profile}>
        <div className={styles.avatarWrap}>
          {about?.avatar
            ? <img src={about.avatar} alt={about.name} className={styles.avatar} />
            : <div className={styles.avatarPlaceholder}><span>DL</span></div>
          }
        </div>

        <div className={styles.bio}>
          <p className={styles.label}>Developer</p>
          <h1 className={styles.name}>{about?.name || 'Daniel Lourenço'}</h1>
          <p className={styles.role}>{about?.role}</p>
          {about?.bio && <p className={styles.bioText}>{about.bio}</p>}

          <div className={styles.links}>
            {about?.github && (
              <a href={about.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <Github size={15} /> GitHub <ExternalLink size={11} className={styles.ext} />
              </a>
            )}
            {about?.linkedin && (
              <a href={about.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <Linkedin size={15} /> LinkedIn <ExternalLink size={11} className={styles.ext} />
              </a>
            )}
            {about?.email && (
              <a href={`mailto:${about.email}`} className={styles.link}>
                <Mail size={15} /> {about.email}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className={styles.stats}>
        {[
          { num: projects.length, label: 'Projetos' },
          { num: projects.filter(p => p.status === 'Ativo').length, label: 'Ativos' },
          { num: allTags.length, label: 'Tecnologias' },
        ].map(({ num, label }) => (
          <div key={label} className={styles.stat}>
            <span className={styles.statNum}>{num}</span>
            <span className={styles.statLabel}>{label}</span>
          </div>
        ))}
      </div>

      {/* Tech */}
      {allTags.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tecnologias</h2>
          <div className={styles.tags}>
            {allTags.map(t => {
              const c = TECH_COLORS[t] || { bg:'rgba(255,255,255,0.06)', color:'var(--text-2)' }
              return <span key={t} className={styles.tag} style={{ background:c.bg, color:c.color }}>{t}</span>
            })}
          </div>
        </section>
      )}

    </div>
  )
}
