import { useParams, Link } from 'react-router-dom'
import { useProjects } from '../data/useContent'
import { ExternalLink, Github, ArrowLeft, FileText } from 'lucide-react'
import styles from './ProjectDetail.module.css'

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

export default function ProjectDetail() {
  const { slug } = useParams()
  const { projects, loading } = useProjects()
  const project = projects.find(p => p.slug === slug)

  if (loading) return <div className={styles.state}>A carregar...</div>
  if (!project) return (
    <div className={styles.state}>
      <p>Projeto não encontrado.</p>
      <Link to="/projects" className={styles.back}>← Voltar</Link>
    </div>
  )

  const { title, description, longDescription, image, liveUrl, githubUrl, tags = [], status, year, document } = project

  return (
    <div className={styles.page}>
      <Link to="/projects" className={styles.backLink}>
        <ArrowLeft size={14} /> Projetos
      </Link>

      <header className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.year}>{year}</span>
          {status && <span className={styles.status}>{status}</span>}
        </div>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map(t => {
              const c = TECH_COLORS[t] || { bg: '#f3f4f6', color: '#374151' }
              return <span key={t} className={styles.tag} style={{ background: c.bg, color: c.color }}>{t}</span>
            })}
          </div>
        )}

        <div className={styles.actions}>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnPrimary}`}>
              <ExternalLink size={14} /> Ver site ao vivo
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.btn}>
              <Github size={14} /> GitHub
            </a>
          )}
          {document && (
            <a href={document} target="_blank" rel="noopener noreferrer" className={styles.btn}>
              <FileText size={14} /> Documento
            </a>
          )}
        </div>
      </header>

      {image && (
        <div className={styles.cover}>
          <img src={image} alt={title} />
        </div>
      )}

      {longDescription && (
        <div className={styles.content}>
          {longDescription.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}
    </div>
  )
}
