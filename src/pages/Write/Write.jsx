import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Input, message, Select, Tag } from 'antd';
import Editor from '../../components/Editor/Editor';
import Button from '../../components/Button/Button';
import { getPost } from '../../api/post';
import './style.less';

function Write() {
  const [post, setPost] = useState({});

  const param = useLocation().pathname.split('/')[2] || '';

  const [writeForm] = Form.useForm();

  useEffect(() => {
    const fetchPostData = async () => {
      const res = await getPost(param);
      setPost(res.data);
    };
    param && fetchPostData();
  }, [param]);

  useEffect(() => {
    writeForm.setFieldsValue({
      title: post.title,
      desc: post.desc,
      tags: post.tags?.map((val) => val.id),
      content: post.content,
    });
  }, [post]);

  const options = [
    // TODO: 获取标签表
    {
      color: 'orange',
      label: 'react',
      // label: 'orange',
      value: 1,
    },
    {
      color: 'volcano',
      label: 'tech',
      // label: 'volcano',
      value: 2,
    },
  ];

  const handleValuesChange = (changeVal, val) => {
    console.log(val);
  };

  return (
    <div className="write">
      <Form
        layout="horizontal"
        className="write-form"
        form={writeForm}
        onValuesChange={handleValuesChange}
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
            tagRender={(props) => {
              const { label, value, closable, onClose } = props;
              return (
                // TODO: 之后可以使用表查找或者其他方法
                <Tag
                  color="orange"
                  closable={closable}
                  onClose={onClose}
                >
                  {label}
                </Tag>
              );
            }}
            placeholder="请选择标签"
            bordered={false}
            options={options}
          />
        </Form.Item>
        <Form.Item name="content">
          <Editor />
        </Form.Item>
        <Form.Item>
          <Button
            className="write-button"
            htmlType="submit"
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Write;
