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

var paths = [
  "that.is.a",
  "that.is.an",
  "to.contain",
  "to.deep.equal",
  "to.equal",
  "to.equal",
  "to.have.deep.members",
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
  paths.push("to.be." + chain);
  paths.push("that.is." + chain);
  paths.push("that.is.not." + chain);
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
  return function _property() {
    return utils.getPathValue(chain, new chai.Assertion(this._obj));
  };
}

function chaimel(_chai, utils) {
  var method = buildMethod.bind(null, utils);
  paths.forEach(function(path) {
    utils.addMethod(Assertion, chainToCamel(path), method(path));
    path = "not." + path;
    utils.addMethod(Assertion, chainToCamel(path), method(path));
  });
  var property = buildProperty.bind(null, utils);
  properties.forEach(function (name) {
    var path = "to.be." + name;
    utils.addMethod(Assertion, chainToCamel(path), property(path));
    path = "not." + path;
    utils.addMethod(Assertion, chainToCamel(path), property(path));
  });
  var existPath = "to.exist";
  utils.addMethod(Assertion, chainToCamel(existPath), property(existPath));
  existPath = "not." + existPath;
  utils.addMethod(Assertion, chainToCamel(existPath), property(existPath));
}

chai.use(chaimel);

module.exports = chai.expect;
