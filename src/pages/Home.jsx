import { Link } from 'react-router-dom'
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Download } from 'lucide-react'
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

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Available for work
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroHi}>Hi, I'm</span>
            <span className={styles.heroName}>Daniel<br />Lourenço</span>
          </h1>

          <p className={styles.heroRole}>{about?.role || 'Developer'}</p>
          {about?.bio && <p className={styles.heroBio}>{about.bio}</p>}

          <div className={styles.heroActions}>
            <Link to="/projects" className={styles.btnPrimary}>
              View projects <ArrowRight size={15} />
            </Link>
            {about?.cv && (
              <a href={about.cv} download className={styles.btnCV}>
                <Download size={15} /> Download CV
              </a>
            )}
            {about?.email && (
              <a href={`mailto:${about.email}`} className={styles.btnSecondary}>
                Contact
              </a>
            )}
          </div>

          <div className={styles.heroLinks}>
            {about?.github && (
              <a href={about.github} target="_blank" rel="noopener noreferrer" className={styles.socialChip}>
                <Github size={14} /> GitHub <ExternalLink size={11} className={styles.ext} />
              </a>
            )}
            {about?.linkedin && (
              <a href={about.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialChip}>
                <Linkedin size={14} /> LinkedIn <ExternalLink size={11} className={styles.ext} />
              </a>
            )}
            {about?.email && (
              <a href={`mailto:${about.email}`} className={styles.socialChip}>
                <Mail size={14} /> Email
              </a>
            )}
          </div>
        </div>

        {/* Photo */}
        <div className={styles.heroPhoto}>
          <div className={styles.photoRing} />
          {about?.avatar ? (
            <img src={about.avatar} alt="Daniel Lourenço" className={styles.photo} />
          ) : (
            <div className={styles.photoPlaceholder}><span>DL</span></div>
          )}
          <div className={styles.photoGlow} />
        </div>
      </section>

      <div className={styles.divider} />

      {/* ── PROJECTS ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.sectionLabel}>Selected work</p>
            <h2 className={styles.sectionTitle}>
              {featured.length ? 'Featured' : 'Recent projects'}
            </h2>
          </div>
          <Link to="/projects" className={styles.seeAll}>
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className={styles.grid}>
            {[1,2,3].map(i => <div key={i} className={styles.skeleton} />)}
          </div>
        ) : recent.length > 0 ? (
          <div className={styles.grid}>
            {recent.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No projects added yet.</p>
          </div>
        )}
      </section>

      {/* ── TECH STRIP ── */}
      <div className={styles.techStrip}>
        {['HTML','CSS','JavaScript','React','NodeJS','Python','C','Supabase','Clerk'].map(t => (
          <span key={t} className={styles.techItem}>{t}</span>
        ))}
      </div>

    </div>
  )
}
