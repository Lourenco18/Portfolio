import { useParams, Link } from 'react-router-dom'
import { useProjects } from '../data/useContent'
import { ExternalLink, Github, ArrowLeft, FileText } from 'lucide-react'
import styles from './ProjectDetail.module.css'

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
  'Ativo':              'Active',
  'Em desenvolvimento': 'In Progress',
  'Arquivado':          'Archived',
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const { projects, loading } = useProjects()
  const project = projects.find(p => p.slug === slug)

  if (loading) return <div className={styles.state}>Loading...</div>
  if (!project) return (
    <div className={styles.state}>
      <p>Project not found.</p>
      <Link to="/projects" className={styles.stateLink}>← Back to projects</Link>
    </div>
  )

  const { title, description, longDescription, image, liveUrl, githubUrl, tags=[], status, year, document } = project

  return (
    <div className={styles.page}>
      <Link to="/projects" className={styles.back}><ArrowLeft size={14} /> Projects</Link>

      <header className={styles.header}>
        <div className={styles.meta}>
          {year && <span className={styles.year}>{year}</span>}
          {status && <span className={styles.status}>{STATUS_MAP[status] || status}</span>}
        </div>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

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
              <ExternalLink size={14} /> Live site
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.btn}>
              <Github size={14} /> GitHub
            </a>
          )}
          {document && (
            <a href={document} target="_blank" rel="noopener noreferrer" className={styles.btn}>
              <FileText size={14} /> Document
            </a>
          )}
        </div>
      </header>

      {image && (
        <div className={styles.cover}><img src={image} alt={title} /></div>
      )}

      {longDescription && (
        <div className={styles.content}>
          {longDescription.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}
    </div>
  )
}
