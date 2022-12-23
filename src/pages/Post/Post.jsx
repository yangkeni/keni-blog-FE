import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.less';

function Post() {
  const testMeta = {
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
  };
  const testPost = {
    id: 1,
    content:
      '这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长',
  };
  // 两个表 一个meta数据，一个文章
  const [postMeta, setPostMeta] = useState();
  const [post, setPost] = useState();
  useEffect(() => {
    setPostMeta(testMeta);
    setPost(testPost);
  }, []);

  return (
    <div className="post">
      <div className="post-header">
        <h1 className="post-title">
          <Link to={`/post/${testMeta.id}`}>{testMeta.title}</Link>
        </h1>
        <div>
          <span>作者</span>
          <span>时间</span>
          <span>标签</span>
        </div>
      </div>
      <div className="post-content">{testPost.content}</div>
    </div>
  );
}

export default Post;
