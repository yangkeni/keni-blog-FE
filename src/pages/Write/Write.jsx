import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, message, notification, Radio, Select, Tag } from 'antd';
import Editor from '../../components/Editor/Editor';
import Button from '../../components/Button/Button';
import { addPost, getPost, updatePost } from '../../api/post';
import { useCurUser } from '../../hooks';
import { getTags } from '../../api/tag';
import { debounce, find, isEmpty } from 'lodash';
import './style.less';
import { setTitle } from '../../../utils';

function Write() {
  const [post, setPost] = useState({});
  const [tags, setTags] = useState([]);
  const { curUser } = useCurUser();

  const [api, contextHolder] = notification.useNotification();

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
      tags: post.tags?.map((val) => val.value),
      content: post.content,
    });
    setTitle(post.title || '空白页');
  }, [post]);

  const handleValuesChange = async (changeVal, val) => {
    // 做了debounce 防抖
    if (changeVal.title) {
      changeVal.title !== '' ? setTitle(changeVal.title) : setTitle('空白页');
    }
    if (param && !isEmpty(changeVal)) {
      const curTags = val.tags?.map((tag) => find(tags, ['value', tag])?.id);
      try {
        await updatePost(param, {
          ...val,
          tags: curTags,
        });
        api.info({
          message: '自动保存成功',
          placement: 'topLeft',
          duration: 1,
        });
      } catch (error) {
        api.warning({
          message: '自动保存失败',
          placement: 'topLeft',
          duration: 1,
        });
      }
    }
  };

  const autoSave = debounce(handleValuesChange, 3000);

  const handleFinish = async (val) => {
    autoSave.cancel();
    const curTags = val.tags?.map((tag) => find(tags, ['value', tag])?.id);
    const updatePostFunc = () => {
      return updatePost(param, {
        ...val,
        tags: curTags,
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
      param
        ? message.success('modified success 😘')
        : message.success('create success 😘');
      navigate('/');
    } catch (error) {
      param
        ? message.error('modified failed 😢')
        : message.error('create failed 😢');
    }
  };

  return (
    <div className="write">
      {contextHolder}
      <Form
        layout="horizontal"
        className="write-form"
        form={writeForm}
        onValuesChange={param ? autoSave : handleValuesChange}
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
