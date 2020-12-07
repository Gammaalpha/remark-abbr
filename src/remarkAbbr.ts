let visit = require('unist-util-visit');
var squeezeParagraphs = require('mdast-squeeze-paragraphs')
const u = require('unist-builder');

export interface AbbrProps {
    text: string,
    title: string
}

interface ChildItemProps {
    position: number,
    children: any
}

export const RemarkAbbr = () => {
    return transformer

    function transformer(tree: any) {
        const keepNodes: AbbrProps[] = [];
        const regex = new RegExp(/[*]\[([^\]]*)\]:\s*(.+)\n*/)
        let emptyNode = false;
        // get abbr data values
        visit(tree, "paragraph",
            (node: any) => {
                if (node.type !== 'paragraph') {
                    return node;
                }
                let lastItem = node.children[node.children.length - 1];

                if (lastItem && lastItem.type === "text" && regex.test(lastItem.value)) {
                    let splitLines = [];
                    splitLines = lastItem.value.split("\n");

                    const finalString = splitLines.map((element: string) => {
                        // const valTest = regex.test(element);
                        const nodeCheck = regex.exec(element);
                        if (nodeCheck !== null) {
                            keepNodes.push({
                                text: nodeCheck[1],
                                title: nodeCheck[2]
                            });
                            //clear out the abbr input data
                            return "";
                        }
                        else {
                            return element;
                        }
                    }).filter((i: string) => i !== "").join("\n");
                    emptyNode = finalString.trim() !== "" ? false : true;
                    // console.log(parent[index])
                    node.children[node.children.length - 1] = textNodeGenerator(finalString);
                }
            });
        if (emptyNode && keepNodes.length > 0) {
            squeezeParagraphs(tree);
        }

        if (keepNodes.length > 0) {
            // clear out empty nodes
            const pattern = keepNodes.map(item => item.text).join("|");
            const inlineRegex = new RegExp(`\\b(${pattern})\\b`, "i")

            // get abbr text values to replace
            visit(tree, "paragraph", (node: any, index: number, parent: any) => {
                let { children = [] } = node;
                if (node.type === 'paragraph') {
                    let childItemsToSplice: ChildItemProps[] = [];
                    children.forEach((element: any, childIndex: number) => {
                        if (element.type === "text") {
                            const check = inlineRegex.test(element.value);
                            if (check) {
                                let newChildren: any[] = [];
                                newChildren = element.value.split(inlineRegex)
                                    .filter((x: string) => x !== '')
                                    .map(((y: string) => {
                                        let matchedAbbr = keepNodes.filter(abbrItem => abbrItem.text.toLowerCase() === y.toLowerCase());
                                        return matchedAbbr.length > 0 ? abbrNodeGenerator(updateAbbr(matchedAbbr[0], y)) : textNodeGenerator(y)
                                    }))
                                childItemsToSplice.push({ position: childIndex, children: newChildren })
                            }
                        }
                    });
                    if (childItemsToSplice.length > 0) {
                        parent.children[index] = u("paragraph", spliceArray(children, childItemsToSplice))
                    }
                }
            });
        }
        // return tree;

    }
}


const spliceArray = (mainArray: any[], data: any[]) => {
    let tempMainArray = [...mainArray]
    data.reverse().forEach((element: ChildItemProps) => {
        tempMainArray.splice(element.position, 1, ...element.children)
    })
    return tempMainArray;
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