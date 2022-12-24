import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'react-markdown-editor-lite/lib/index.css';
// use react-markdown instead of markdown-it
// import MarkdownIt from 'markdown-it';
// import subscript from 'markdown-it-sub';
// import superscript from 'markdown-it-sup';
// import footnote from 'markdown-it-footnote';
// import deflist from 'markdown-it-deflist';
// import abbreviation from 'markdown-it-abbr';
// import mark from 'markdown-it-mark';
// import tasklists from 'markdown-it-task-lists';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './style.less';

function Editor({ defaultValue, onEditorChange, plugins, preview, className }) {
  // const mdParser = new MarkdownIt({
  //   html: true,
  //   linkify: true,
  //   typographer: true,
  //   highlight: function (str, lang) {
  //     console.log(str, lang);
  //     if (lang) {
  //       try {
  //         return <SyntaxHighlighter language={lang}>{str}</SyntaxHighlighter>;

  //         // hljs.highlight(lang, str).value
  //       } catch (__) {}
  //     }
  //     return ''; // use external default escaping
  //   },
  // })
  //   .use(subscript) // 下标 ~test~
  //   .use(superscript) // 上标 ^test^
  //   .use(footnote) // 脚注 ^[1] ^[test]
  //   .use(deflist) // 定义 : test
  //   .use(abbreviation) // 解释 *[test]: test
  //   .use(mark) // 标记 ==test==
  //   .use(tasklists); // 任务列表，配合列表使用 - [ ] a -[x] b
  // MdEditor.use(Plugins.TabInsert, {
  //   tabMapValue: 2,
  // });
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

export default Editor;
