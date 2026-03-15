import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useAbout } from '../data/useContent'
import Logo from './Logo'
import styles from './Layout.module.css'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const about = useAbout()
  const location = useLocation()

  useEffect(() => setMenuOpen(false), [location])
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className={styles.root}>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <nav className={styles.nav}>
          <NavLink to="/" className={styles.brand}>
            <Logo size={34} />
            <span className={styles.brandName}>Daniel Lourenço</span>
          </NavLink>

          <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
            <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Home</NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Projects</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>About</NavLink>
          </div>

          <button className={styles.menuBtn} onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>
            <Logo size={22} />
            <span className={styles.footerName}>Daniel Lourenço</span>
          </div>
          <span className={styles.footerCopy}>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}
