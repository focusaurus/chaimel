var chai = require("chai");
var Assertion = chai.Assertion.prototype;

var properties = [
  "arguments",
  "empty",
  "false",
  "null",
  "ok",
  "true",
  "undefined"
];

var beThat = [
  "above",
  "an.instanceof",
  "an.instanceOf",
  "at.least",
  "at.most",
  "below",
  "closeTo",
  "greaterThan",
  "instanceOf",
  "instanceof",
  "lessThan",
  "within"
];

var chains = [
  "that.is.a",
  "that.is.an",
  "to.contain",
  "to.deep.equal",
  "to.deep.have.members",
  "to.equal",
  "to.equal",
  "to.have.deep.property",
  "to.have.keys",
  "to.have.length.above",
  "to.have.length.greater.than",
  "to.have.length.of.at.least",
  "to.have.length.of.at.most",
  "to.have.length.within",
  "to.have.members",
  "to.have.own.property",
  "to.have.property",
  "to.include",
  "to.match",
  "to.respondTo",
  "to.satisfy",
  "to.throw"
];

beThat.forEach(function(chain) {
  chains.push("to.be." + chain);
  chains.push("that.is." + chain);
});

function upFirst(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function chainToCamel(chain) {
  var words = chain.split(".");
  return words[0] + words.slice(1).map(upFirst).join("");
}

function buildMethod(utils, chain) {
  return function _method() {
    var assert = new chai.Assertion(this._obj);
    return utils.getPathValue(chain, assert).apply(assert, arguments);
  };
}

function buildProperty(utils, chain) {
  function _property() {
    var obj = utils.flag(this, "object");
    // console.log("@bug built property called", chain, obj, arguments[0]);
    utils.getPathValue(chain, new chai.Assertion(obj));
    return this;
  }
  _property.name = "expect property for " + chain;
  return _property;
}

function chaimel(_chai, utils) {
  var method = buildMethod.bind(null, utils);
  chains.forEach(function(chain) {
    utils.addMethod(Assertion, chainToCamel(chain), method(chain));
    chain = "not." + chain;
    utils.addMethod(Assertion, chainToCamel(chain), method(chain));
  });
  var property = buildProperty.bind(null, utils);
  properties.forEach(function (name) {
    var chain = "to.be." + name;
    utils.addMethod(Assertion, chainToCamel(chain), property(chain));
    chain = "not." + chain;
    utils.addMethod(Assertion, chainToCamel(chain), property(chain));
  });
  var chain = "to.exist";
  utils.addMethod(Assertion, chainToCamel(chain), property(chain));
  chain = "not." + chain;
  utils.addMethod(Assertion, chainToCamel(chain), property(chain));
}

chai.use(chaimel);

module.exports = chai.expect;
