import Plugin from "./plugin";
// let Plugin = require("./plugin");
test('should remove the abbr decleration node', () => {
    expect(Plugin()).not.toContain("\\*\\[html]:hyperlinktext");
})
