import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={styles.link} to="/">Home</Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to="/posts">Blog</Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to="/about">About/Contact</Link>
        </li>
        <li className={styles.item}>
          {token ? (
            <button className={styles.link} onClick={logout}>Logout</button>
          ) : (
            <Link className={styles.link} to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
