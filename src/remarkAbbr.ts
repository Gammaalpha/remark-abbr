let visit = require('unist-util-visit');
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
                if (node.type !== 'paragraph') {
                    return node;
                }
                if (node.type === "paragraph") {
                    let lastChild = node.children[node.children.length - 1];

                    if (lastChild && lastChild.type === "text") {
                        const nodeCheck = regex.exec(lastChild.value);
                        if (nodeCheck !== null) {
                            keepNodes.push({
                                text: nodeCheck[1],
                                title: nodeCheck[2]
                            });
                            //clear out the abbr input data
                            node.children[node.children.length - 1].value = "";
                        }
                    }
                }
            })
        // clear out empty nodes
        squeezeParagraphs(tree);

        // get abbr text values to replace
        visit(tree, "text", (node: any, index: number, parent: any) => {
            const position = node.position;

            keepNodes.forEach(abbr => {
                if (abbr.text === node.value) {
                    const newChild = {
                        type: 'element',
                        children: [
                            { type: "text", value: abbr.text },
                        ],
                        data: {
                            hName: 'abbr',
                            hProperties: {
                                title: abbr.title
                            }
                        },
                        position
                    }

                    parent.children[index] = newChild;

                }
            })
        })
    }
}