var expect = require("./");

function willThrow() {
  throw new Error();
}

describe("the chaimel assertion extensions", function () {
  [
    [42, "toEqual", 42],
    [42, "notToEqual", 43],
    [42, "toEqual", 42],
    [42, "toBeAbove", 41],
    [42, "toBeGreaterThan", 41],
    [42, "notToBeAbove", 43],
    ["abc", "toInclude", "b"],
    [false, "toBeFalse"],
    [true, "toBeTrue"],
    [arguments, "toBeArguments"],
    [[1, 2, 3], "toHaveLengthOfAtMost", 3],
    [[1, 2, 3], "toHaveLengthWithin", 2, 4],
    [42, "toBeWithin", 41, 43],
    [[], "toBeInstanceof", Array],
    [[], "toBeInstanceOf", Array],
    [[], "toBeAnInstanceOf", Array],
    [[], "toBeAnInstanceof", Array],
    [{foo: 1, bar: 2}, "toHaveKeys", "foo", "bar"],
    [willThrow, "toThrow", Error],
    [[{id: 1}], "toHaveDeepMembers", [{id: 1}]],
    [{id: 1}, "toHaveProperty", "id", 1],
    [null, "toBeNull"],
    [42, "notToBeNull"],
    [42, "toBeOk"],
    [void 0, "toBeUndefined"],
    [42, "toExist"],
    [void 0, "notToExist"]
  ].forEach(function(set) {
    it("should support " + set[1], function() {
      var assert = expect(set[0]);
      assert[set[1]].apply(assert, set.slice(2));
    });
  });
  it("should support chaining to thatIsA", function() {
    expect({id: 1}).toHaveProperty("id").thatIsA("number");
  });
  it("should support chaining to thatIsGreaterThan", function() {
    expect({id: 1}).toHaveProperty("id").thatIsGreaterThan(0);
  });
  it("should support chaining to thatIsAnInstanceOf", function() {
    expect({list: [1, 2]}).toHaveProperty("list").thatIsAnInstanceOf(Array);
  });
});
