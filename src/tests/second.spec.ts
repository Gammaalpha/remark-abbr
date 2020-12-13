import Plugin from "./plugin";

let result = Plugin();
console.log("test res:", result);

test('should not have the abbr declaration node', () => {
    expect(result).not.toContain(/(\*\[html\]\:hypertext)/i);
})

test('should not have the abbr nested', () => {
    expect(result).not.toMatch(/(\<abbr title="hypertext"\>\<abbr title="hypertext"\>html\<\/abbr\>\<\/abbr\>)/i);
})