import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import style from './style.module.less';

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.logo}>
        <Link to={'/'}>
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div>
        <span>Made With React.js 😘 </span>
      </div>
    </footer>
  );
}

export default Footer;
