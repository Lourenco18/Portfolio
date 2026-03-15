import { useAbout, useProjects } from '../data/useContent'
import { Github, Linkedin, Mail, Twitter, ExternalLink } from 'lucide-react'
import styles from './About.module.css'

export default function About() {
  const about = useAbout()
  const { projects } = useProjects()

  const allTags = [...new Set(projects.flatMap(p => p.tags || []))]

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* Profile */}
        <section className={styles.profile}>
          <div className={styles.avatarCol}>
            {about?.avatar ? (
              <img src={about.avatar} alt={about?.name} className={styles.avatar} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <span>{(about?.name || 'P')[0]}</span>
              </div>
            )}
            <div className={styles.socials}>
              {about?.github && (
                <a href={about.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <Github size={16} />
                  <span className="mono">GitHub</span>
                  <ExternalLink size={11} />
                </a>
              )}
              {about?.linkedin && (
                <a href={about.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <Linkedin size={16} />
                  <span className="mono">LinkedIn</span>
                  <ExternalLink size={11} />
                </a>
              )}
              {about?.twitter && (
                <a href={about.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <Twitter size={16} />
                  <span className="mono">Twitter</span>
                  <ExternalLink size={11} />
                </a>
              )}
              {about?.email && (
                <a href={`mailto:${about.email}`} className={styles.socialLink}>
                  <Mail size={16} />
                  <span className="mono">{about.email}</span>
                </a>
              )}
            </div>
          </div>

          <div className={styles.bioCol}>
            <p className={styles.label + ' mono'}>Sobre mim</p>
            <h1 className={styles.name}>{about?.name || 'Nome'}</h1>
            <p className={styles.role + ' mono'}>{about?.role}</p>
            <p className={styles.bio}>{about?.bio}</p>
          </div>
        </section>

        <div className={styles.divider}></div>

        {/* Skills */}
        {allTags.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle + ' mono'}>Tecnologias usadas</h2>
            <div className={styles.tagCloud}>
              {allTags.map(t => (
                <span key={t} className={styles.techTag + ' mono'}>{t}</span>
              ))}
            </div>
          </section>
        )}

        <div className={styles.divider}></div>

        {/* Stats */}
        <section className={styles.statsSection}>
          <div className={styles.statCard}>
            <span className={styles.statNum + ' mono'}>{projects.length}</span>
            <span className={styles.statLabel}>Projetos totais</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum + ' mono'}>{projects.filter(p => p.status === 'Live').length}</span>
            <span className={styles.statLabel}>Projetos ativos</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum + ' mono'}>{allTags.length}</span>
            <span className={styles.statLabel}>Tecnologias</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum + ' mono'}>
              {projects.length > 0
                ? Math.min(...projects.map(p => parseInt(p.year) || 2024))
                : new Date().getFullYear()}
            </span>
            <span className={styles.statLabel}>Desde</span>
          </div>
        </section>

      </div>
    </div>
  )
}
