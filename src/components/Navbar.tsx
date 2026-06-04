// Import hook funkcija, Link-a koji sluzi za navigaciju i stilova

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import styles from './Navbar.module.css'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // referenca na html DIV element, pocetno stanje je prazno

  const dropdownRef = useRef<HTMLDivElement>(null)

  //  reagira na event = mouseclick

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false) // ukoliko je klik izvan containera mijenja stanje dropdown menua
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, []) //   slusa klik

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className={styles.header}>

      <div className={styles.navbarTop}>
        <div className={styles.logo}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="6" width="18" height="12" rx="2" stroke="var(--accent)" strokeWidth="2"/>
            <rect x="20" y="9" width="2" height="6" rx="1" fill="var(--accent)"/>
            <polygon points="12,4 9,13 11,13 10,20 15,11 13,11 14,4" fill="var(--accent)"/>
          </svg>
          BATTERYAPP
        </div>
      </div>

      <div className={styles.navbarBottom} ref={dropdownRef}>

        <div className={styles.hamburgerWrapper}>
          <button
            className={styles.hamburger}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>

        <div className={styles.links}>
          <Link
            to="/dashboard"
            className={`${styles.link} ${location.pathname === '/dashboard' ? styles.linkActive : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/devices"
            className={`${styles.link} ${location.pathname === '/devices' ? styles.linkActive : ''}`}
          >
            Devices
          </Link>
        </div>

        {dropdownOpen && (
          <div className={styles.dropdown}>
            <button className={styles.dropdownItem} onClick={() => { navigate('/profile'); setDropdownOpen(false) }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              Profile
            </button>
            <div className={styles.dropdownDivider}/>
            <button className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`} onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Navbar