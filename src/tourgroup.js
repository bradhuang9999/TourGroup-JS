/*
Reference:
- https://javascript.info/extend-natives
- https://youmightnotneedjquery.com/
- https://api.jquery.com/category/traversing/
- https://developer.mozilla.org/en-US/docs/Web/API/Element
*/


/**
 * Represents a group of elements for performing tree traversal operations.
 * @extends Array
 */
class TourGroup extends Array {
    /**
     * Creates a new TourGroup instance.
     * @param {string|Element[]|Element|Window} selector - The selector string, array of elements, single element, or window object.
     * @param {Element} context - The context element to search within.
     * @returns {TourGroup} The TourGroup instance.
     * @example new TourGroup('.my-class');
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
     * @example TourGroup.at('.my-class');
     */
    static at(selector, context) {
        return new TourGroup(selector, context);
    }


    /* ************************************************************************* */
    /* *************************** Tree Traversal ****************************** */
    /* ************************************************************************* */


    /**
     * Get the children of each element in the set of matched elements, optionally filtered by a selector.
     * Similar to $.children(selector)
     * @param {string} selector - Optional. A string containing a selector expression to match the children against.
     * @returns {TourGroup} A new TourGroup instance containing the unique children elements.
     * @example ToupGroup.at('.my-class').children();
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
     * @example ToupGroup.at('.my-class').closest('.my-parent');
     */
    closest(selectors) {
        return unique(this.flatMap(ele => ele.closest(selectors)||[]));
    }

    /**
     * Gets the descendants of each element in the current set of matched elements, filtered by a selector.
     * Similar to $.find(selector)
     * @param {string} selector - The selector string.
     * @returns {TourGroup} A new TourGroup instance containing the unique descendant elements.
     * @example ToupGroup.at('.my-class').querySelectorAll('.my-descendant');
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
     * @example ToupGroup.at('.my-class').nextElementSibling();
     */
    nextElementSibling() {
        return unique(this.flatMap(ele => ele.nextElementSibling||[]));
    }

    /**
     * Gets the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * Similar to $.next(selector)
     * @param {string} selector - The selector string.
     * @returns {TourGroup} A new TourGroup instance containing the unique next elements.
     * @example ToupGroup.at('.my-class').next('.my-next');
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
     * @example ToupGroup.at('.my-class').nextUntil('.my-next');
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
     * @example ToupGroup.at('.my-class').parentElement();
     */
    parentElement() {
        return unique(this.map(ele => ele.parentElement));
    }

    /**
     * Gets all ancestors of each element in the set of matched elements, up to but not including the element matched by the selector.
     * Similar to $.parentsUntil(selector)
     * @param {string} selector - The selector string.
     * @returns {TourGroup} A new TourGroup instance containing the unique ancestor elements.
     * @example ToupGroup.at('.my-class').parentsUntil('.my-ancestor');
     */
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

    /**
     * Gets the previous sibling element of each element in the TourGroup.
     * @returns {TourGroup} A new TourGroup instance containing the unique previous sibling elements.
     * @example ToupGroup.at('.my-class').previousElementSibling();
     */
    previousElementSibling() {
        return unique(this.flatMap(ele => ele.previousElementSibling||[]));
    }

    /**
     * Gets the previous sibling element of each element in the TourGroup that matches the selector.
     * Similar to $.prev(selector)
     * @param {string} selector - The selector string.
     * @returns {TourGroup} A new TourGroup instance containing the unique previous elements.
     * @example ToupGroup.at('.my-class').prev('.my-prev');
     */
    prev(selector) {
        return unique(this.flatMap(ele => {
            const prevEl = ele.previousElementSibling; 
            if (!selector || (prevEl && prevEl.matches(selector))) {
                return prevEl;
            }
            return [];
        }));
    }

    /**
     * Gets all preceding siblings of each element in the set of matched elements, up to but not including the element matched by the selector.
     * Similar to $.prevUntil(selector)
     * @param {string} selector - The selector string.
     * @returns {TourGroup} A new TourGroup instance containing the unique preceding sibling elements.
     * @example ToupGroup.at('.my-class').prevUntil('.my-prev');
     */
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

    /**
     * Gets all sibling elements of each element in the set of matched elements.
     * Similar to $.siblings()
     * @returns {TourGroup} A new TourGroup instance containing the unique sibling elements.
     * @example ToupGroup.at('.my-class').siblings();
     */
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
     * @example ToupGroup.at('.my-class').not('.my-filter');
     */
    not(selector) {
        return this.filter(ele => !ele.matches(selector));
    }

    /**
     * Filters out elements that do not have any descendants that match the specified selector.
     * @param {string} selector - The selector string.
     * @returns {TourGroup} A new TourGroup instance containing the filtered elements.
     * @example ToupGroup.at('.my-class').has('.my-descendant');
     */
    has(selector) {
        return this.filter(ele => ele.querySelector(selector));
    }

    /**
     * Returns the first element of the TourGroup.
     * @returns {Element|null} The first element of the TourGroup, or null if the TourGroup is empty.
     * @example ToupGroup.at('.my-class').first();
     */
    first() {
        return this.length === 0 ? null : this[0];
    }

    /**
     * Returns the last element of the TourGroup.
     * @returns {Element|null} The last element of the TourGroup, or null if the TourGroup is empty.
     * @example ToupGroup.at('.my-class').last();
     */
    last() {
        return this.length === 0 ? null : this[this.length-1];
    }


    /* ************************************************************************* */
    /* *********************** DOM Insertion, Inside *************************** */
    /* ************************************************************************* */
    
    
    /**
     * Inserts HTML content at a specified position relative to the element.
     * @param {string} position - The position relative to the element where the HTML content should be inserted. Possible values: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'.
     * @param {string} text - The HTML content to be inserted.
     * @returns {TourGroup} The current instance of the collection.
     * @example ToupGroup.at('.my-class').insertAdjacentHTML('beforeend', '<p>Some text</p>');
     */
    insertAdjacentHTML(position, text) {
        for(let ele of this) {
            ele.insertAdjacentHTML(position, text);
        }
        return this
    }

    /**
     * Appends HTML content to the end of each element in the TourGroup.
     * @param {string} text - The HTML content to be appended.
     * @returns {TourGroup} The current instance of the collection.
     * @example ToupGroup.at('.my-class').appendHTML('<p>Some text</p>');
     */
    appendHTML(text) {
        for(let ele of this) {
            ele.insertAdjacentHTML('beforeend', text);
        }
        return this;
    }
    
    /**
     * Prepends HTML content to the beginning of each element in the TourGroup.
     * @param {string} text - The HTML content to be prepended.
     * @returns {TourGroup} The current instance of the collection.
     * @example ToupGroup.at('.my-class').prependHTML('<p>Some text</p>');
     */
    prependHTML(text) {
        for(let ele of this) {
            ele.insertAdjacentHTML('afterbegin', text);
        }
        return this
    }
    
    
    /**
     * Sets or gets the outer HTML of each element in the TourGroup.
     * @param {string} [html] - Optional. The HTML content to set as the outer HTML of each element. If not provided, returns the outer HTML of the first element in the TourGroup.
     * @returns {string|undefined} The outer HTML of the first element in the TourGroup, or undefined if the HTML content was set.
     * @example ToupGroup.at('.my-class').outerHTML('<p>Some text</p>');
     * @example var htmlCode = ToupGroup.at('.my-class').outerHTML();
     */
    outerHTML(html) {        
        if (!arguments.length)
            return this.length === 0 ? null : this[0].outerHTML;
        for(let ele of this) {
            ele.outerHTML = html;
        }
        //return this;//ele is replaced by html, so return this is meaningless
    }

    /**
     * Sets or gets the inner HTML of each element in the TourGroup.
     * @param {string} [html] - Optional. The HTML content to set as the inner HTML of each element. If not provided, returns the inner HTML of the first element in the TourGroup.
     * @returns {string|undefined} The inner HTML of the first element in the TourGroup, or undefined if the HTML content was set.
     * @example ToupGroup.at('.my-class').innerHTML('<p>Some text</p>');
     * @example var htmlCode = ToupGroup.at('.my-class').innerHTML();
     */
    innerHTML(html) {
        if (!arguments.length)
            return this[0] && this[0].innerHTML;
        
        for(let ele of this) {
            ele.innerHTML = html;
        }    
        return this;
    }

    /**
     * Sets or retrieves the inner text content of each element in the collection.
     * @param {string} [text] - The text to set as the inner text content. If not provided, retrieves the inner text content of the first element in the collection.
     * @returns {Object} - The current instance of the collection.
     * @example ToupGroup.at('.my-class').innerText('Some text');
     * @example var text = ToupGroup.at('.my-class').innerText();
     */
    innerText(text) {
        if (!arguments.length)
            return this.length === 0 ? null : this[0].innerText;

        for(let ele of this) {
            ele.innerText = text;
        }
        return this;            
    }

    /**
     * Gets or sets the text content of the elements in the collection.
     * @param {string} [text] - The text content to set. If not provided, returns the text content of the first element in the collection.
     * @returns {TourGroup} - The TourGroup instance.
     * @example ToupGroup.at('.my-class').textContent('Some text');
     * @example var text = ToupGroup.at('.my-class').textContent();
     */
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
    
    /**
     * Inserts the specified HTML content after each element in the collection.     * 
     * @param {string} text - The HTML content to insert.
     * @returns {TourGroup} The current instance of the collection.
     * @example ToupGroup.at('.my-class').afterHTML('<p>Some text</p>');
     */
    afterHTML(text) {
        for(let ele of this) {
            ele.insertAdjacentHTML('afterend', text);
        }
        return this;
    }
    
    
    /**
     * Inserts the specified HTML content before each element in the collection.
     * @param {string} text - The HTML content to insert.
     * @returns {TourGroup} The current instance of the collection.
     * @example ToupGroup.at('.my-class').beforeHTML('<p>Some text</p>');
     */
    beforeHTML(text) {
        for(let ele of this) {
            ele.insertAdjacentHTML('beforebegin', text);
        }
        return this;
    }


    /* ************************************************************************* */
    /* *************************** DOM Removal ********************************* */
    /* ************************************************************************* */
    
    /**
     * Clears the inner HTML of each element in the collection.
     * @returns {TourGroup} The current TourGroup instance.
     * @example ToupGroup.at('.my-class').empty();
     */
    empty() {
        for(let ele of this) {
            ele.replaceChildren();
        }
        return this;
    }

    /**
     * Removes each element in the collection from the DOM.
     * @returns {TourGroup} The updated tour group object.
     * @example ToupGroup.at('.my-class').remove();
     */
    remove() {
        for(let ele of this) {
            ele.remove();
        }
        return this;
    }
    
    /**
     * Unwraps each element in the tour group by replacing it with its child nodes.
     * @example ToupGroup.at('.my-class').unwrap();
     */
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
     * @returns {TourGroup} The current instance of the collection.
     * @example ToupGroup.at('.my-class').addClass('my-new-class');
     */
    addClass(className) {
        for(let ele of this) {
            ele.classList.add(className);
        }
        return this;
    }

    /**
     * Removes a class from all elements in the TourGroup.
     * @param {string} className - The class name to remove.
     * @returns {TourGroup} The current instance of the collection.
     * @example ToupGroup.at('.my-class').removeClass('my-old-class');
     */
    removeClass(className) {
        for(let ele of this) {
            ele.classList.remove(className);
        }
        return this;
    }

    /**
     * Toggles a class for all elements in the TourGroup.
     * @param {string} className - The class name to toggle.
     * @returns {TourGroup} The current instance of the collection.
     * @example ToupGroup.at('.my-class').toggleClass('my-class');
     */
    toggleClass(className) {
        for(let ele of this) {
            ele.classList.toggle(className);
        }
        return this;
    }

    /**
     * Checks if any element in the tour group has the specified class.
     * @param {string} className - The class name to check for.
     * @returns {boolean} - Returns true if any element has the specified class, otherwise false.
     * @example ToupGroup.at('.my-class').hasClass('my-class');
     */
    hasClass(className) {
        return this.some(ele => ele.classList.contains(className));
    }

    /* ************************************************************************* */
    /* *************************** General Attributes ************************** */
    /* ************************************************************************* */

    /**
     * Retrieves the value of the specified attribute from the first element in the collection.
     * @param {string} name - The name of the attribute to retrieve.
     * @returns {string|null} - The value of the attribute, or null if the collection is empty.
     * @example ToupGroup.at('.my-class').getAttribute('data-id');
     */
    getAttribute(name) {
        return this.length === 0 ? null : this[0].getAttribute(name);
    }

    /**
     * Sets the specified attribute with the given value for all elements in the TourGroup.
     * 
     * @param {string} name - The name of the attribute to set.
     * @param {string} value - The value to set for the attribute.
     * @returns {TourGroup} - The TourGroup instance with the updated attribute values.
     * @example ToupGroup.at('.my-class').setAttribute('data-myattr', '123');
     */
    setAttribute(name, value) {
        for(let ele of this) {
            ele.setAttribute(name, value);
        }
        return this;
    }

    /**
     * Sets or gets the value of the first HTMLInputElement in the collection.
     * @param {string} [value] - The value to set.
     * @returns {TourGroup} - The TourGroup instance.
     * @example ToupGroup.at('.my-class').value('Some text');
     * @example var text = ToupGroup.at('.my-class').value();
     */
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

    /**
     * Sets or gets the css of the first element in the collection.
     * @param {string} property
     * @param {string} value
     * @returns {TourGroup} - The TourGroup instance with the updated CSS property values.
     * @example ToupGroup.at('.my-class').css('color', 'red');
     * @example var color = ToupGroup.at('.my-class').css('color');
     */
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
     * @returns {TourGroup} - The current instance of the collection.
     * @example ToupGroup.at('.my-class').addEventListener('click', function() { alert('Hello!'); });
     */
    addEventListener(event, func, useCapture) {
        for(let ele of this) {
            ele.addEventListener(event, func, useCapture);
        }
        return this;
    }

    /**
     * Adds a delegate event listener to each element in the collection.
     * The event listener will be triggered when an event occurs on an element that matches the given selector.
     *
     * @param {string} event - The name of the event to listen for.
     * @param {string} selector - The CSS selector to match against the event target.
     * @param {Function} func - The callback function to be executed when the event occurs.
     * @param {boolean} [useCapture=false] - Specifies whether the event should be captured during the event propagation.
     * @returns {Function} - The event handler function that was added as the event listener.
     * @example var handler = ToupGroup.at('.my-class').addDelegateEventListener('click', '.my-child', function() { alert('Hello!'); });
     *          ToupGroup.at('.my-class').removeEventListener('click', handler);
     */
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

    /**
     * Adds a one-time event listener to each element in the TourGroup.
     *
     * @param {string} event - The name of the event to listen for.
     * @param {Function} func - The callback function to be executed when the event is triggered.
     * @param {boolean} useCapture - Specifies whether the event should be captured during the event propagation.
     * @returns {TourGroup} - The current instance of the collection.
     * @example ToupGroup.at('.my-class').addOneTimeEventListener('click', function() { alert('Hello!'); });
     */
    addOneTimeEventListener(event, func, useCapture) {
        for(let ele of this) {
            ele.addEventListener(event, func, {once: true, capture: useCapture});
        }
        return this;
    }

    /**
     * Removes an event listener from each element in the TourGroup.
     *
     * @param {string} event - The name of the event to remove the listener from.
     * @param {Function} func - The listener function to remove.
     * @param {boolean} useCapture - Specifies whether to use event capturing.
     * @returns {TourGroup} - The current instance of the collection.
     * @example ToupGroup.at('.my-class').removeEventListener('click', myFunction);
     */
    removeEventListener(event, func, useCapture) {
        for(let ele of this) {
            ele.removeEventListener(event, func, useCapture);
        }
        return this;
    }

    /**
     * Triggers the specified event on each element in the TourGroup.
     * @param {string} event - The name of the event to trigger.
     * @param {Object} data - Optional. An object containing custom data to pass to the event.
     * @returns {TourGroup} - The current instance of the collection.
     * @example ToupGroup.at('.my-class').trigger('click');
     */ 
    trigger(event, data) {
        for(let ele of this) {
            ele.dispatchEvent(new Event(event, data));
        }
        return this;
    }
    
    /**
     * Gets the ID of the first element in the TourGroup.
     * @returns {string|null} The ID of the first element, or null if the TourGroup is empty.
     * @example var id = ToupGroup.at('.my-class').id();
     */
    get id()  {
        return this.length === 0 ? null : this[0].id;
    }

    /**
     * Gets the number of elements in the TourGroup.
     * @returns {number} The number of elements.
     * @example var count = ToupGroup.at('.my-class').length;
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

export default TourGroup;
export {TourGroup}