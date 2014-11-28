var expect = require("./");

function willThrow() {
  throw new Error();
}

describe("the camelCase assertion methods", function () {
  it("should exist and work correctly", function() {
    expect(42).toEqual(42);
    expect(42).toBeAbove(41);
    expect(42).notToBeAbove(43);
    expect("abc").toInclude("b");
    expect(false).toBeFalse();
    expect(true).toBeTrue();
    expect(arguments).toBeArguments();
    expect([1, 2, 3]).toHaveLengthOfAtMost(3);
    expect([1, 2, 3]).toHaveLengthWithin(2, 4);
    expect(42).toBeWithin(41, 43);
    expect([]).toBeInstanceof(Array);
    expect([]).toBeInstanceOf(Array);
    expect({foo: 1, bar: 2}).toHaveKeys("foo", "bar");
    expect(willThrow).toThrow(Error);
    expect([{id: 1}]).toDeepHaveMembers([{id: 1}]);
    expect({id: 1}).toHaveProperty("id", 1);
    expect({id: 1}).toHaveProperty("id").thatIsA("number");
    // expect({id: 1}).toHaveProperty("id").thatIsGreaterThan(0);
  });
});
