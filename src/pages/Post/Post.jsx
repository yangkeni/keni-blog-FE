import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Tag, message, Empty, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { deletePost, getPost } from '../../api/post';
import EditSVG from '../../assets/edit.svg';
import CloseSVG from '../../assets/close.svg';
import Editor from '../../components/Editor/Editor';
import './style.less';
import { useCurUser } from '../../hooks';
import { setTitle } from '../../../utils';

dayjs.extend(relativeTime);

function Post() {

  const { curUser } = useCurUser();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const param = useLocation().pathname.split('/')[2];

  useEffect(() => {
    const fetchPostData = async () => {
      const res = await getPost(param);
      setPost(res.data);
    };
    fetchPostData();
  }, [param]);

  useEffect(() => {
    setTitle(post.title || '空白页');
  }, [post]);

  const handleConfirm = () => {
    return deletePost(param)
      .then(navigate('/'))
      .then(message.success('delete success 🥳'));
  }

  return (
    <div className="post">
      <div className="post-header">
        <h1 className="post-title">
          <Link to={`/post/${post.postId}`}>{post.title}</Link>
        </h1>
        <div className="post-meta">
          <div className="post-tags">
            {post.tags?.map((tag) => (
              <Tag
                key={tag.content}
                color={tag.color}
              >
                {tag.content}
              </Tag>
            ))}
          </div>
          <div className="post-basic">
            <span>
              Author:<Link>{post.author}</Link>
            </span>
            <span>
              Date:<span>{dayjs(post.modified).fromNow()}</span>
            </span>
            {curUser && (
              <>
                <span>
                  <Link to={`/write/${post.postId}`}>
                    <EditSVG />
                  </Link>
                </span>
                <Popconfirm
                  title="确定要删除文章吗？"
                  onConfirm={handleConfirm}
                  okText='确定'
                  cancelText='取消'
                >
                  <span>
                    <CloseSVG
                      className="post-delete"
                    />
                  </span>
                </Popconfirm>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="post-content">
        {post.content ? (
          <Editor
            preview
            // defaultValue={post.content}
            value={post.content}
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </div>
  );
}

export default Post;
