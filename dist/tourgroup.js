/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TourGroup: () => (/* binding */ TourGroup),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
Reference:
- https://javascript.info/extend-natives
- https://youmightnotneedjquery.com/
- https://api.jquery.com/category/traversing/
- https://developer.mozilla.org/en-US/docs/Web/API/Element
*/

/**
 * Represents a group of elements with additional utility methods.
 */
class TourGroup extends Array {
    /**
     * Creates a new TourGroup instance.
     * @param {string|Element[]|Element|Window} selector - The selector string, array of elements, single element, or window object.
     * @param {Element} context - The context element to search within.
     */
    constructor(selector, context) {
        super();
        
        if (!selector)
            return;
        if (isTourGroup(selector))
            return selector;
        
        let eles = selector;
        if (isString(selector)) {
            const ctx = context || document;
            eles = Array.from(ctx.querySelectorAll(selector));
        }
        if (eles.nodeType || eles === window)
            eles = [eles];
        
        for (let i = 0, l = eles.length; i < l; i++) {
            this[i] = eles[i];
        }
    }
    
    /**
     * Initializes a TourGroup instance.
     * @param {string|Element[]|Element|Window} selector - The selector string, array of elements, single element, or window object.
     * @param {Element} context - The context element to search within.
     * @returns {TourGroup} The TourGroup instance.
     */
    static init(selector, context) {
        return new TourGroup(selector, context);
    }


    /* ************************************************************************* */
    /* *************************** Tree Traversal ****************************** */
    /* ************************************************************************* */


    /**
     * Get the children of each element in the set of matched elements, optionally filtered by a selector.
     * Similar to $.children(selector)
     * @param {*} selector Optional. A string containing a selector expression to match the children against.
     * @returns 
     */
    children(selector) {
        return unique(this.flatMap(ele => {
            const childrenList = Array.from(ele.children);
            if (selector) {
                return childrenList.filter(child => child.matches(selector));
            }
            return childrenList;
        }));
}

    /**
     * Traverses each element and its parents (heading toward the document root) until it finds a node that matches the provided selector string.
     * Similar to $.closest(selector)
     * @param {string} selectors - The selector string.
     * @returns {TourGroup} A new TourGroup instance containing the unique closest elements.
     */
    closest(selectors) {
        return unique(this.flatMap(ele => ele.closest(selectors)||[]));
    }

    /**
     * Gets the descendants of each element in the current set of matched elements, filtered by a selector.
     * Similar to $.find(selector)
     * @param {string} selector - The selector string.
     * @returns {TourGroup} A new TourGroup instance containing the unique descendant elements.
     */
    querySelectorAll(selector) {
        const subEles = this.flatMap(ele => {
            return Array.from(ele.querySelectorAll(selector));
        });
        return new TourGroup(subEles);
    }

    /**
     * Gets the next sibling element of each element in the TourGroup.
     * @returns {TourGroup} A new TourGroup instance containing the unique next sibling elements.
     */
    nextElementSibling() {
        return unique(this.flatMap(ele => ele.nextElementSibling||[]));
    }

    /**
     * Gets the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * Similar to $.next(selector)
     * @param {string} selector - The selector string.
     * @returns {TourGroup} A new TourGroup instance containing the unique next elements.
     */
    next(selector) {
        return unique(this.flatMap(ele => {
            const nextEl = ele.nextElementSibling; 
            if (!selector || (nextEl && nextEl.matches(selector))) {
                return nextEl;
            }
            return [];
        }));
    }

    /**
     * Gets all following siblings of each element in the set of matched elements, up to but not including the element matched by the selector.
     * Similar to $.nextUntil(selector)
     * @param {string} selector - The selector string.
     * @returns {TourGroup} A new TourGroup instance containing the unique following sibling elements.
     */
    nextUntil(selector) {
        return unique(this.flatMap(ele => {
            const nextEles = [];
            let nextEl = ele.nextElementSibling;
            while (nextEl) {
                if (selector && nextEl.matches(selector)) {
                    return nextEles;
                }
                nextEles.push(nextEl);
                nextEl = nextEl.nextElementSibling;
            }
            return nextEles;
        }));
    }

    /**
     * Gets the closest positioned ancestor element of each element in the set of matched elements.
     * Similar to $.offsetParent()
     * @returns {TourGroup} A new TourGroup instance containing the unique offset parent elements.
     */
    /*
    offsetParent() {
        return unique(this.map(ele => {
            var offsetParent = ele.offsetParent || document.body;
            while ( offsetParent && (!/^body|html$/i.test(offsetParent.nodeName) && window.getComputedStyle(ele).getPropertyValue("position") === "static") ) {
                    offsetParent = offsetParent.offsetParent;
            }
            return offsetParent;
        }));
    }
    */
    
    /**
     * Gets the parent element of each element in the TourGroup.
     * Similar to $.parent()
     * @returns {TourGroup} A new TourGroup instance containing the unique parent elements.
     */
    parentElement() {
        return unique(this.map(ele => ele.parentElement));
    }

    parentUntil(selector) {
        return unique(this.flatMap(ele => {
            const parentEles = [];
            let parentEl = ele.parentElement;
            while (parentEl) {
                if (selector && parentEl.matches(selector)) {
                    return parentEles;
                }
                parentEles.push(parentEl);
                parentEl = parentEl.parentElement;
            }
            return parentEles;
        }));
    }

    previousElementSibling() {
        return unique(this.flatMap(ele => ele.previousElementSibling||[]));
    }

    prev(selector) {
        return unique(this.flatMap(ele => {
            const prevEl = ele.previousElementSibling; 
            if (!selector || (prevEl && prevEl.matches(selector))) {
                return prevEl;
            }
            return [];
        }));
    }

    prevUntil(selector) {
        return unique(this.flatMap(ele => {
            const prevEles = [];
            let prevEl = ele.previousElementSibling;
            while (prevEl) {
                if (selector && prevEl.matches(selector)) {
                    return prevEles;
                }
                prevEles.push(prevEl);
                prevEl = prevEl.previousElementSibling;
            }
            return prevEles;
        }));
    }

    siblings() {
        return unique(this.flatMap(ele => {
            return TourGroup.from(ele.parentElement.children).filter(child => child !== ele);
        }));
    }

    /* ************************************************************************* */
    /* ************************* Filtering Traversal *************************** */
    /* ************************************************************************* */

    /**
     * Filters out elements that do not match the specified selector.
     * @param {string} selector - The selector string.
     * @returns {TourGroup} A new TourGroup instance containing the filtered elements.
     */
    not(selector) {
        return this.filter(ele => !ele.matches(selector));
    }

    has(selector) {
        return this.filter(ele => ele.querySelector(selector));
    }

    first() {
        return this.length === 0 ? null : this[0];
    }

    last() {
        return this.length === 0 ? null : this[this.length-1];
    }


    /* ************************************************************************* */
    /* *********************** DOM Insertion, Inside *************************** */
    /* ************************************************************************* */
    
    
    insertAdjacentHTML(position, text) {
        for(let ele of this) {
            ele.insertAdjacentHTML(position, text);
        }
    }

    appendHTML(text) {
        for(let ele of this) {
            ele.insertAdjacentHTML('beforeend', text);
        }
    }
    
    prependHTML(text) {
        for(let ele of this) {
            ele.insertAdjacentHTML('afterbegin', text);
        }
    }
    
    
    outerHTML(html) {        
        if (!arguments.length)
            return this.length === 0 ? null : this[0].outerHTML;
        for(let ele of this) {
            ele.outerHTML = html;
        }
        //return this;//ele is replaced by html, so return this is meaningless
    }

    innerHTML(html) {
        if (!arguments.length)
            return this[0] && this[0].innerHTML;
        
        for(let ele of this) {
            ele.innerHTML = html;
        }    
        return this;
    }

    innerText(text) {
        if (!arguments.length)
            return this.length === 0 ? null : this[0].innerText;

        for(let ele of this) {
            ele.innerText = text;
        }
        return this;            
    }

    textContent(text) {
        if (!arguments.length)
            return this.length === 0 ? null : this[0].textContent;
        
        for(let ele of this) {
            ele.textContent = text;
        }
        return this;
    }

    /* ************************************************************************* */
    /* *********************** DOM Insertion, Outside*************************** */
    /* ************************************************************************* */
    
    afterHTML(text) {
        for(let ele of this) {
            ele.insertAdjacentHTML('afterend', text);
        }
    }
    
    
    beforeHTML(text) {
        for(let ele of this) {
            ele.insertAdjacentHTML('beforebegin', text);
        }
    }


    /* ************************************************************************* */
    /* *************************** DOM Removal ********************************* */
    /* ************************************************************************* */
    
    empty() {
        for(let ele of this) {
            ele.replaceChildren();
        }
        return this;
    }

    remove() {
        for(let ele of this) {
            ele.remove();
        }
        return this;
    }
    
    unwrap() {
        for(let ele of this) {
            const parent = ele.parentElement;
            if (parent) {
                parent.replaceWith(...parent.childNodes);
            }
        }
        //return this;//ele is replaced, so return this is meaningless
    }

    /* ************************************************************************* */
    /* *************************** Class Attribute ***************************** */
    /* ************************************************************************* */
    /**
     * Adds a class to all elements in the TourGroup.
     * @param {string} className - The class name to add.
     */
    addClass(className) {
        for(let ele of this) {
            ele.classList.add(className);
        }
    }

    /**
     * Removes a class from all elements in the TourGroup.
     * @param {string} className - The class name to remove.
     */
    removeClass(className) {
        for(let ele of this) {
            ele.classList.remove(className);
        }
    }

    /**
     * Toggles a class for all elements in the TourGroup.
     * @param {string} className - The class name to toggle.
     */
    toggleClass(className) {
        for(let ele of this) {
            ele.classList.toggle(className);
        }
    }

    hasClass(className) {
        return this.some(ele => ele.classList.contains(className));
    }

    /* ************************************************************************* */
    /* *************************** General Attributes ************************** */
    /* ************************************************************************* */

    getAttribute(name) {
        return this.length === 0 ? null : this[0].getAttribute(name);
    }

    setAttribute(name, value) {
        for(let ele of this) {
            ele.setAttribute(name, value);
        }
        return this;
    }

    value(value) {
        if (!arguments.length)
            return this.length === 0 ? null : this[0].value;
        for(let ele of this) {
            if (ele instanceof HTMLInputElement) {
                ele.value = value;
            }
        }
        return this;
    }

    /**
     * Gets the value of the first input element in the TourGroup.
     * @returns {string|null} The value of the first input element, or null if the TourGroup is empty or does not contain an input element.
     */
    // get value() {
    //     return this.length === 0 ? null : this[0].value;
    // }
  
    /**
     * Sets the value of all input elements in the TourGroup.
     * @param {string} value - The value to set.
     */
    // set value(value) {
    //     for(let ele of this) {
    //         if (ele instanceof HTMLInputElement) {
    //             ele.value = value;
    //         }
    //     }
    // }

    css(property, value) {
        if (arguments.length === 1) {
            return this.length === 0 ? null : window.getComputedStyle(this[0]).getPropertyValue(property);
        }
        for(let ele of this) {
            ele.style[property] = value;
        }
        return this;
    }

    /* ************************************************************************* */
    /* *************************** Event Handling ****************************** */
    /* ************************************************************************* */

    /**
     * Adds an event listener to each element in the TourGroup.
     * @param {string} event - The event name.
     * @param {Function} func - The event handler function.
     * @param {boolean} useCapture - Specifies whether the event should be captured during the event propagation.
     */
    addEventListener(event, func, useCapture) {
        for(let ele of this) {
            ele.addEventListener(event, func, useCapture);
        }
    }

    addDelegateEventListener(event, selector, func, useCapture) {
        const handler = e => {
            if (e.target.matches(selector)) {
                func(e);
            }
        };
        for(let ele of this) {
            ele.addEventListener(event, handler, useCapture);
        }
        return handler;
    }

    addOneTimeEventListener(event, func, useCapture) {
        for(let ele of this) {
            ele.addEventListener(event, func, {once: true, capture: useCapture});
        }
    }

    removeEventListener(event, func, useCapture) {
        for(let ele of this) {
            ele.removeEventListener(event, func, useCapture);
        }
    }

    trigger(event, data) {
        for(let ele of this) {
            ele.dispatchEvent(new Event(event, data));
        }
    }
    
    /**
     * Gets the ID of the first element in the TourGroup.
     * @returns {string|null} The ID of the first element, or null if the TourGroup is empty.
     */
    get id()  {
        return this.length === 0 ? null : this[0].id;
    }

    /**
     * Gets the number of elements in the TourGroup.
     * @returns {number} The number of elements.
     */
    get length() {
        return this.length;
    }
  


}

/**
 * Checks if a value is an instance of TourGroup.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is an instance of TourGroup, false otherwise.
 */
function isTourGroup(value) {
    return value instanceof TourGroup;
}

/**
 * Checks if a value is a string.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a string, false otherwise.
 */
function isString(value) {
    return typeof value === 'string';
}

/**
 * Removes duplicate values from an array.
 * @param {Array} array - The array to remove duplicates from.
 * @returns {Array} A new array with duplicate values removed.
 */
function unique(array) {
    return array.filter((currentValue, index, arr) => (
        arr.indexOf(currentValue) === index
    ));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourGroup);

window.TourGroup = __webpack_exports__;
/******/ })()
;