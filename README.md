# chaimel

[![Build Status](https://semaphoreci.com/api/v1/focusaurus/chaimel/branches/master/badge.svg)](https://semaphoreci.com/focusaurus/chaimel)

[chai.js](http://chaijs.com/) expect BDD api wrapped with `camelCase` method names instead of `dot.chaining.style`.

Lets you do:

- `expect(error).toHaveProperty("message");` instead of
- `expect(error).to.have.property("message");`

## Usage
```
var expect = require("chaimel");
expect(42).notToBeAbove(43);
```

## Why?

`dot.chaining.style` is problematic for me because:

- It's out of convention with the standard JavaScript built-in method names
  - `toLowerCase`, `indexOf`, `forEach`,  `hasOwnProperty`
- It's awkward to speak and hear. Do you say the "dot"s or just imply them?
- It doesn't work well with text editor autocomplete, whereas `camelCase` does
- I also personally find this kind of use of `Object.defineProperty` unidiomatic for the golden age of JavaScript. It's fully standard and fine, but my opinion is it fundamentally makes the language more magical and ruby-like and these are drawbacks not advantages.
- It was pretty quick and easy to create this module, so I did

## Are all the chai.expect methods supported?

**No**, I left out abbreviations such as `eql`, `lt` `gt` because I hate abbreviations. Use the full words and use `deepEqual` instead of `eql`. Having both `equal` and `eql` with different semantics is error-prone, hard to remember, and confusing to read.

## Browser Support

The code is designed to work in node.js or in the browser via [browserify](http://browserify.org). If you want vanilla browser support, file and issue and I can add the neccessary boilerplate.

## Contributing

- tests: `npm test`
- pull requests welcome

# MIT License

Copyright (c) 2016 Peter Lyons LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
