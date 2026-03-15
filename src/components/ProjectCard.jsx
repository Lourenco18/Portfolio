import { Link } from 'react-router-dom'
import { ExternalLink, Github, FileText, ArrowUpRight } from 'lucide-react'
import styles from './ProjectCard.module.css'

const STATUS_COLOR = {
  'Live': 'green',
  'In Progress': 'amber',
  'Archived': 'grey',
}

export default function ProjectCard({ project }) {
  const { slug, title, category, description, image, liveUrl, githubUrl, tags, status, year, featured } = project

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <Link to={`/projects/${slug}`} className={styles.imageWrap}>
        {image ? (
          <img src={image} alt={title} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderText}>{title[0]}</span>
          </div>
        )}
        <div className={styles.imageOverlay}>
          <ArrowUpRight size={20} />
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={`${styles.status} ${styles[STATUS_COLOR[status] || 'grey']}`}>
            <span className={styles.statusDot}></span>
            {status}
          </span>
          <span className={styles.year + ' mono'}>{year}</span>
        </div>

        <Link to={`/projects/${slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{title}</h3>
        </Link>

        <p className={styles.category + ' mono'}>{category}</p>
        <p className={styles.description}>{description}</p>

        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.slice(0, 4).map(tag => (
              <span key={tag} className={styles.tag + ' mono'}>{tag}</span>
            ))}
          </div>
        )}

        <div className={styles.actions}>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
              <ExternalLink size={14} />
              <span>Ver site</span>
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
              <Github size={14} />
              <span>GitHub</span>
            </a>
          )}
          <Link to={`/projects/${slug}`} className={`${styles.actionBtn} ${styles.primary}`}>
            <span>Ver mais</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}
