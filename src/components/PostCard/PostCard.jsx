import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import Button from '../Button/Button';
import style from './style.module.less';

function PostCard({ id, title, desc, tags, className }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${id}`);
    // TODO:阅读量增减
  }

  return (
    <div className={`${style['post-card']} ${className ?? ''}`}>
      <div className={style['post-meta']}>
        <h1 className={style['post-title']}>
          <Link to={`/post/${id}`}>{title}</Link>
        </h1>
        <p className={style['post-desc']}>{desc}</p>
      </div>
      <div className={style.action}>
        <div className={style.tags}>
          {tags.map((tag) => (
            <Tag
              className={style.tag}
              color={tag.color}
            >
              {tag.content}
            </Tag>
          ))}
        </div>
        <Button onClick={handleClick} className={style.button}>Read More</Button>
      </div>
    </div>
  );
}

export default PostCard;
