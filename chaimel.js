// var chai = require("chai");
var expect = require("chai").expect;
var ssfi = expect().__flags.ssfi;
var addMethod = ssfi.addMethod.bind(ssfi);
var beThat = [
  "above",
  "arguments",
  "at.least",
  "at.most",
  "below",
  "closeTo",
  "empty",
  "false",
  "greater.than",
  "instanceof",
  "less.than",
  "null",
  "ok",
  "true",
  "undefined",
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
  "to.exist",
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

beThat.forEach(function(word) {
  chains.push("to.be." + word);
  chains.push("that.is." + word);
});

function upFirst(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function camelWords(words) {
  return words[0] + words.slice(1).map(upFirst).join("");
}

function findChainedMethod(words) {
  return function _findChainedMethod() {
    var self = this;
    var chainedFunc;
    words.forEach(function(word) {
      chainedFunc = (chainedFunc || self)[word];
    });
    return chainedFunc.apply(this, arguments);
  };
}

function addCamelMethod(chain) {
  var words = chain.split(".");
  var notWords = ["not"].concat(words);
  // console.log("@bug words", words);
  addMethod(camelWords(words), findChainedMethod(words));
  addMethod(camelWords(notWords), findChainedMethod(notWords));
  // chai.Assertion.prototype[camelWords(words)] = findChainedMeth
}

chains.forEach(addCamelMethod);

// Special Cases
addMethod("toBeInstanceOf", findChainedMethod(["to", "be", "instanceof"]));
module.exports = expect;
