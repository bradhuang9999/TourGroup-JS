# TourGroup js
## Traverse and manipulate the DOM similar to browser-native functions.

![Build Status](https://github.com/bradhuang9999/TourGroup.js/actions/workflows/main.yml/badge.svg)
![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)

<br>

[Library Documentation](documentation.md)

## Why TourGroup
- Lightweight: Less than 10KB.
- Fast: invoke native function directly
- Supports esm.
- Browser-native interface reduces learning curve.
- Extends Array, providing native array-related functions.
- Chainable interface for ease of use.

## Getting Start
CDN: 
- Traditional: https://cdn.jsdelivr.net/gh/bradhuang9999/TourGroup-JS@1.0.0/dist/tourgroup.min.js
- ES Module: https://cdn.jsdelivr.net/gh/bradhuang9999/TourGroup-JS@1.0.0/dist/tourgroup.esm.min.js

## Example Code
```js
import TourGroup from 'tourgroup.js';//ES Module
var tourGroup = TourGroup.at('.class1').querySelectorAll('span.class2').has('i');
tourGroup.setAttribute('data-my-attr', 'true')
         .addEventListener('click', () => {console.log('clicked')});
```

## Travrese
- Travel up: 
  - native: parentElement, closest
  - extend: parentUntil
- Travel horizon: 
  - native: previousElementSibling, nextElementSibling
  - extend: next, nextUntil, prev, prevUntil, siblings
- Travel down
  - native: querySelectorAll, children
- Filtering Traversal
  - extend: not, has, first, last

## Dom Manipulation
- Insert
  - native: insertAdjacentHTML, outerHTML, innerHTML, innerText, textContent
  - extend: appendHTML, prependHTML, afterHTML, beforeHTML
- Removal
  - extend: empty, remove, unwrap
- General Attributes
  - native: getAttribute, setAttribute, value
  - extend: css
- Class Attribute
  - extend: addClass, removeClass, toggleClass, hasClass
- Event Handling
  - native: addEventListener, removeEventListener
  - extend: trigger, addDelegateEventListener, addOneTimeEventListener

## Build by yourself
```sh
# test
npm run test

# build
npm run build
```
