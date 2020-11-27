import fs from "fs";
import remark from "remark";

import { RemarkAbbr } from "./remarkAbbr";
let doc = fs.readFileSync(__dirname + "/testing.md", "utf8");

const Plugin = () => {
    const result = remark()
        .use(RemarkAbbr)
        .processSync(doc);

    // console.log("contents: ", result.contents);

    return result.contents;
}


export default Plugin;