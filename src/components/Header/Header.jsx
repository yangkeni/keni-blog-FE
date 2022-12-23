import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import Logo from '../../assets/logo.png';
import style from './style.module.less';

function Header() {
  const location = useLocation();
  // 菜单栏配置 { key, icon, children, label, type };
  const items = [
    {
      key: '/',
      label: <Link to={'/'}>总览</Link>,
    },
    {
      key: '/sort',
      label: '分类',
      children: [
        {
          key: '/diary',
          label: <Link to={'/write'}>日记</Link>,
        },
        {
          key: '/algorithm',
          label: <Link to={'/write'}>算法</Link>,
        },
        {
          key: '/tech',
          label: <Link to={'/write'}>技术</Link>,
        },
      ],
    },
    {
      key: '/write',
      label: <Link to={'/write'}>写作</Link>,
    },
  ];

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Link to={'/'}>
          <img
            src={Logo}
            alt="logo"
          />
        </Link>
      </div>
      <div className={style.func}>
        <Menu
          selectedKeys={[location.pathname]}
          mode="horizontal"
          items={items}
        ></Menu>
      </div>
      <div>用户信息</div>
    </header>
  );
}

export default Header;
