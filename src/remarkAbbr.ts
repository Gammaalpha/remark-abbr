import { getPositionOfLineAndCharacter } from "typescript";

let visit = require('unist-util-visit');
let squeezeParagraphs = require('mdast-squeeze-paragraphs')
let u = require('unist-builder');
let findAndReplace = require('mdast-util-find-and-replace');
let remove = require('unist-util-remove')

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
        findAndReplace(tree, regex, (val: string) => {
            const nodeCheck = regex.exec(val);
            if (nodeCheck !== null) {
                keepNodes.push({
                    text: nodeCheck[1],
                    title: nodeCheck[2]
                });
                //clear out the abbr input data
                return u('emptyAbbr', keepNodes.length);
            }
            return val;
        })

        if (keepNodes.length > 0) {
            //remove emptyAbbr nodes
            remove(tree, 'emptyAbbr')
            const inlineRegex = (val: string) => new RegExp(`\\b(${val})\\b`, "i")
            keepNodes.forEach(item => {
                findAndReplace(tree, inlineRegex(item.text), (val: string) => {
                    return abbrNodeGenerator(updateAbbr(item, val));
                })
            });
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