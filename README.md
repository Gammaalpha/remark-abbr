#  remark-abbr

[remark](https://github.com/remarkjs/remark "remark github repo") plugin to parse custom Markdown syntax to produce abbreviations.

It creates a new MDAST node type : "abbr".

## Install

npm:
`
npm install https://github.com/Gammaalpha/remark-abbr.git
`

*or*

yarn:
`
yarn add https://github.com/Gammaalpha/remark-abbr.git
`

## Use

If we have the following file, example.md

`
*[MDAST]:Markdown Abstract Syntax Trees

This plugin is built for the current remark-parser and uses MDAST implemented by [remark](https://github.com/remarkjs/remark)
`
 And our script example.js has the following code: 

`
const remark = require('remark-abbr');

remark()
  .use(require('remark-abbr'))
  .process(src, (err, file) => console.log(String(file)));
`

This would output into the following HTML:
`
<p>This plugin is built for the current remark-parser and uses <abbr title="Markdown Abstract Syntax Trees">MDAST</abbr> implemented by <a href="https://github.com/remarkjs/remark">remark</a></p>
`

 ## License 
 [MIT](https://github.com/remarkjs/remark-html/blob/main/license "MIT License")