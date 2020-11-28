let visit = require('unist-util-visit');
// const u = require('unist-builder');
let remove = require('unist-util-remove');
var squeezeParagraphs = require('mdast-squeeze-paragraphs')


export interface AbbrProps {
    text: string,
    title: string
}

export const RemarkAbbr = () => {

    return transformer

    function transformer(tree: any, file: any) {
        const keepNodes: AbbrProps[] = [];
        const regex = new RegExp(/[*]\[([^\]]*)\]:\s*(.+)\n*/)
        // get abbr data values
        visit(tree, "paragraph",
            (node: any) => {
                if (node.type === "paragraph") {
                    let lastChild = node.children[node.children.length - 1];

                    if (lastChild && lastChild.type === "text") {
                        const nodeCheck = regex.exec(lastChild.value);
                        // console.log("Keeping: ", nodeCheck);
                        if (nodeCheck !== null) {
                            keepNodes.push({
                                text: nodeCheck[1],
                                title: nodeCheck[2]
                            });
                            node.children[node.children.length - 1].value = "";
                        }
                        //clear out the abbr input data
                    }
                }
            })
        // clear out empty nodes
        squeezeParagraphs(tree);

        // get abbr text values to replace
        visit(tree, "text", (node: any, index: number, parent: any) => {
            console.log("Nodes: ", node);
            keepNodes.forEach(abbr => {
                if (abbr.text === node.value) {
                    node.value = `<abbr title=${abbr.title}>${abbr.text}</abbr>`
                }
            })
        })
        // console.log("tree after: ", JSON.stringify(tree, null, 2));
    }
}