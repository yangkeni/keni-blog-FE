import React, { useState, useEffect } from 'react';
import PostCard from '../../components/PostCard/PostCard';
import './style.less';

const Home = () => {
  const [postData, setPostData] = useState([]);
  const fake = [
    {
      id: 1,
      title: 'keni的第一篇博客',
      desc: '这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长',
      tags: [
        {
          color: 'orange',
          content: 'react',
        },
        {
          color: 'volcano',
          content: 'tech',
        },
      ],
    },
    {
      id: 2,
      title: 'keni的第一篇博客',
      desc: '这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长',
      tags: [
        {
          color: 'orange',
          content: 'react',
        },
        {
          color: 'volcano',
          content: 'tech',
        },
      ],
    },
    {
      id: 3,
      title: 'keni的第一篇博客',
      desc: '这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长',
      tags: [
        {
          color: 'orange',
          content: 'react',
        },
        {
          color: 'volcano',
          content: 'tech',
        },
      ],
    },
    {
      id: 4,
      title: 'keni的第一篇博客',
      desc: '这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长',
      tags: [
        {
          color: 'orange',
          content: 'react',
        },
        {
          color: 'volcano',
          content: 'tech',
        },
      ],
    },
  ];
  useEffect(() => {
    // 取post的数据
    setPostData(fake);
  }, []);

  return (
    <div className="home">
      <div className="post-list">
        {postData.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            desc={post.desc}
            tags={post.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
