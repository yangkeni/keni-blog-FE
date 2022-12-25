import React from 'react';
import Editor from '../../components/Editor/Editor';
import { Form, Input, message, Select, Tag } from 'antd';
import Button from '../../components/Button/Button';
import './style.less';

function Write() {
  const [writeForm] = Form.useForm();
  const options = [
    {
      color: 'orange',
      label: 'react',
      // label: 'orange',
      value: 'react1',
    },
    {
      color: 'volcano',
      label: 'tech',
      // label: 'volcano',
      value: 'tech2',
    },
  ];
  const handleValuesChange = (changeVal, val) => {
    console.log(changeVal, val);
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
        <Form.Item name="main">
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
