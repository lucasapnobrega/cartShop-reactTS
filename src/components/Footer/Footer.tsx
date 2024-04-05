import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to="/">
        <h2>CartShop</h2>
      </Link>

      <span>Lucas Alcântara &copy;</span>

      <nav className={styles.social}>
        <a href="https://github.com/lucasapnobrega" target="_blank" rel="noopener" title="Github"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/lucas-alc%C3%A2ntara-b46245278/" target="_blank" rel="noopener" title="Linkedin"><FaLinkedin /></a>
      </nav>
    </footer>
  )
}

export default Footer