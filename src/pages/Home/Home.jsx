import { Empty } from 'antd';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setTitle } from '../../../utils';
import { getPosts } from '../../api/post';
import PostCard from '../../components/PostCard/PostCard';
import './style.less';

const Home = () => {
  const [postMeta, setPostMeta] = useState([]);
  const param = useLocation().search;

  useEffect(() => {
    setTitle('总览');
  }, []);

  useEffect(() => {
    const fetchPostsData = async () => {
      const res = await getPosts(param);
      // 取post的数据
      setPostMeta(res.data);
    };
    fetchPostsData();
  }, [param]);

  return (
    <div className="home">
      <div className="post-list">
        {postMeta.length > 0 ? (
          postMeta.map((post) => (
            <PostCard
              key={post.postId}
              id={post.postId}
              title={post.title}
              desc={post.desc}
              tags={post.tags}
            />
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </div>
  );
};

export default Home;
