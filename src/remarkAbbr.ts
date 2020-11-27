let visit = require('unist-util-visit');
// const u = require('unist-builder');
let remove = require('unist-util-remove');
var squeezeParagraphs = require('mdast-squeeze-paragraphs')


export interface AbbrProps {
    value: string,
    title: string
}

export const RemarkAbbr = () => {

    return transformer

    function transformer(tree: any, file: any) {
        // console.log("tree before:", tree);
        const keepNodes: AbbrProps[] = [];
        const regex = new RegExp(/[*]\[([^\]]*)\]:\s*(.+)\n*/)
        // get abbr data values
        visit(tree, "paragraph",
            (node: any) => {
                // console.log("paragraph node: ", node);
                if (node.type === "paragraph") {
                    let lastChild = node.children[node.children.length - 1];

                    if (lastChild && lastChild.type === "text") {
                        const nodeCheck = regex.exec(lastChild.value);
                        // console.log("Keeping: ", nodeCheck);
                        if (nodeCheck !== null) {
                            keepNodes.push({
                                value: nodeCheck[1],
                                title: nodeCheck[2]
                            });
                        }
                        //clear out the abbr input data
                        node.children[node.children.length - 1].value = "";
                    }
                }
            })


        // get abbr text values to replace
        visit(tree, "text", (node: any, index: number, parent: any) => {

        })
        console.log("tree after: ", JSON.stringify(tree, null, 2));
        squeezeParagraphs(tree);
    }
}