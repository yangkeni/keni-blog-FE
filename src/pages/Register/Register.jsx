import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
// import NormalBreadcrumb from 'components/NormalBreadcrumb/NormalBreadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { registerReq } from '../../api/auth';
import './style.less';
import { setTitle } from '../../../utils';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();
  const { validateFields } = registerForm;

  useEffect(() => {
    setTitle('注册');
  }, []);

  const handleButtonClick = (e) => {
    setLoading(true);
    e.target.blur();
    validateFields()
      .then(async (values) => {
        const registerData = {
          username: values.username,
          email: values.email,
          password: values.password,
        };
        try {
          await registerReq(registerData);
        } catch (error) {
          throw error;
        }
        message.success('register success');
        setLoading(false);
        navigate('/login');
      })
      .catch((err) => {
        message.error('register failed: ' + err.response.data);
        setLoading(false);
      });
  };

  return (
    <>
      {/* <NormalBreadcrumb categoryName="注册" /> */}
      <div className="register-container">
        <h3 className="register-title">注册账户</h3>
        <Form
          layout="vertical"
          className="register-form"
          form={registerForm}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '用户名不能为空' }]}
            className="register-input-form"
          >
            <Input className="register-input" />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: '邮箱格式不正确',
              },
              {
                required: true,
                message: '请输入邮箱',
              },
            ]}
            className="register-input-form"
          >
            <Input className="register-input" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '密码不能为空' }]}
            className="register-input-form"
          >
            <Input.Password className="register-input" />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次输入密码进行确认',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入密码不一致'));
                },
              }),
            ]}
            className="register-input-form"
          >
            <Input.Password className="register-input" />
          </Form.Item>
          <Form.Item>
            <Button
              className="register-button"
              htmlType="submit"
              loading={loading}
              onClick={handleButtonClick}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
        <span className="go-login">
          已有账号？<Link to={'/login'}>现在登录</Link>
        </span>
      </div>
    </>
  );
};

export default Register;
