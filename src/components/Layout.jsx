import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useAbout } from '../data/useContent'
import styles from './Layout.module.css'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const about = useAbout()
  const location = useLocation()

  useEffect(() => setMenuOpen(false), [location])

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink to="/" className={styles.logo}>
            {about?.name || 'Portfolio'}
            <span className={styles.logoDot} />
          </NavLink>

          <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
            <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>Início</NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? styles.active : ''}>Projetos</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''}>Sobre</NavLink>
          </div>

          <button className={styles.menuBtn} onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerLeft}>{about?.name} · {new Date().getFullYear()}</span>
          <a href="/admin/" className={styles.adminLink}>admin ↗</a>
        </div>
      </footer>
    </div>
  )
}
