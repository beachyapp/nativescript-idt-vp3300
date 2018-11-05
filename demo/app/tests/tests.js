var IdtechVp3300 = require("nativescript-idtech-vp-sdk").IdtechVp3300;
var idtechVp3300 = new IdtechVp3300();

describe("greet function", function() {
    it("exists", function() {
        expect(idtechVp3300.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(idtechVp3300.greet()).toEqual("Hello, NS");
    });
});