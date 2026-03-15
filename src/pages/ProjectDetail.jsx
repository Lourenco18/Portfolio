import { useParams, Link } from 'react-router-dom'
import { useProjects } from '../data/useContent'
import { ExternalLink, Github, ArrowLeft, FileText, Calendar, Tag } from 'lucide-react'
import styles from './ProjectDetail.module.css'

const STATUS_COLOR = { 'Live': 'green', 'In Progress': 'amber', 'Archived': 'grey' }

export default function ProjectDetail() {
  const { slug } = useParams()
  const { projects, loading } = useProjects()
  const project = projects.find(p => p.slug === slug)

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.loadingState}>Carregando...</div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.notFound}>
            <p>Projeto não encontrado.</p>
            <Link to="/projects" className={styles.back}>← Voltar aos projetos</Link>
          </div>
        </div>
      </div>
    )
  }

  const { title, category, description, longDescription, image, liveUrl, githubUrl, tags, status, year, document } = project
  const color = STATUS_COLOR[status] || 'grey'

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* Back */}
        <Link to="/projects" className={styles.backLink + ' mono'}>
          <ArrowLeft size={14} />
          Projetos
        </Link>

        {/* Hero */}
        <header className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={`${styles.status} ${styles[color]} mono`}>
              <span className={styles.statusDot}></span>
              {status}
            </span>
            <span className={styles.category + ' mono'}>{category}</span>
          </div>

          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>

          <div className={styles.headerActions}>
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                <ExternalLink size={15} />
                Ver site ao vivo
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
                <Github size={15} />
                Ver código
              </a>
            )}
            {document && (
              <a href={document} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
                <FileText size={15} />
                Documento
              </a>
            )}
          </div>
        </header>

        {/* Cover image */}
        {image && (
          <div className={styles.coverWrap}>
            <img src={image} alt={title} className={styles.cover} />
          </div>
        )}

        {/* Content grid */}
        <div className={styles.grid}>
          <div className={styles.main}>
            {longDescription ? (
              <div className={styles.longDesc}>
                {longDescription.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : (
              <div className={styles.longDesc}>
                <p>{description}</p>
              </div>
            )}
          </div>

          <aside className={styles.sidebar}>
            {/* Year */}
            <div className={styles.sideSection}>
              <div className={styles.sideLabel + ' mono'}>
                <Calendar size={12} />
                Ano
              </div>
              <p className={styles.sideValue + ' mono'}>{year}</p>
            </div>

            {/* Status */}
            <div className={styles.sideSection}>
              <div className={styles.sideLabel + ' mono'}>
                Estado
              </div>
              <p className={`${styles.sideValue} ${styles[color]} mono`}>{status}</p>
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className={styles.sideSection}>
                <div className={styles.sideLabel + ' mono'}>
                  <Tag size={12} />
                  Tecnologias
                </div>
                <div className={styles.tagsList}>
                  {tags.map(t => (
                    <span key={t} className={styles.tag + ' mono'}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {(liveUrl || githubUrl || document) && (
              <div className={styles.sideSection}>
                <div className={styles.sideLabel + ' mono'}>Links</div>
                <div className={styles.linksList}>
                  {liveUrl && (
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.sideLink + ' mono'}>
                      <ExternalLink size={12} />
                      Site ao vivo
                    </a>
                  )}
                  {githubUrl && (
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.sideLink + ' mono'}>
                      <Github size={12} />
                      GitHub
                    </a>
                  )}
                  {document && (
                    <a href={document} target="_blank" rel="noopener noreferrer" className={styles.sideLink + ' mono'}>
                      <FileText size={12} />
                      Documento PDF
                    </a>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
