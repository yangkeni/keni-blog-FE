import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'react-markdown-editor-lite/lib/index.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './style.less';

function Editor({
  value,
  onChange,
  plugins,
  preview = false,
  className,
}) {

  const editorView = {
    menu: !preview,
    md: !preview,
    html: true,
  };

  const basicPlugins = [
    'font-bold',
    'font-italic',
    'font-strikethrough',
    'list-unordered',
    'list-ordered',
    'block-quote',
    'block-wrap',
    'block-code-inline',
    'block-code-block',
    'table',
    'image',
    'link',
    'logger',
    'mode-toggle',
    'full-screen',
  ];

  function onEditorChange({ html, text }) {
    // console.log('handleEditorChange', html, text);
    // 包一层方便传给表单控件
    onChange?.(text);
  }

  return (
    <MdEditor
      className={`md-editor ${className ?? ''} ${preview ? 'preview' : ''}`}
      markdownClass="md-editor-content"
      htmlClass="md-preview-content custom-html-style"
      syncScrollMode={['leftFollowRight', 'rightFollowLeft']}
      value={value}
      view={editorView}
      renderHTML={(text) => (
        <ReactMarkdown
          remarkPlugins={[gfm]}
          children={text}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code
                  className={className}
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        />
      )}
      onChange={onEditorChange}
      plugins={plugins ?? basicPlugins}
    />
  );
}

export default Editor;
