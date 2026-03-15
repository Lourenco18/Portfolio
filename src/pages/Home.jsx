import { Link } from 'react-router-dom'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { useProjects, useAbout } from '../data/useContent'
import ProjectCard from '../components/ProjectCard'
import styles from './Home.module.css'

export default function Home() {
  const { projects, loading } = useProjects()
  const about = useAbout()

  const featured = projects.filter(p => p.featured).slice(0, 3)

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLabel + ' mono'}>
            <span className={styles.dot}></span>
            Available for work
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroName}>{about?.name || 'Developer'}</span>
            <br />
            <em className={styles.heroRole}>{about?.role || 'Full-Stack Developer'}</em>
          </h1>

          <p className={styles.heroBio}>{about?.bio || ''}</p>

          <div className={styles.heroActions}>
            <Link to="/projects" className={styles.btnPrimary}>
              Ver projetos
              <ArrowRight size={16} />
            </Link>
            <Link to="/about" className={styles.btnSecondary}>
              Sobre mim
            </Link>
          </div>

          <div className={styles.heroSocials}>
            {about?.github && (
              <a href={about.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={18} />
              </a>
            )}
            {about?.linkedin && (
              <a href={about.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            )}
            {about?.email && (
              <a href={`mailto:${about.email}`} aria-label="Email">
                <Mail size={18} />
              </a>
            )}
          </div>
        </div>

        <div className={styles.heroDecor}>
          <div className={styles.ring}></div>
          <div className={styles.ring2}></div>
          <div className={styles.cross}></div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel + ' mono'}>Projetos em destaque</div>
          <Link to="/projects" className={styles.seeAll + ' mono'}>
            Ver todos <ArrowRight size={13} />
          </Link>
        </div>

        {loading ? (
          <div className={styles.loading}>
            {[1,2,3].map(i => <div key={i} className={styles.skeleton}></div>)}
          </div>
        ) : featured.length > 0 ? (
          <div className={styles.grid}>
            {featured.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Nenhum projeto em destaque ainda.</p>
            <a href="/admin/" className={styles.adminCta}>Adicionar projetos no painel admin →</a>
          </div>
        )}
      </section>

      {/* Stats / Numbers */}
      <section className={styles.stats}>
        <div className={styles.statsInner}>
          <div className={styles.stat}>
            <span className={styles.statNum + ' mono'}>{projects.length}</span>
            <span className={styles.statLabel}>Projetos</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNum + ' mono'}>
              {projects.filter(p => p.status === 'Live').length}
            </span>
            <span className={styles.statLabel}>Ativos</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNum + ' mono'}>
              {[...new Set(projects.flatMap(p => p.tags || []))].length}
            </span>
            <span className={styles.statLabel}>Tecnologias</span>
          </div>
        </div>
      </section>
    </div>
  )
}
