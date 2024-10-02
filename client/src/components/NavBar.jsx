import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={styles.link} to="/">Home</Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to="/about">About</Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to="/posts">Blogs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
