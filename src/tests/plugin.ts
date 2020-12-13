import fs from "fs";
import remark from "remark";

import { RemarkAbbr } from "../remarkAbbr";
let doc = fs.readFileSync(__dirname + "/testing.md", "utf8");

const Plugin = () => {
    const unified = require("unified");
    const remarkParse = require("remark-parse");
    const remark2rehype = require("remark-rehype")
    const rehypeStringify = require("rehype-stringify")
    const remarkGfm = require('remark-gfm')
    let content = "";
    const result = remark()
        .use(remarkParse)
        .use(RemarkAbbr)
        .use(remarkGfm)
        .use(remark2rehype)
        .use(rehypeStringify)
        .process(fs.readFileSync(__dirname + `\\testing.md`), (err: any, file: any) => {
            // console.log(String(file));
            content = String(file)
        }
        );
    // console.log("Content :", content);

    return content;
}


export default Plugin;