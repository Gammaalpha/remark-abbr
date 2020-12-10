# remark-abbr

[remark](https://github.com/remarkjs/remark "remark github repo") plugin to parse custom Markdown syntax to produce abbreviations.

It creates a new MDAST node type : "abbr".

A demo for it can be seen [here](https://gammaalpha.github.io/rec-markdown/)

> Note: Does **NOT** work with [React Markdown](https://github.com/remarkjs/react-markdown)

## Install

npm:

> npm install https://github.com/Gammaalpha/remark-abbr.git

_or_

yarn:

> yarn add https://github.com/Gammaalpha/remark-abbr.git

## Use

If we have the following file, example.md

```
*[MDAST]:Markdown Abstract Syntax Trees

This plugin is built for the current remark-parser and uses MDAST implemented by
[remark](https://github.com/remarkjs/remark)
```

And the script example.js has the following code:

```javascript
const fs = require("fs");
const unified = require("unified");
const remarkParse = require("remark-parse");
const remark2rehype = require("remark-rehype");
const rehypeStringify = require("rehype-stringify");

unified()
  .use(remarkParse)
  .use(RemarkAbbr)
  .use(remark2rehype)
  .use(rehypeStringify)
  .process(
    fs.readFileSync(`${process.cwd()}/src/example.md`),
    (err: any, file: any) => console.log(String(file))
  );
```

This would output into the following HTML:

```html
<p>
  This plugin is built for the current remark-parser and uses
  <abbr title="Markdown Abstract Syntax Trees">MDAST</abbr> implemented by
  <a href="https://github.com/remarkjs/remark">remark</a>
</p>
```

## License

[MIT](https://github.com/remarkjs/remark-html/blob/main/license "MIT License")
