import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { Tag } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getPost } from '../../api/post';
import EditSVG from '../../assets/edit.svg';
import Editor from '../../components/Editor/Editor';
import './style.less';

dayjs.extend(relativeTime);

function Post() {
  const [post, setPost] = useState({});
  const param = useLocation().pathname.split('/')[2];
  useEffect(() => {
    const fetchPostData = async () => {
      const res = await getPost(param);
      setPost(res.data);
    };
    fetchPostData();
  }, [param]);

  return (
    <div className="post">
      <div className="post-header">
        <h1 className="post-title">
          <Link to={`/post/${post.postId}`}>{post.title}</Link>
        </h1>
        <div className="post-meta">
          <span>
            Author:<Link>{post.author}</Link>
          </span>
          <span>
            Date: <span>{dayjs(post.modified).fromNow()}</span>
          </span>
          <span>
            <Link to={`/write/${post.postId}`}>
              <EditSVG />
            </Link>
          </span>
          {/* <span>
            {post.tags?.map((tag) => (
              <Tag
                key={tag.content}
                color={tag.color}
              >
                {tag.content}
              </Tag>
            ))}
          </span> */}
        </div>
      </div>
      <div className="post-content">
        {post.content && (
          <Editor
            preview
            // defaultValue={post.content}
            value={post.content}
          />
        )}
      </div>
    </div>
  );
}

export default Post;
