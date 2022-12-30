import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Avatar, Popover } from 'antd';
import Logo from '../../assets/logo.png';
import UserAvatar from '../../assets/user.jpg';
import AddBlog from '../../assets/addBlog.svg';
import style from './style.module.less';
import { useCurUser } from '../../hooks';
import Button from '../Button/Button';
import { logoutReq } from '../../api/auth';

function Header() {
  const location = useLocation();
  const { curUser, setCurUser } = useCurUser();
  const [loading, setLoading] = useState(false);

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
          key: '?cat=diary',
          label: <Link to={'?cat=diary'}>日记</Link>,
        },
        {
          key: '?cat=algorithm',
          label: <Link to={'?cat=algorithm'}>算法</Link>,
        },
        {
          key: '?cat=tech',
          label: <Link to={'?cat=tech'}>技术</Link>,
        },
      ],
    },
    {
      key: '/tags',
      label: <Link to={'/write'}>标签</Link>,
    },
  ];

  const handleLogoutClick = async() => {
    setLoading(true);
    await logoutReq();
    setCurUser(null);
    setLoading(false);
  };

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
          selectedKeys={[location.search || location.pathname]}
          mode="horizontal"
          items={items}
        />
        <Link
          className={style['add-blog']}
          to={'/write'}
        >
          <AddBlog />
        </Link>
        {/* {curUser ?  : } */}
        <Popover
          content={
            <Button
              loading={loading}
              onClick={handleLogoutClick}
            >
              注销
            </Button>
          }
          trigger="click"
        >
          <Avatar
            className={style.user}
            src={UserAvatar}
          />
        </Popover>
      </div>
    </header>
  );
}

export default Header;
