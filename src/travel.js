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
        return unique(this.map(ele => ele.closest(selectors)));
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
        return unique(this.map(ele => ele.nextElementSibling));
    }

    /**
     * Gets the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * Similar to $.next(selector)
     * @param {string} selector - The selector string.
     * @returns {TourGroup} A new TourGroup instance containing the unique next elements.
     */
    next(selector) {
        return unique(this.map(ele => {
            const nextEl = ele.nextElementSibling; 
            if (!selector || (nextEl && nextEl.matches(selector))) {
                return nextEl;
            }
            return null;
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
    offsetParent() {
        return unique(this.map(ele => {
            var offsetParent = ele.offsetParent || document.body;
            while ( offsetParent && (!/^body|html$/i.test(offsetParent.nodeName) && window.getComputedStyle(ele).getPropertyValue("position") === "static") ) {
                    offsetParent = offsetParent.offsetParent;
            }
            return offsetParent;
        }));
    }
    
    
    /**
     * Gets the parent element of each element in the TourGroup.
     * Similar to $.parent()
     * @returns {TourGroup} A new TourGroup instance containing the unique parent elements.
     */
    parentElement() {
        return unique(this.map(ele => ele.parentElement));
    }

    parentUntil(selector) {
        return unique(this.map(ele => {
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
        return unique(this.map(ele => ele.previousElementSibling));
    }

    prev(selector) {
        return unique(this.map(ele => {
            const prevEl = ele.previousElementSibling; 
            if (!selector || (prevEl && prevEl.matches(selector))) {
                return prevEl;
            }
            return undefined;
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

    /**
     * Gets the inner HTML of the first element in the TourGroup.
     * @returns {string|undefined} The inner HTML of the first element, or undefined if the TourGroup is empty.
     */
    get innerHTML() {
        return this.length === 0 ? undefined : this[0].innerHTML;
    }

    /**
     * Sets the inner HTML for all elements in the TourGroup.
     * @param {string} html - The HTML content to set.
     */
    set innerHTML(html) {
        for(let ele of this) {
            ele.innerHTML = html;
        }
    }

    /**
     * Sets the inner text for all elements in the TourGroup.
     * @param {string} text - The text content to set.
     */
    set innerText(text) {
        for(let ele of this) {
            ele.innerText = text;
        }
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

    
    /**
     * Gets the ID of the first element in the TourGroup.
     * @returns {string|undefined} The ID of the first element, or undefined if the TourGroup is empty.
     */
    get id()  {
        return this.length === 0 ? undefined : this[0].id;
    }

    /**
     * Gets the number of elements in the TourGroup.
     * @returns {number} The number of elements.
     */
    get length() {
        return this.length;
    }
  
    /**
     * Gets the value of the first input element in the TourGroup.
     * @returns {string|undefined} The value of the first input element, or undefined if the TourGroup is empty or does not contain an input element.
     */
    get value() {
        return this.length === 0 ? undefined : this[0].value;
    }
  
    /**
     * Sets the value of all input elements in the TourGroup.
     * @param {string} value - The value to set.
     */
    set value(value) {
        for(let ele of this) {
            if (ele instanceof HTMLInputElement) {
                ele.value = value;
            }
        }
    }

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

export default TourGroup;
export {TourGroup}