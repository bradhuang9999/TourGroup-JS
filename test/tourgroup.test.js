/**
 * @fileoverview Unit tests for the TourGroup class.
 */

import TourGroup from "../src/tourgroup.js";

/**
 * Tests the id getter of the TourGroup class.
 */
describe('TourGroup id getter', () => {
    test('should return the id of the first element in the array', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="element1"></div>
            <div id="element2"></div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#element1, #element2');
        
        // Assert that the id getter returns the id of the first element
        expect(elements.id).toBe('element1');
    });
});

/**
 * Tests Tree Traversal
 */
describe('Tree Traversal', () => {
    test('[Children] should return the children of each element in the array', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="child1"></div>
                <div id="child2"></div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#parent');
        
        // Call the children method
        const children = elements.children();
        
        // Assert that the children are the same as the children in the DOM structure
        expect(children[0].id).toBe('child1');
        expect(children[1].id).toBe('child2');
    });

    test('[children] should return the children of each element filtered by a selector', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="child1"></div>
                <div id="child2"></div>
                <span id="child3"></span>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#parent');
        
        // Call the children method with a selector
        const children = elements.children('div');
        
        // Assert that the children are the same as the children in the DOM structure
        expect(children[0].id).toBe('child1');
        expect(children[1].id).toBe('child2');
    });

    test('[closest] should return the closest element matching the given selector', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="child">
                    <span id="target">Target Element</span>
                </div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#target');
        
        // Call the closest method with a selector
        const closestElement = elements.closest('#parent');
        
        // Assert that the closest element is the parent element
        expect(closestElement.id).toBe('parent');
    });

    test('[closest] should return the closest element matching the given selector', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="child">
                    <span id="target">Target Element</span>
                </div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#target');
        
        // Call the closest method with a selector
        const closestElement = elements.closest('#parentx');
        
        // Assert that the closest element is the parent element
        expect(closestElement.length).toBe(0);
    });    

    test('should return the parent element of each element in the array', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="child1"></div>
                <div id="child2"></div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#child1, #child2');
        
        // Call the parentElement method
        const parentElements = elements.parentElement();
        
        // Assert that the parent elements are the same as the parent element in the DOM structure
        expect(parentElements.id).toBe('parent');
        expect(parentElements.id).toBe('parent');
    });

    test('[querySelectorAll] should return the elements matching the given selector', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="child1"></div>
                <div id="child2" class='tmp-c'></div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#parent');
        
        // Call the querySelectorAll method with a selector
        const children = elements.querySelectorAll('div.tmp-c');
        
        // Assert that the children are the same as the children in the DOM structure
        expect(children.id).toBe('child2');
    });

    test('[nextElementSibling] should return the next element sibling', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1"></div>
                <div id="sibling2"></div>
                <div id="sibling3"></div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#sibling1');
        
        // Call the nextElementSibling() method
        const nextSibling = elements.nextElementSibling();
        
        // Assert that the nextSibling is the correct element
        expect(nextSibling.id).toBe('sibling2');
    });  
    
    test('[next] should return the next sibling matching the selector', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1"></div>
                <div id="sibling2" class="tmp-c"></div>
                <div id="sibling3"></div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#sibling1');
        
        // Call the next(selector) method with a selector
        const nextSibling = elements.next('.tmp-c');
        
        // Assert that the nextSibling is the correct element
        expect(nextSibling.id).toBe('sibling2');
    });   
    
    test('[nextUntil] should return the next siblings until the element matching the selector', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1"></div>
                <div id="sibling2"></div>
                <div id="sibling3"></div>
                <div id="sibling4" class="tmp-c"></div>
                <div id="sibling5"></div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#sibling1');
        
        // Call the nextUntil(selector) method with a selector
        const nextSiblings = elements.nextUntil('.tmp-c');
        
        // Assert that the nextSiblings are the correct elements
        expect(nextSiblings.map(e => e.id)).toEqual(['sibling2', 'sibling3']);
    });    

    /*
    test('[offsetParent] should return the offset parent of each element in the set of matched elements', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <ul class="level-1">
              <li class="item-i">I</li>
              <li class="item-ii" style="position: relative;">II
                <ul class="level-2">
                  <li class="item-a">A</li>
                  <li class="item-b">B
                    <ul class="level-3">
                      <li class="item-1">1</li>
                      <li class="item-2">2</li>
                      <li class="item-3">3</li>
                    </ul>
                  </li>
                  <li class="item-c">C</li>
                </ul>
              </li>
              <li class="item-iii">III</li>
            </ul>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('li.item-a');
        
        // Call the offsetParent() method
        const offsetParent = elements.offsetParent();
        
        // Assert that the offsetParent is the correct element
        expect(offsetParent[0].classList).toBe('item-ii');
    });   
    */
    
    test('[parentElement] should return the parent element of each element in the set of matched elements', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <ul class="level-1">
              <li class="item-i">I</li>
              <li class="item-ii">II
                <ul class="level-2">
                  <li class="item-a">A</li>
                  <li class="item-b">B
                    <ul class="level-3">
                      <li class="item-1">1</li>
                      <li class="item-2">2</li>
                      <li class="item-3">3</li>
                    </ul>
                  </li>
                  <li class="item-c">C</li>
                </ul>
              </li>
              <li class="item-iii">III</li>
            </ul>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('li.item-a');
        
        // Call the parentElement() method
        const parentElement = elements.parentElement();
        
        // Assert that the parentElement is the correct element
        expect(parentElement[0].className).toBe('level-2');
    });  
    
    test('[parentUntil] should return the parent elements until the element matching the selector', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
          <ul class="level-1 yes">
            <li class="item-i">I</li>
            <li class="item-ii">II
              <ul class="level-2 yes">
                <li class="item-a">A</li>
                <li class="item-b">B
                  <ul class="level-3">
                    <li class="item-1">1</li>
                    <li class="item-2">2</li>
                    <li class="item-3">3</li>
                  </ul>
                </li>
                <li class="item-c">C</li>
              </ul>
            </li>
            <li class="item-iii">III</li>
          </ul>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('li.item-a');
        
        // Call the parentUntil(selector) method with a selector
        const parents = elements.parentUntil('.level-1');
        
        // Assert that the parents are the correct elements
        expect(parents.map(e => e.className)).toEqual(['level-2 yes', 'item-ii']);
    });    

    test('[parentUntil] should return the parent elements until the element matching the selector', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
          <ul class="level-1 yes">
            <li class="item-i">I</li>
            <li class="item-ii">II
              <ul class="level-2 yes">
                <li class="item-a">A</li>
                <li class="item-b">B
                  <ul class="level-3">
                    <li class="item-1">1</li>
                    <li class="item-2">2</li>
                    <li class="item-3">3</li>
                  </ul>
                </li>
                <li class="item-c">C</li>
              </ul>
            </li>
            <li class="item-iii">III</li>
          </ul>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('li.item-a');
        
        // Call the parentUntil(selector) method with a selector
        const parents = elements.parentUntil('.level-1');
        
        // Assert that the parents are the correct elements
        expect(parents.map(e => e.className)).toEqual(['level-2 yes', 'item-ii']);
    });    

    test('[previousElementSibling] should return the previous element sibling', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1"></div>
                <div id="sibling2"></div>
                <div id="sibling3"></div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#sibling2');
        
        // Call the previousElementSibling() method
        const prevSibling = elements.previousElementSibling();
        
        // Assert that the prevSibling is the correct element
        expect(prevSibling.id).toBe('sibling1');
    }); 
    
    test('[previousElementSibling] should return the previous element sibling', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1"></div>
                <div id="sibling2"></div>
                <div id="sibling3"></div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#sibling1');
        
        // Call the previousElementSibling() method
        const prevSibling = elements.previousElementSibling();
        
        // Assert that the prevSibling is the correct element
        expect(prevSibling.id).toBe(null);
    });

    test('[prev] should return the previous sibling', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div><span>Hello</span></div>
            <p class="selected">Hello Again</p>
            <p>And Again</p>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('p');
        
        // Call the prev(selector) method with a selector
        const prevSibling = elements.prev();
        
        // Assert that the prevSibling is the correct element
        expect(prevSibling.map(e => e.tagName)).toEqual(['DIV', 'P']);
    });       

    test('[prev] should return the previous sibling matching the selector', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div><span>Hello</span></div>
            <p class="selected">Hello Again</p>
            <p>And Again</p>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('p');
        
        // Call the prev(selector) method with a selector
        const prevSibling = elements.prev('.selected');
        
        // Assert that the prevSibling is the correct element
        expect(prevSibling[0].className).toBe('selected');
    });    

    test('[prevUntil] should return the previous siblings until the element matching the selector', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1"></div>
                <div id="sibling2" class="tmp-c"></div>
                <div id="sibling3"></div>
                <div id="sibling4"></div>
                <div id="sibling5"></div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#sibling5');
        
        // Call the prevUntil(selector) method with a selector
        const prevSiblings = elements.prevUntil('.tmp-c');
        
        // Assert that the prevSiblings are the correct elements
        expect(prevSiblings.map(e => e.id)).toEqual(['sibling4', 'sibling3']);
    });  
    
    test('[siblings] should return the siblings of each element in the set of matched elements', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1"></div>
                <div id="sibling2"></div>
                <div id="sibling3"></div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#sibling2');
        
        // Call the siblings() method
        const siblings = elements.siblings();
        
        // Assert that the siblings are the correct elements
        expect(siblings.map(e => e.id)).toEqual(['sibling1', 'sibling3']);
    });    

    test('[siblings] should return empty TourGroup if no matched elements', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling2"></div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#sibling2');
        
        // Call the siblings() method
        const siblings = elements.siblings();
        
        // Assert that the siblings are the correct elements
        expect(siblings.map(e => e.id)).toEqual([]);
    });   
    
    test('[siblings] should return the siblings of each element in the set of matched elements', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1"></div>
                <div id="sibling2" class="tmp-c"></div>
                <div id="sibling3"></div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = TourGroup.at('#sibling1');
        
        // Call the siblings(selector) method with a selector
        const siblings = elements.siblings('.tmp-c');
        
        // Assert that the siblings are the correct elements
        expect(siblings[0].id).toBe('sibling2');
    });
});





