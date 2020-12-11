import { getPositionOfLineAndCharacter } from "typescript";

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

            visit(tree, "text", (node: any, index: number, parent: any) => {
                console.log(node, index, parent);
                let childItemsToSplice: ChildItemProps[] = [];

                if (node.type === "text" && node.value !== " ") {
                    const check = inlineRegex.test(node.value);
                    if (check) {
                        let newChildren: any[] = [];
                        newChildren = node.value.split(inlineRegex)
                            .filter((x: string) => x !== '')
                            .map(((y: string) => {
                                let matchedAbbr = keepNodes.filter(abbrItem => abbrItem.text.toLowerCase() === y.toLowerCase());

                                return matchedAbbr.length > 0 ? abbrNodeGenerator(updateAbbr(matchedAbbr[0], y), node.position) : textNodeGenerator(y);
                            }));

                        childItemsToSplice.push({ position: index, children: newChildren })


                        if (childItemsToSplice.length > 0) {
                            spliceArray(parent.children, childItemsToSplice)
                        }
                    }
                }

            })

        }

    }
}


const spliceArray = (mainArray: any[], data: any[]) => {
    data.reverse().forEach((element: ChildItemProps) => {
        mainArray.splice(element.position, 1, ...element.children)
    })
}

const updateAbbr = (abbrData: AbbrProps, newText: string): AbbrProps => {
    return {
        ...abbrData,
        text: newText
    }
}

const abbrNodeGenerator = (abbrData: AbbrProps, position: any) => {
    return {
        type: 'content',
        position: position,
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