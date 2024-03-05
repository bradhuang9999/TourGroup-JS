# tourgroup.js

```sh
# test
npm run test

# build
npm run build
```




## Classes

<dl>
<dt><a href="#TourGroup">TourGroup</a> <code>Array</code></dt>
<dd><p>Represents a group of elements for performing tree traversal operations.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#isTourGroup">isTourGroup(value)</a> <code>boolean</code></dt>
<dd><p>Checks if a value is an instance of TourGroup.</p>
</dd>
<dt><a href="#isString">isString(value)</a> <code>boolean</code></dt>
<dd><p>Checks if a value is a string.</p>
</dd>
<dt><a href="#unique">unique(array)</a> <code>Array</code></dt>
<dd><p>Removes duplicate values from an array.</p>
</dd>
</dl>

<a name="TourGroup"></a>

## TourGroup <code>Array</code>
Represents a group of elements for performing tree traversal operations.

**Kind**: global class  
**Extends**: <code>Array</code>  

* [TourGroup](#TourGroup) <code>Array</code>
    * [new TourGroup(selector, context)](#new_TourGroup_new)
    * _instance_
        * [.id](#TourGroup+id) <code>string</code> \| <code>null</code>
        * [.length](#TourGroup+length) <code>number</code>
        * [.children(selector)](#TourGroup+children) [<code>TourGroup</code>](#TourGroup)
        * [.closest(selectors)](#TourGroup+closest) [<code>TourGroup</code>](#TourGroup)
        * [.querySelectorAll(selector)](#TourGroup+querySelectorAll) [<code>TourGroup</code>](#TourGroup)
        * [.nextElementSibling()](#TourGroup+nextElementSibling) [<code>TourGroup</code>](#TourGroup)
        * [.next(selector)](#TourGroup+next) [<code>TourGroup</code>](#TourGroup)
        * [.nextUntil(selector)](#TourGroup+nextUntil) [<code>TourGroup</code>](#TourGroup)
        * [.parentElement()](#TourGroup+parentElement) [<code>TourGroup</code>](#TourGroup)
        * [.parentUntil(selector)](#TourGroup+parentUntil) [<code>TourGroup</code>](#TourGroup)
        * [.previousElementSibling()](#TourGroup+previousElementSibling) [<code>TourGroup</code>](#TourGroup)
        * [.prev(selector)](#TourGroup+prev) [<code>TourGroup</code>](#TourGroup)
        * [.prevUntil(selector)](#TourGroup+prevUntil) [<code>TourGroup</code>](#TourGroup)
        * [.siblings()](#TourGroup+siblings) [<code>TourGroup</code>](#TourGroup)
        * [.not(selector)](#TourGroup+not) [<code>TourGroup</code>](#TourGroup)
        * [.has(selector)](#TourGroup+has) [<code>TourGroup</code>](#TourGroup)
        * [.first()](#TourGroup+first) <code>Element</code> \| <code>null</code>
        * [.last()](#TourGroup+last) <code>Element</code> \| <code>null</code>
        * [.insertAdjacentHTML(position, text)](#TourGroup+insertAdjacentHTML) [<code>TourGroup</code>](#TourGroup)
        * [.appendHTML(text)](#TourGroup+appendHTML) [<code>TourGroup</code>](#TourGroup)
        * [.prependHTML(text)](#TourGroup+prependHTML) [<code>TourGroup</code>](#TourGroup)
        * [.outerHTML([html])](#TourGroup+outerHTML) <code>string</code> \| <code>undefined</code>
        * [.innerHTML([html])](#TourGroup+innerHTML) <code>string</code> \| <code>undefined</code>
        * [.innerText([text])](#TourGroup+innerText) <code>Object</code>
        * [.textContent([text])](#TourGroup+textContent) [<code>TourGroup</code>](#TourGroup)
        * [.afterHTML(text)](#TourGroup+afterHTML) [<code>TourGroup</code>](#TourGroup)
        * [.beforeHTML(text)](#TourGroup+beforeHTML) [<code>TourGroup</code>](#TourGroup)
        * [.empty()](#TourGroup+empty) [<code>TourGroup</code>](#TourGroup)
        * [.remove()](#TourGroup+remove) [<code>TourGroup</code>](#TourGroup)
        * [.unwrap()](#TourGroup+unwrap)
        * [.addClass(className)](#TourGroup+addClass) [<code>TourGroup</code>](#TourGroup)
        * [.removeClass(className)](#TourGroup+removeClass) [<code>TourGroup</code>](#TourGroup)
        * [.toggleClass(className)](#TourGroup+toggleClass) [<code>TourGroup</code>](#TourGroup)
        * [.hasClass(className)](#TourGroup+hasClass) <code>boolean</code>
        * [.getAttribute(name)](#TourGroup+getAttribute) <code>string</code> \| <code>null</code>
        * [.setAttribute(name, value)](#TourGroup+setAttribute) [<code>TourGroup</code>](#TourGroup)
        * [.value([value])](#TourGroup+value) [<code>TourGroup</code>](#TourGroup)
        * [.css(property, value)](#TourGroup+css) [<code>TourGroup</code>](#TourGroup)
        * [.addEventListener(event, func, useCapture)](#TourGroup+addEventListener) [<code>TourGroup</code>](#TourGroup)
        * [.addDelegateEventListener(event, selector, func, [useCapture])](#TourGroup+addDelegateEventListener) <code>function</code>
        * [.addOneTimeEventListener(event, func, useCapture)](#TourGroup+addOneTimeEventListener) [<code>TourGroup</code>](#TourGroup)
        * [.removeEventListener(event, func, useCapture)](#TourGroup+removeEventListener) [<code>TourGroup</code>](#TourGroup)
        * [.trigger(event, data)](#TourGroup+trigger) [<code>TourGroup</code>](#TourGroup)
    * _static_
        * [.init(selector, context)](#TourGroup.init) [<code>TourGroup</code>](#TourGroup)

<a name="new_TourGroup_new"></a>

### new TourGroup(selector, context)
Creates a new TourGroup instance.

**Returns**: [<code>TourGroup</code>](#TourGroup) - The TourGroup instance.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> \| <code>Array.&lt;Element&gt;</code> \| <code>Element</code> \| <code>Window</code> | The selector string, array of elements, single element, or window object. |
| context | <code>Element</code> | The context element to search within. |

**Example**  
```js
new Traversal('.my-class');
```
<a name="TourGroup+id"></a>

### tourGroup.id <code>string</code> \| <code>null</code>
Gets the ID of the first element in the TourGroup.

**Kind**: instance property of [<code>TourGroup</code>](#TourGroup)  
**Returns**: <code>string</code> \| <code>null</code> - The ID of the first element, or null if the TourGroup is empty.  
**Example**  
```js
var id = ToupGroup.init('.my-class').id();
```
<a name="TourGroup+length"></a>

### tourGroup.length <code>number</code>
Gets the number of elements in the TourGroup.

**Kind**: instance property of [<code>TourGroup</code>](#TourGroup)  
**Returns**: <code>number</code> - The number of elements.  
**Example**  
```js
var count = ToupGroup.init('.my-class').length;
```
<a name="TourGroup+children"></a>

### tourGroup.children(selector) [<code>TourGroup</code>](#TourGroup)
Get the children of each element in the set of matched elements, optionally filtered by a selector.
Similar to $.children(selector)

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - A new TourGroup instance containing the unique children elements.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | Optional. A string containing a selector expression to match the children against. |

**Example**  
```js
ToupGroup.init('.my-class').children();
```
<a name="TourGroup+closest"></a>

### tourGroup.closest(selectors) [<code>TourGroup</code>](#TourGroup)
Traverses each element and its parents (heading toward the document root) until it finds a node that matches the provided selector string.
Similar to $.closest(selector)

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - A new TourGroup instance containing the unique closest elements.  

| Param | Type | Description |
| --- | --- | --- |
| selectors | <code>string</code> | The selector string. |

**Example**  
```js
ToupGroup.init('.my-class').closest('.my-parent');
```
<a name="TourGroup+querySelectorAll"></a>

### tourGroup.querySelectorAll(selector) [<code>TourGroup</code>](#TourGroup)
Gets the descendants of each element in the current set of matched elements, filtered by a selector.
Similar to $.find(selector)

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - A new TourGroup instance containing the unique descendant elements.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The selector string. |

**Example**  
```js
ToupGroup.init('.my-class').querySelectorAll('.my-descendant');
```
<a name="TourGroup+nextElementSibling"></a>

### tourGroup.nextElementSibling() [<code>TourGroup</code>](#TourGroup)
Gets the next sibling element of each element in the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - A new TourGroup instance containing the unique next sibling elements.  
**Example**  
```js
ToupGroup.init('.my-class').nextElementSibling();
```
<a name="TourGroup+next"></a>

### tourGroup.next(selector) [<code>TourGroup</code>](#TourGroup)
Gets the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
Similar to $.next(selector)

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - A new TourGroup instance containing the unique next elements.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The selector string. |

**Example**  
```js
ToupGroup.init('.my-class').next('.my-next');
```
<a name="TourGroup+nextUntil"></a>

### tourGroup.nextUntil(selector) [<code>TourGroup</code>](#TourGroup)
Gets all following siblings of each element in the set of matched elements, up to but not including the element matched by the selector.
Similar to $.nextUntil(selector)

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - A new TourGroup instance containing the unique following sibling elements.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The selector string. |

**Example**  
```js
ToupGroup.init('.my-class').nextUntil('.my-next');
```
<a name="TourGroup+parentElement"></a>

### tourGroup.parentElement() [<code>TourGroup</code>](#TourGroup)
Gets the parent element of each element in the TourGroup.
Similar to $.parent()

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - A new TourGroup instance containing the unique parent elements.  
**Example**  
```js
ToupGroup.init('.my-class').parentElement();
```
<a name="TourGroup+parentUntil"></a>

### tourGroup.parentUntil(selector) [<code>TourGroup</code>](#TourGroup)
Gets all ancestors of each element in the set of matched elements, up to but not including the element matched by the selector.
Similar to $.parentsUntil(selector)

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - A new TourGroup instance containing the unique ancestor elements.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The selector string. |

**Example**  
```js
ToupGroup.init('.my-class').parentsUntil('.my-ancestor');
```
<a name="TourGroup+previousElementSibling"></a>

### tourGroup.previousElementSibling() [<code>TourGroup</code>](#TourGroup)
Gets the previous sibling element of each element in the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - A new TourGroup instance containing the unique previous sibling elements.  
**Example**  
```js
ToupGroup.init('.my-class').previousElementSibling();
```
<a name="TourGroup+prev"></a>

### tourGroup.prev(selector) [<code>TourGroup</code>](#TourGroup)
Gets the previous sibling element of each element in the TourGroup that matches the selector.
Similar to $.prev(selector)

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - A new TourGroup instance containing the unique previous elements.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The selector string. |

**Example**  
```js
ToupGroup.init('.my-class').prev('.my-prev');
```
<a name="TourGroup+prevUntil"></a>

### tourGroup.prevUntil(selector) [<code>TourGroup</code>](#TourGroup)
Gets all preceding siblings of each element in the set of matched elements, up to but not including the element matched by the selector.
Similar to $.prevUntil(selector)

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - A new TourGroup instance containing the unique preceding sibling elements.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The selector string. |

**Example**  
```js
ToupGroup.init('.my-class').prevUntil('.my-prev');
```
<a name="TourGroup+siblings"></a>

### tourGroup.siblings() [<code>TourGroup</code>](#TourGroup)
Gets all sibling elements of each element in the set of matched elements.
Similar to $.siblings()

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - A new TourGroup instance containing the unique sibling elements.  
**Example**  
```js
ToupGroup.init('.my-class').siblings();
```
<a name="TourGroup+not"></a>

### tourGroup.not(selector) [<code>TourGroup</code>](#TourGroup)
Filters out elements that do not match the specified selector.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - A new TourGroup instance containing the filtered elements.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The selector string. |

**Example**  
```js
ToupGroup.init('.my-class').not('.my-filter');
```
<a name="TourGroup+has"></a>

### tourGroup.has(selector) [<code>TourGroup</code>](#TourGroup)
Filters out elements that do not have any descendants that match the specified selector.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - A new TourGroup instance containing the filtered elements.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The selector string. |

**Example**  
```js
ToupGroup.init('.my-class').has('.my-descendant');
```
<a name="TourGroup+first"></a>

### tourGroup.first() <code>Element</code> \| <code>null</code>
Returns the first element of the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: <code>Element</code> \| <code>null</code> - The first element of the TourGroup, or null if the TourGroup is empty.  
**Example**  
```js
ToupGroup.init('.my-class').first();
```
<a name="TourGroup+last"></a>

### tourGroup.last() <code>Element</code> \| <code>null</code>
Returns the last element of the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: <code>Element</code> \| <code>null</code> - The last element of the TourGroup, or null if the TourGroup is empty.  
**Example**  
```js
ToupGroup.init('.my-class').last();
```
<a name="TourGroup+insertAdjacentHTML"></a>

### tourGroup.insertAdjacentHTML(position, text) [<code>TourGroup</code>](#TourGroup)
Inserts HTML content at a specified position relative to the element.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - The current instance of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>string</code> | The position relative to the element where the HTML content should be inserted. Possible values: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'. |
| text | <code>string</code> | The HTML content to be inserted. |

**Example**  
```js
ToupGroup.init('.my-class').insertAdjacentHTML('beforeend', '<p>Some text</p>');
```
<a name="TourGroup+appendHTML"></a>

### tourGroup.appendHTML(text) [<code>TourGroup</code>](#TourGroup)
Appends HTML content to the end of each element in the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - The current instance of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The HTML content to be appended. |

**Example**  
```js
ToupGroup.init('.my-class').appendHTML('<p>Some text</p>');
```
<a name="TourGroup+prependHTML"></a>

### tourGroup.prependHTML(text) [<code>TourGroup</code>](#TourGroup)
Prepends HTML content to the beginning of each element in the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - The current instance of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The HTML content to be prepended. |

**Example**  
```js
ToupGroup.init('.my-class').prependHTML('<p>Some text</p>');
```
<a name="TourGroup+outerHTML"></a>

### tourGroup.outerHTML([html]) <code>string</code> \| <code>undefined</code>
Sets or gets the outer HTML of each element in the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: <code>string</code> \| <code>undefined</code> - The outer HTML of the first element in the TourGroup, or undefined if the HTML content was set.  

| Param | Type | Description |
| --- | --- | --- |
| [html] | <code>string</code> | Optional. The HTML content to set as the outer HTML of each element. If not provided, returns the outer HTML of the first element in the TourGroup. |

**Example**  
```js
ToupGroup.init('.my-class').outerHTML('<p>Some text</p>');
```
**Example**  
```js
var htmlCode = ToupGroup.init('.my-class').outerHTML();
```
<a name="TourGroup+innerHTML"></a>

### tourGroup.innerHTML([html]) <code>string</code> \| <code>undefined</code>
Sets or gets the inner HTML of each element in the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: <code>string</code> \| <code>undefined</code> - The inner HTML of the first element in the TourGroup, or undefined if the HTML content was set.  

| Param | Type | Description |
| --- | --- | --- |
| [html] | <code>string</code> | Optional. The HTML content to set as the inner HTML of each element. If not provided, returns the inner HTML of the first element in the TourGroup. |

**Example**  
```js
ToupGroup.init('.my-class').innerHTML('<p>Some text</p>');
```
**Example**  
```js
var htmlCode = ToupGroup.init('.my-class').innerHTML();
```
<a name="TourGroup+innerText"></a>

### tourGroup.innerText([text]) <code>Object</code>
Sets or retrieves the inner text content of each element in the collection.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: <code>Object</code> - - The current instance of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| [text] | <code>string</code> | The text to set as the inner text content. If not provided, retrieves the inner text content of the first element in the collection. |

**Example**  
```js
ToupGroup.init('.my-class').innerText('Some text');
```
**Example**  
```js
var text = ToupGroup.init('.my-class').innerText();
```
<a name="TourGroup+textContent"></a>

### tourGroup.textContent([text]) [<code>TourGroup</code>](#TourGroup)
Gets or sets the text content of the elements in the collection.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - - The TourGroup instance.  

| Param | Type | Description |
| --- | --- | --- |
| [text] | <code>string</code> | The text content to set. If not provided, returns the text content of the first element in the collection. |

**Example**  
```js
ToupGroup.init('.my-class').textContent('Some text');
```
**Example**  
```js
var text = ToupGroup.init('.my-class').textContent();
```
<a name="TourGroup+afterHTML"></a>

### tourGroup.afterHTML(text) [<code>TourGroup</code>](#TourGroup)
Inserts the specified HTML content after each element in the collection.     *

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - The current instance of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The HTML content to insert. |

**Example**  
```js
ToupGroup.init('.my-class').afterHTML('<p>Some text</p>');
```
<a name="TourGroup+beforeHTML"></a>

### tourGroup.beforeHTML(text) [<code>TourGroup</code>](#TourGroup)
Inserts the specified HTML content before each element in the collection.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - The current instance of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The HTML content to insert. |

**Example**  
```js
ToupGroup.init('.my-class').beforeHTML('<p>Some text</p>');
```
<a name="TourGroup+empty"></a>

### tourGroup.empty() [<code>TourGroup</code>](#TourGroup)
Removes all child elements from the current element.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - The current TourGroup instance.  
**Example**  
```js
ToupGroup.init('.my-class').empty();
```
<a name="TourGroup+remove"></a>

### tourGroup.remove() [<code>TourGroup</code>](#TourGroup)
Removes all elements from the tour group.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - The updated tour group object.  
**Example**  
```js
ToupGroup.init('.my-class').remove();
```
<a name="TourGroup+unwrap"></a>

### tourGroup.unwrap()
Unwraps each element in the tour group by replacing it with its child nodes.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Example**  
```js
ToupGroup.init('.my-class').unwrap();
```
<a name="TourGroup+addClass"></a>

### tourGroup.addClass(className) [<code>TourGroup</code>](#TourGroup)
Adds a class to all elements in the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - The current instance of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>string</code> | The class name to add. |

**Example**  
```js
ToupGroup.init('.my-class').addClass('my-new-class');
```
<a name="TourGroup+removeClass"></a>

### tourGroup.removeClass(className) [<code>TourGroup</code>](#TourGroup)
Removes a class from all elements in the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - The current instance of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>string</code> | The class name to remove. |

**Example**  
```js
ToupGroup.init('.my-class').removeClass('my-old-class');
```
<a name="TourGroup+toggleClass"></a>

### tourGroup.toggleClass(className) [<code>TourGroup</code>](#TourGroup)
Toggles a class for all elements in the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - The current instance of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>string</code> | The class name to toggle. |

**Example**  
```js
ToupGroup.init('.my-class').toggleClass('my-class');
```
<a name="TourGroup+hasClass"></a>

### tourGroup.hasClass(className) <code>boolean</code>
Checks if any element in the tour group has the specified class.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: <code>boolean</code> - - Returns true if any element has the specified class, otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>string</code> | The class name to check for. |

**Example**  
```js
ToupGroup.init('.my-class').hasClass('my-class');
```
<a name="TourGroup+getAttribute"></a>

### tourGroup.getAttribute(name) <code>string</code> \| <code>null</code>
Retrieves the value of the specified attribute from the first element in the collection.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: <code>string</code> \| <code>null</code> - - The value of the attribute, or null if the collection is empty.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the attribute to retrieve. |

**Example**  
```js
ToupGroup.init('.my-class').getAttribute('data-id');
```
<a name="TourGroup+setAttribute"></a>

### tourGroup.setAttribute(name, value) [<code>TourGroup</code>](#TourGroup)
Sets the specified attribute with the given value for all elements in the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - - The TourGroup instance with the updated attribute values.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the attribute to set. |
| value | <code>string</code> | The value to set for the attribute. |

**Example**  
```js
ToupGroup.init('.my-class').setAttribute('data-myattr', '123');
```
<a name="TourGroup+value"></a>

### tourGroup.value([value]) [<code>TourGroup</code>](#TourGroup)
Sets or gets the value of the first HTMLInputElement in the collection.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - - The TourGroup instance.  

| Param | Type | Description |
| --- | --- | --- |
| [value] | <code>string</code> | The value to set. |

**Example**  
```js
ToupGroup.init('.my-class').value('Some text');
```
**Example**  
```js
var text = ToupGroup.init('.my-class').value();
```
<a name="TourGroup+css"></a>

### tourGroup.css(property, value) [<code>TourGroup</code>](#TourGroup)
Sets or gets the css of the first element in the collection.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - - The TourGroup instance with the updated CSS property values.  

| Param | Type |
| --- | --- |
| property | <code>string</code> | 
| value | <code>string</code> | 

**Example**  
```js
ToupGroup.init('.my-class').css('color', 'red');
```
**Example**  
```js
var color = ToupGroup.init('.my-class').css('color');
```
<a name="TourGroup+addEventListener"></a>

### tourGroup.addEventListener(event, func, useCapture) [<code>TourGroup</code>](#TourGroup)
Adds an event listener to each element in the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - - The current instance of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event name. |
| func | <code>function</code> | The event handler function. |
| useCapture | <code>boolean</code> | Specifies whether the event should be captured during the event propagation. |

**Example**  
```js
ToupGroup.init('.my-class').addEventListener('click', function() { alert('Hello!'); });
```
<a name="TourGroup+addDelegateEventListener"></a>

### tourGroup.addDelegateEventListener(event, selector, func, [useCapture]) <code>function</code>
Adds a delegate event listener to each element in the collection.
The event listener will be triggered when an event occurs on an element that matches the given selector.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: <code>function</code> - - The event handler function that was added as the event listener.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> |  | The name of the event to listen for. |
| selector | <code>string</code> |  | The CSS selector to match against the event target. |
| func | <code>function</code> |  | The callback function to be executed when the event occurs. |
| [useCapture] | <code>boolean</code> | <code>false</code> | Specifies whether the event should be captured during the event propagation. |

**Example**  
```js
var handler = ToupGroup.init('.my-class').addDelegateEventListener('click', '.my-child', function() { alert('Hello!'); });
         ToupGroup.init('.my-class').removeEventListener('click', handler);
```
<a name="TourGroup+addOneTimeEventListener"></a>

### tourGroup.addOneTimeEventListener(event, func, useCapture) [<code>TourGroup</code>](#TourGroup)
Adds a one-time event listener to each element in the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - - The current instance of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The name of the event to listen for. |
| func | <code>function</code> | The callback function to be executed when the event is triggered. |
| useCapture | <code>boolean</code> | Specifies whether the event should be captured during the event propagation. |

**Example**  
```js
ToupGroup.init('.my-class').addOneTimeEventListener('click', function() { alert('Hello!'); });
```
<a name="TourGroup+removeEventListener"></a>

### tourGroup.removeEventListener(event, func, useCapture) [<code>TourGroup</code>](#TourGroup)
Removes an event listener from each element in the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - - The current instance of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The name of the event to remove the listener from. |
| func | <code>function</code> | The listener function to remove. |
| useCapture | <code>boolean</code> | Specifies whether to use event capturing. |

**Example**  
```js
ToupGroup.init('.my-class').removeEventListener('click', myFunction);
```
<a name="TourGroup+trigger"></a>

### tourGroup.trigger(event, data) [<code>TourGroup</code>](#TourGroup)
Triggers the specified event on each element in the TourGroup.

**Kind**: instance method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - - The current instance of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The name of the event to trigger. |
| data | <code>Object</code> | Optional. An object containing custom data to pass to the event. |

**Example**  
```js
ToupGroup.init('.my-class').trigger('click');
```
<a name="TourGroup.init"></a>

### TourGroup.init(selector, context) [<code>TourGroup</code>](#TourGroup)
Initializes a TourGroup instance.

**Kind**: static method of [<code>TourGroup</code>](#TourGroup)  
**Returns**: [<code>TourGroup</code>](#TourGroup) - The TourGroup instance.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> \| <code>Array.&lt;Element&gt;</code> \| <code>Element</code> \| <code>Window</code> | The selector string, array of elements, single element, or window object. |
| context | <code>Element</code> | The context element to search within. |

**Example**  
```js
Traversal.init('.my-class');
```
<a name="isTourGroup"></a>

## isTourGroup(value) <code>boolean</code>
Checks if a value is an instance of TourGroup.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the value is an instance of TourGroup, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="isString"></a>

## isString(value) <code>boolean</code>
Checks if a value is a string.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the value is a string, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="unique"></a>

## unique(array) <code>Array</code>
Removes duplicate values from an array.

**Kind**: global function  
**Returns**: <code>Array</code> - A new array with duplicate values removed.  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array to remove duplicates from. |

