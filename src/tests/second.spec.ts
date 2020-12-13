import Plugin from "./plugin";

let result = "";
describe("not section", () => {
    beforeAll(() => {
        result = Plugin();
    })
    it('should not have the abbr declaration node', () => {
        expect(result).not.toContain(/(\*\[html\]\:hypertext)/i);
    })

    it('should not have the abbr nested', () => {
        expect(result).not.toMatch(/(\<abbr title="hypertext"\>\<abbr title="hypertext"\>html\<\/abbr\>\<\/abbr\>)/i);
    })
});