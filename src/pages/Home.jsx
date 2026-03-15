import { Link } from 'react-router-dom'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { useProjects, useAbout } from '../data/useContent'
import ProjectCard from '../components/ProjectCard'
import styles from './Home.module.css'

export default function Home() {
  const { projects, loading } = useProjects()
  const about = useAbout()
  const featured = projects.filter(p => p.featured).slice(0, 3)
  const recent = featured.length ? featured : projects.slice(0, 3)

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.name}>{about?.name || 'O teu nome'}</h1>
          <p className={styles.role}>{about?.role || 'Developer'}</p>
          {about?.bio && <p className={styles.bio}>{about.bio}</p>}

          <div className={styles.heroActions}>
            <Link to="/projects" className={styles.btnPrimary}>
              Ver projetos <ArrowRight size={15} />
            </Link>
            {about?.email && (
              <a href={`mailto:${about.email}`} className={styles.btnSecondary}>
                Contacto
              </a>
            )}
          </div>

          <div className={styles.socials}>
            {about?.github && (
              <a href={about.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Github size={16} /> GitHub
              </a>
            )}
            {about?.linkedin && (
              <a href={about.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
            {about?.email && (
              <a href={`mailto:${about.email}`} className={styles.socialLink}>
                <Mail size={16} /> Email
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      {(loading || recent.length > 0) && (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>
              {featured.length ? 'Em destaque' : 'Projetos recentes'}
            </h2>
            <Link to="/projects" className={styles.seeAll}>
              Ver todos <ArrowRight size={13} />
            </Link>
          </div>

          {loading ? (
            <div className={styles.grid}>
              {[1,2,3].map(i => <div key={i} className={styles.skeleton} />)}
            </div>
          ) : (
            <div className={styles.grid}>
              {recent.map(p => <ProjectCard key={p.slug} project={p} />)}
            </div>
          )}
        </section>
      )}

      {/* Empty state */}
      {!loading && projects.length === 0 && (
        <section className={styles.section}>
          <div className={styles.empty}>
            <p>Ainda não tens projetos.</p>
            <a href="/admin/" className={styles.adminCta}>
              Adicionar projetos no painel admin →
            </a>
          </div>
        </section>
      )}
    </div>
  )
}
