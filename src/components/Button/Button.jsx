import React from 'react';
import { Button as AntdButton } from 'antd';
import style from './style.module.less';

function Button({ className, loading = false, onClick, content, ...props }) {
  return (
    <>
    <AntdButton
      className={`${style.button} ${className ?? ''}`}
      onClick={onClick}
      loading={loading}
      {...props}
    >
      {content}
      {props.children}
    </AntdButton>
    </>
  );
}

export default Button;
