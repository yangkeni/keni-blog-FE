import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, message, Radio, Select, Tag } from 'antd';
import Editor from '../../components/Editor/Editor';
import Button from '../../components/Button/Button';
import { addPost, getPost, updatePost } from '../../api/post';
import { useCurUser } from '../../hooks';
import './style.less';
import { getTags } from '../../api/tag';

function Write() {
  const [post, setPost] = useState({});
  const [tags, setTags] = useState([]);
  const { curUser } = useCurUser();

  const param = useLocation().pathname.split('/')[2] || '';
  const navigate = useNavigate();

  const [writeForm] = Form.useForm();

  useEffect(() => {
    const fetchPostData = async () => {
      const res = await getPost(param);
      setPost(res.data);
    };
    const fetchTagsData = async () => {
      const res = await getTags();
      setTags(res.data);
    };
    param && fetchPostData();
    fetchTagsData();
  }, [param]);

  useEffect(() => {
    writeForm.setFieldsValue({
      title: post.title,
      desc: post.desc,
      cat: post.cat,
      tags: post.tags?.map((val) => val.id),
      content: post.content,
    });
  }, [post]);

  const handleValuesChange = (changeVal, val) => {
    // console.log(val);
  };

  const handleFinish = async (val) => {
    const updatePostFunc = () => {
      return updatePost(param, {
        ...val,
        tags: [1, 2],
      });
    };
    const addPostFunc = () => {
      return addPost({
        ...val,
        tags: [1, 2],
        username: curUser.username,
      });
    };
    try {
      param ? await updatePostFunc() : await addPostFunc();
      message.success('modified success 😘');
      navigate('/');
    } catch (error) {
      message.error('modified failed 😢');
    }
  };

  return (
    <div className="write">
      <Form
        layout="horizontal"
        className="write-form"
        form={writeForm}
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
      >
        <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true, message: '标题不能为空' }]}
          className="write-input-form"
        >
          <Input
            className="write-input"
            placeholder="请输入标题"
            bordered={false}
          />
        </Form.Item>
        <Form.Item
          name="desc"
          label="描述"
          rules={[{ required: true, message: '描述不能为空' }]}
          className="write-input-form"
        >
          <Input
            className="write-input"
            showCount
            maxLength={200}
            placeholder="请输入描述"
            bordered={false}
          />
        </Form.Item>
        <div className="write-archive">
          <Form.Item
            name="cat"
            label="类别"
            className="write-input-form"
            rules={[{ required: true, message: '请选择类别' }]}
          >
            <Radio.Group options={['diary', 'algorithm', 'tech']} />
          </Form.Item>
          <Form.Item
            name="tags"
            label="标签"
            rules={[{ required: true, message: '请选择标签' }]}
            className="write-input-form"
          >
            <Select
              className="write-input"
              mode="multiple"
              showArrow
              optionFilterProp="label"
              tagRender={(props) => {
                const { label, value, closable, onClose } = props;
                return (
                  <Tag
                    color={value}
                    closable={closable}
                    onClose={onClose}
                  >
                    {label}
                  </Tag>
                );
              }}
              placeholder="请选择标签"
              bordered={false}
              options={tags}
            />
          </Form.Item>
        </div>
        <Form.Item name="content">
          <Editor />
        </Form.Item>
        <Form.Item>
          <Button
            className="write-button"
            htmlType="submit"
            type="primary"
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Write;
