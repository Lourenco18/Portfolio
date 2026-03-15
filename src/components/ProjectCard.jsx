import { Link } from 'react-router-dom'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import styles from './ProjectCard.module.css'

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

const STATUS_MAP = {
  'Ativo':              { color:'#34d399', bg:'rgba(52,211,153,0.1)'  },
  'Em desenvolvimento': { color:'#fbbf24', bg:'rgba(251,191,36,0.1)'  },
  'Arquivado':          { color:'#6b7280', bg:'rgba(107,114,128,0.1)' },
}

export default function ProjectCard({ project }) {
  const { slug, title, description, image, liveUrl, githubUrl, tags=[], status, year } = project
  const st = STATUS_MAP[status] || STATUS_MAP['Ativo']

  return (
    <article className={styles.card}>
      <Link to={`/projects/${slug}`} className={styles.imageWrap}>
        {image
          ? <img src={image} alt={title} loading="lazy" className={styles.image} />
          : <div className={styles.imagePlaceholder}><span className={styles.placeholderInitial}>{title[0]}</span></div>
        }
        <div className={styles.imageOverlay}><ArrowUpRight size={18} /></div>
      </Link>

      <div className={styles.body}>
        <div className={styles.top}>
          <span className={styles.status} style={{ color: st.color, background: st.bg }}>{status}</span>
          <span className={styles.year}>{year}</span>
        </div>

        <Link to={`/projects/${slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{title}</h3>
        </Link>

        <p className={styles.desc}>{description}</p>

        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map(t => {
              const c = TECH_COLORS[t] || { bg:'rgba(255,255,255,0.06)', color:'var(--text-2)' }
              return <span key={t} className={styles.tag} style={{ background:c.bg, color:c.color }}>{t}</span>
            })}
          </div>
        )}

        <div className={styles.actions}>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnAccent}`}>
              <ExternalLink size={13} /> Ver site
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.btn}>
              <Github size={13} /> GitHub
            </a>
          )}
          <Link to={`/projects/${slug}`} className={`${styles.btn} ${styles.btnGhost}`}>
            Detalhes <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  )
}
