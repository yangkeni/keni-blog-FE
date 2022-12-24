import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'react-markdown-editor-lite/lib/index.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './style.less';

function Preview({ defaultValue, onEditorChange, plugins, className }) {
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
  // function onEditorChange({ html, text }) {
  //   console.log('handleEditorChange', html, text);
  //   return handleEditorChange ? handleEditorChange({ html, text }) : null;
  // }

  return (
    <MdEditor
      className={`md-editor ${className ?? ''}`}
      markdownClass="md-editor-content"
      htmlClass="md-preview-content custom-html-style"
      syncScrollMode={['rightFollowLeft']}
      // value={value}
      defaultValue={defaultValue}
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
      // renderHTML={(text) => mdParser.render(text)}
      onChange={onEditorChange}
      plugins={plugins ?? basicPlugins}
    />
  );
}

export default Preview;
