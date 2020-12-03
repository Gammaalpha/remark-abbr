import Plugin from "./plugin";
// let Plugin = require("./plugin");
test('should not have the abbr declaration node', () => {
    expect(Plugin()).not.toContain("\\*\\[html]:hyperlinktext");
})

test('should have the abbr translated node', () => {
    expect(Plugin()).toMatch(/(title="hyperlinktext")/i);
})

