# TourGroup js
## Master DOM manipulation effortlessly with chaining, just like native browser functions

![Build Status](https://github.com/bradhuang9999/TourGroup-js/actions/workflows/main.yml/badge.svg)
![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)

<br>

[Library Documentation](documentation.md)
[Online demo](https://jsfiddle.net/bradhuang9999/ga7z9vth/1/)

## Why TourGroup
- Lightweight: Less than 10KB.
- Fast: invoke native function directly
- Supports ES module.
- Browser-native interface reduces learning curve.
- Extends Array, providing native array-related functions.
- Chainable interface for ease of use.

## Getting Start
CDN: 
- Traditional: https://cdn.jsdelivr.net/npm/tourgroup-js@1.0.0/dist/tourgroup.min.js
- ES Module: https://cdn.jsdelivr.net/npm/tourgroup-js@1.0.0/dist/tourgroup.esm.min.js

NPM:
```
npm install --save tourgroup.js
```

## Example Code
```js
import TourGroup from 'https://cdn.jsdelivr.net/npm/tourgroup-js@1.0.0/dist/tourgroup.esm.min.js';//ES Module
var tourGroup = TourGroup.at('div.class1').querySelectorAll('span.class2').has('i');
tourGroup.setAttribute('data-my-attr', 'true')
         .addEventListener('click', () => {console.log('clicked')});
```

## Compare with jQuery
- Not support ES Module, need to include jQuery library from HTML first.
- Cause polution to global scope.

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

- function interface is different from native
- implementation is more complex than native
```js
var target = $('div.class1').find('span.class2').has('i');
target.attr('data-my-attr', 'true')
      .on('click', () => {console.log('clicked')});
```

## Compare with Native
- Native is not chainable.
- Without some useful functions, such as toogleClass, addDelegateEventListener, etc.
```js
var target = document.querySelectorAll('div.class1');
for(let div of target){
  let spans = div.querySelectorAll('span.class2');
  for(let span of spans){
    if(span.querySelector('i')){
      span.setAttribute('data-my-attr', 'true');
      span.addEventListener('click', () => {console.log('clicked')});
    }
  }
}
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
