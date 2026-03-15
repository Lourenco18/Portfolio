import { Link } from 'react-router-dom'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import styles from './ProjectCard.module.css'

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

const STATUS_MAP = {
  'Ativo':             { color: '#15803d', bg: '#f0fdf4' },
  'Em desenvolvimento':{ color: '#b45309', bg: '#fef3c7' },
  'Arquivado':         { color: '#6b7280', bg: '#f3f4f6' },
}

export default function ProjectCard({ project }) {
  const { slug, title, description, image, liveUrl, githubUrl, tags = [], status, year } = project
  const st = STATUS_MAP[status] || STATUS_MAP['Ativo']

  return (
    <article className={styles.card}>
      {image && (
        <Link to={`/projects/${slug}`} className={styles.imageWrap}>
          <img src={image} alt={title} loading="lazy" className={styles.image} />
        </Link>
      )}

      <div className={styles.body}>
        <div className={styles.top}>
          <span className={styles.status} style={{ color: st.color, background: st.bg }}>
            {status}
          </span>
          <span className={styles.year}>{year}</span>
        </div>

        <Link to={`/projects/${slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{title}</h3>
        </Link>

        <p className={styles.desc}>{description}</p>

        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map(t => {
              const c = TECH_COLORS[t] || { bg: '#f3f4f6', color: '#374151' }
              return (
                <span key={t} className={styles.tag} style={{ background: c.bg, color: c.color }}>
                  {t}
                </span>
              )
            })}
          </div>
        )}

        <div className={styles.actions}>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnPrimary}`}>
              <ExternalLink size={13} /> Ver site
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.btn}>
              <Github size={13} /> GitHub
            </a>
          )}
          <Link to={`/projects/${slug}`} className={`${styles.btn} ${styles.btnGhost}`}>
            Ver detalhes <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  )
}
