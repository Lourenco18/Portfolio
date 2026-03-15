import styles from './Logo.module.css'

export default function Logo({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.logo}
      aria-label="DL logo"
    >
      {/* Outer square with rounded corners */}
      <rect width="40" height="40" rx="10" fill="#6c63ff" />
      {/* D letter - left side arc */}
      <path
        d="M9 10H16C20.4183 10 24 13.5817 24 18V22C24 26.4183 20.4183 30 16 30H9V10Z"
        fill="white"
        fillOpacity="0.95"
      />
      {/* L letter */}
      <path
        d="M27 10H30V27H37V30H27V10Z"
        fill="white"
        fillOpacity="0.95"
      />
      {/* D inner cutout */}
      <path
        d="M12 13H16C18.7614 13 21 15.2386 21 18V22C21 24.7614 18.7614 27 16 27H12V13Z"
        fill="#6c63ff"
      />
    </svg>
  )
}
