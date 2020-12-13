import Plugin from "./plugin";
// let Plugin = require("./plugin");


let result = "";
describe("not section", () => {
    beforeAll(() => {
        result = Plugin();
    })
    it('should have the abbr translated node as is', () => {
        expect(result).toMatch(/(\<abbr title="hypertext"\>html\<\/abbr\>)/i);
    })


    it('should have the abbr translated node in strong tag', () => {
        expect(result).toMatch(/(\<strong\>\<abbr title="testing"\>test\<\/abbr\>\<\/strong\>)/i);
    })


    it('should have the abbr translated node in table cell tag', () => {
        expect(result).toMatch(/(\<td align="center"\>Put Pipes In \<abbr title="hypertext"\>HTML\<\/abbr\>\<\/td\>)/);
    })
});
