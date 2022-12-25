import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import EditSVG from '../../assets/edit.svg';
import Editor from '../../components/Editor/Editor';
import './style.less';

function Post() {
  const testMeta = {
    id: 1,
    title: 'keni的第一篇博客',
    desc: '这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长这是keni的第一篇博客，这个描述暂时用来作为desc使用，他可能会很长很长',
    tags: [
      {
        color: 'orange',
        content: 'react',
      },
      {
        color: 'volcano',
        content: 'tech',
      },
    ],
  };
  const testPost = {
    id: 1,
    content:
      '# 实验四 元数据管理 ## 总体理解+ 选择用定长或变长记录保存个人通信簿的联系人信息 **已经在实验三中完成** + 选择使用二进制或者文本文件保存个人通信簿的元数据使用文本文件保存，实验三中的联系人信息使用二进制，所以在本次实验中使用不同的文本存储方式。则使用`fopen("meta.txt", "w")`完成文本的文件存储。+ 定义元数据元数据结构体需要包括元数据的标识符id，以及所指示的数据的基本信息和位置。+ 根据元数据从数据文件中显示所有的联系人遍历元数据文件，将每个元数据所指示的数据的位置读出、找出并显示。+ 支持基于手机号的查找元数据中有所指示的数据的基本信息，遍历元数据文件并比对基本信息中的手机号，如果满足要求则输出。+ 自己的简化select语句完成上面的两个任务引导用户输入正确的select语句，将语句读入并分解，最终引导进行不同的函数功能，完成任务。### 总体总结',
  };
  // 两个表 一个meta数据，一个文章
  const [postMeta, setPostMeta] = useState();
  const [post, setPost] = useState();
  useEffect(() => {
    setPostMeta(testMeta);
    setPost(testPost);
  }, []);

  return (
    <div className="post">
      <div className="post-header">
        <h1 className="post-title">
          <Link to={`/post/${testMeta.id}`}>{testMeta.title}</Link>
        </h1>
        <div className="post-meta">
          <span>
            Author:<Link>keni</Link>
          </span>
          <span>
            Date:<Link>July 5, 2019 21:27:59</Link>
          </span>
          <span>
            {testMeta.tags.map((tag) => (
              <Tag color={tag.color}>{tag.content}</Tag>
            ))}
          </span>
          <span>
            <Link to={`/write/${testMeta.id}`}>
              <EditSVG />
            </Link>
          </span>
        </div>
      </div>
      <div className="post-content">
        <Editor
          preview
          defaultValue={
            '# 实验四 元数据管理\n\n## 总体理解\n\n+ 选择用定长或变长记录保存个人通信簿的联系人信息 **已经在实验三中完成**\n+ 选择使用二进制或者文本文件保存个人通信簿的元数据\n  使用文本文件保存，实验三中的联系人信息使用二进制，所以在本次实验中使用不同的文本存储方式。\n  则使用`fopen("meta.txt", "w")`完成文本的文件存储。\n+ 定义元数据\n  元数据结构体需要包括元数据的标识符id，以及所指示的数据的基本信息和位置。\n+ 根据元数据从数据文件中显示所有的联系人\n  遍历元数据文件，将每个元数据所指示的数据的位置读出、找出并显示。\n+ 支持基于手机号的查找\n  元数据中有所指示的数据的基本信息，遍历元数据文件并比对基本信息中的手机号，如果满足要求则输出。\n+ 自己的简化select语句完成上面的两个任务\n  引导用户输入正确的select语句，将语句读入并分解，最终引导进行不同的函数功能，完成任务。\n\n### 总体总结\n\n总体上延续实验三的代码实现，在之后加入元数据文件，对数据文件进行一定的补充，并使用元数据文件简化完成对数据文件的查找功能，最后，简单的实现select sql语句，配合元数据文件进一步完成对数据文件的查找功能。\n\n## 具体实现\n\n### 初步\n\n确定数据结构\n\n+ 数据块结构，新增数据块号\n\n对于数据块结构，需要一个数据块号指定其位置,其初始值为1。\n\n![avatar](./screenshot/block_struct.png)\n\n+ 元数据数据结构\n\n对于元数据，在上文中有提到，需要元数据标识符、元数据包含的数据的基本信息、数据所在数据块号以及数据所在插槽号。\n\n![avatar](./screenshot/meta_struct.png)\n\n### 功能实现\n\n+ **优化**：支持对没满的数据块进行反复填充\n\n在对缓冲区进行初始化时，判断上一个数据块是否还有空余空间，如果有，则使用上一个数据块进行反复填充。使用`fseek`函数在文件末尾向前读一个数据块的长度并读取。\n\n![avatar](./screenshot/init_block.png)\n\n+ **元数据新增**：在`insert_block`时新增对应元数据，并将其写入文件\n\n先将数据完成正常的插入操作，之后打开`meta.txt`文件，并在文件末尾写入对应的元数据所需信息：id号、元数据的基本信息、所在数据块号以及插槽号。\n\n![avatar](./screenshot/insert_block.png)\n\n+ **优化**：不会重复保存相同的数据块\n\n声明并实现函数`same_block`，比较缓冲区中的数据块与文件`contact`中的最后一个数据块，如果两者相等则返回`true`，否则返回`false`。\n\n![avatar](./screenshot/same_block.png)\n\n在`save_block`中调用函数`same_block`，如果数据块相同，则对文件`fseek`，将流指针在文件末尾向前移动一个数据块长度，使用`fwrite`函数进行写入覆盖，如果不相同，则保留原本的逻辑。\n\n![avatar](./screenshot/save_block.png)\n\n+ *`add_contact`与`look_up_block`以及`load_file_use_contact`的逻辑与实验三基本一致*\n<br/>\n\n+ **元数据位置索引使用**：`position_find`函数\n\n在上文中，我们反复提到了元数据中提供了数据所在位置的指引，那我们要怎么使用这一索引呢？\n**根据元数据中的`block_id`和`slot_number`**\n在`contact`文件中索引到对应的`block_id`，声明一个缓冲区将其读出，找出对应的`slot_number`所在的插槽，插槽中数据即我们需要的数据，使用`Resume`数据结构储存数据并返回。\n\n![avatar](./screenshot/position_find.png)\n\n+ **功能新增**：`all_contact_use_meta`函数实现使用元数据显示所有联系人（即在菜单界面输入4所执行的函数）\n\n循环读取`meta.txt`文件中的元数据，使用`position_find`函数找到对应数据信息。\n\n![avatar](./screenshot/all_contact_use_meta.png)\n\n+ **功能新增**：`search_by_phone_use_meta(char* phone)`函数实现使用元数据查找手机号对应联系人信息（即在菜单界面输入5所执行的函数）\n\n循环读取`meta.txt`文件中的元数据，将用户输入的手机号信息与元数据中的基本信息里的手机号进行比对，如果正确，则使用`position_find`函数找到对应数据信息。\n\n![avatar](./screenshot/search_by_phone_use_meta.png)\n\n+ **功能新增**：`select_sql_use_meta`函数实现使用简单的`select`语句完成上面两个任务\n\n首先对用户做出提示，引导用户输入正确的`select`语句，对用户输入的语句使用`select_str[6][10]`进行一一比对，如果语句输入错误则提示用户，如果输入正确，判断`select`语句对应要求\n\n1. `select * from contact`对应函数`all_contact_use_meta`\n2. `select * from contact where phone = _`对应函数`search_by_phone_use_meta(char* phone)`\n\n![avatar](./screenshot/select_sql_use_meta.png)\n\n+ **菜单页面**\n\n![avatar](./screenshot/menu.png)\n\n## 功能测试\n\n### meta.txt文件中数据\n\n![avatat](./screenshot/meta_txt_data.png)\n\n### 显示所有联系人信息\n\n输入4执行函数，结果显示在`stdin`中\n\n![avatar](./screenshot/4_function.png)\n\n### 根据手机号显示联系人信息\n\n输入5进行查询，按照要去填入查询条件，在本例中共有两个联系人满足同一个手机号的条件，所以显示两个联系人信息。\n\n![avatar](./screenshot/5_function.png)\n\n### 实现简单的`select`语句\n\n输入6使用`select`语句，按照要去填入对应`select`语句，具体分为两种情况，如图所示。\n\n![avatar](./screenshot/6_function_1.png)\n\n![avatar](./screenshot/6_function_2.png)\n'
          }
        />
      </div>
    </div>
  );
}

export default Post;
