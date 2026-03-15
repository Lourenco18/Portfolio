import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useAbout } from '../data/useContent'
import styles from './Layout.module.css'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const about = useAbout()
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <div className={styles.root}>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <nav className={styles.nav}>
          <NavLink to="/" className={styles.logo}>
            <span className={styles.logoText}>{about?.name || 'Portfolio'}</span>
            <span className={styles.logoDot}></span>
          </NavLink>

          <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
            <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>
              Início
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? styles.active : ''}>
              Projetos
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''}>
              Sobre
            </NavLink>
          </div>

          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={`${styles.footerName} mono`}>{about?.name}</span>
          <span className={styles.footerSep}>—</span>
          <span className={styles.footerRole}>{about?.role}</span>
          <div className={styles.footerRight}>
            <a href="/admin/" className={styles.adminLink}>
              ⌘ admin
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
