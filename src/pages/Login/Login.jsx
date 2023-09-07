import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
// import NormalBreadcrumb from 'components/NormalBreadcrumb/NormalBreadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { loginReq } from '../../api/auth';
import { useCurUser } from '../../hooks';
import './style.less';
import { setTitle } from '../../../utils';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setCurUser } = useCurUser();
  const [loginForm] = Form.useForm();
  const navigate = useNavigate();
  const { validateFields } = loginForm;

  useEffect(() => {
    setTitle('登录');
  }, []);

  const handleButtonClick = (e) => {
    setLoading(true);
    e.target.blur();
    validateFields()
      .then(async (values) => {
        const loginData = {
          username: values.username,
          password: values.password,
        };
        try {
          const res = await loginReq(loginData);
          setCurUser(res.data);
        } catch (error) {
          throw error;
        }
        setLoading(false);
        message.success('login success');
        navigate('/');
      })
      .catch((err) => {
        message.error('login failed: ' + err.response.data);
        setLoading(false);
      });
  };

  return (
    <>
      {/* <NormalBreadcrumb categoryName="登录" /> */}
      <div className="login-container">
        <h3 className="login-title">登录账户</h3>
        <Form
          layout="vertical"
          className="login-form"
          requiredMark="optional"
          form={loginForm}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '用户名不能为空' }]}
            className="login-input-form"
          >
            <Input
              className="login-input"
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '密码不能为空' }]}
            className="login-input-form"
          >
            <Input.Password
              className="login-input"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="login-button"
              htmlType="submit"
              loading={loading}
              onClick={handleButtonClick}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        {/* <span className="go-register">
          没有账号？<Link to={'/register'}>现在注册</Link>
        </span> */}
      </div>
    </>
  );
};

export default Login;
