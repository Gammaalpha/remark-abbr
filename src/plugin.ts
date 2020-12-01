import fs from "fs";
import remark from "remark";

import { RemarkAbbr } from "./remarkAbbr";
let doc = fs.readFileSync(__dirname + "/testing.md", "utf8");

const Plugin = () => {
    const result = remark()
        .use(RemarkAbbr)
        .use(() => (tree: any) => {
            console.log("AFTER TREE: ", JSON.stringify(tree, null, 2));
        })
        .processSync(doc);

    return result.contents;
}


export default Plugin;