let visit = require('unist-util-visit');
var squeezeParagraphs = require('mdast-squeeze-paragraphs')
const u = require('unist-builder');

export interface AbbrProps {
    text: string,
    title: string
}

export const RemarkAbbr = () => {

    return transformer

    function transformer(tree: any) {

        const keepNodes: AbbrProps[] = [];
        const regex = new RegExp(/[*]\[([^\]]*)\]:\s*(.+)\n*/)
        // get abbr data values
        visit(tree, "paragraph",
            (node: any) => {
                if (node.type !== 'paragraph') {
                    return node;
                }
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
            })

        if (keepNodes.length > 0) {
            // clear out empty nodes
            squeezeParagraphs(tree);
            const pattern = keepNodes.map(item => item.text).join("|");
            const inlineRegex = new RegExp(`\\b(${pattern})\\b`, "i")

            // get abbr text values to replace
            visit(tree, "paragraph", (node: any, index: number, parent: any) => {
                const { children = [] } = node;
                let newChildren: any[] = [];
                if (node.type !== 'paragraph') {
                    return node;
                }
                const [{ value, type }, ...siblings] = children;
                if (type === "text") {
                    const check = inlineRegex.test(value);
                    if (check) {
                        newChildren = value.split(inlineRegex)
                            .filter((x: string) => x !== '')
                            .map(((y: string) => {
                                let matchedAbbr = keepNodes.filter(abbrItem => abbrItem.text.toLowerCase() === y.toLowerCase());
                                return matchedAbbr.length > 0 ? abbrNodeGenerator(updateAbbr(matchedAbbr[0], y)) : textNodeGenerator(y)
                            }))
                    }
                    if (newChildren.length > 0) {
                        parent.children[index] = u("paragraph", [...newChildren, ...siblings]);
                    }
                }
            })
        }
    }


}

const updateAbbr = (abbrData: AbbrProps, newText: string): AbbrProps => {
    return {
        ...abbrData,
        text: newText
    }
}

const abbrNodeGenerator = (abbrData: AbbrProps) => {
    return {
        type: 'content',
        children: [
            { type: "text", value: abbrData.text },
        ],
        data: {
            hName: 'abbr',
            hProperties: {
                title: abbrData.title
            }
        }
    }
}

const textNodeGenerator = (value: string) => {
    return u('text', value);
}