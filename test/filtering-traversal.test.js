import TourGroup from "../src/travel.js";

describe("Filtering Traversal", () => {
    test("[not] filter", () => {
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1"></div>
                <div id="sibling2" class="tmp-c"></div>
                <div id="sibling3"></div>
            </div>
        `;
        
        const tourGroup = new TourGroup("div");
        const tourGroupExcluded = tourGroup.not(".tmp-c");

        expect(tourGroupExcluded.length).toBe(3);
    });

    test("[has] filter", () => {
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1">
                    <div class="tmp-c"></div>
                </div>
                <div id="sibling2"></div>
                <div id="sibling3">
                    <div class="tmp-c"></div>
                </div>
            </div>
        `;
        
        const tourGroup = new TourGroup("div");
        const tourGroupHas = tourGroup.has(".tmp-c");

        expect(tourGroupHas.map(e => e.id)).toEqual(["parent", "sibling1", "sibling3"]);
    });

    test("[first] filter", () => {
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1"></div>
                <div id="sibling2"></div>
                <div id="sibling3"></div>
            </div>
        `;
        
        const tourGroup = new TourGroup("div#parent div");
        const tourGroupFirst = tourGroup.first();

        expect(tourGroupFirst.id).toBe("sibling1");
    });

    test("[last] filter", () => {
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1"></div>
                <div id="sibling2"></div>
                <div id="sibling3"></div>
            </div>
        `;
        
        const tourGroup = new TourGroup("div#parent div");
        const tourGroupFirst = tourGroup.last();

        expect(tourGroupFirst.id).toBe("sibling3");
    });
});



describe('TourGroup DOM manipulation functions', () => {
    beforeEach(() => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1"><span>aaa</span></div>
                <div id="sibling2"><span>bbb</span></div>
                <div id="sibling3"><span>ccc</span></div>
            </div>
        `;
    });

    test('[insertAdjacentHTML] insertAdjacentHTML(position, text) should insert HTML adjacent to each element', () => {
        const elements = new TourGroup('#sibling2');
        elements.insertAdjacentHTML('afterend', '<div id="newSibling"></div>');
        const newSibling = document.getElementById('newSibling');
        expect(newSibling).not.toBeNull();
    });

    test('[appendHTML] appendHTML(text) should append HTML to the end of each element', () => {
        const elements = new TourGroup('#parent');
        elements.appendHTML('<div id="newSibling"></div>');
        const newSibling = document.getElementById('newSibling');
        expect(newSibling).not.toBeNull();
        expect(elements[0].lastChild.id).toBe('newSibling');
    });

    test('[prependHTML] prependHTML(text) should prepend HTML to the beginning of each element', () => {
        const elements = new TourGroup('#parent');
        elements.prependHTML('<div id="newSibling"></div>');
        const newSibling = document.getElementById('newSibling');
        expect(newSibling).not.toBeNull();
        expect(elements[0].firstChild.id).toBe('newSibling');
    });

    test('[innerHTML] innerHTML getter should return the inner HTML of the first element', () => {
        const elements = new TourGroup('#sibling2');
        expect(elements.innerHTML()).toBe('<span>bbb</span>');
    });

    test('[innerHTML] innerHTML setter should set the inner HTML for all elements', () => {
        const elements = new TourGroup('#parent');
        elements.innerHTML('<div id="newSibling"></div>');
        const newSibling = document.getElementById('newSibling');
        expect(newSibling).not.toBeNull();
        expect(elements[0].innerHTML()).toBe('<div id="newSibling"></div>');
    });

    test('[outerHTML] should return the outer HTML of the first element in the TourGroup', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="child">Hello</div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = new TourGroup('#child');
        
        // Call the outerHTML getter
        const outerHTML = elements.outerHTML();
        
        // Assert that the outer HTML is correct
        expect(outerHTML).toBe('<div id="child">Hello</div>');
    });
    
    test('[outerHTML] should set the outer HTML for all elements in the TourGroup', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="child1">Hello</div>
                <div id="child2">World</div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = new TourGroup('#child1, #child2');
        
        // Set the outer HTML
        elements.outerHTML('<div>New Content</div>');
        
        // Assert that the outer HTML has been updated for all elements
        expect(document.body.innerHTML).toBe(`
            <div id="parent">
                <div>New Content</div>
                <div>New Content</div>
            </div>
        `);
    });    

    /* innerText is not supported in jsdom    
    test('innerText getter should return the inner text of the first element', () => {
        const elements = new TourGroup('#sibling2');
        expect(elements.innerText()).toBe('bbb');
    });

    test('innerText setter should set the inner text for all elements', () => {
        const elements = new TourGroup('#parent');
        elements.innerText('New Text');
        expect(elements[0].innerText).toBe('New Text');
    });
    */

    test('[textContent] textContent getter should return the inner text of the first element', () => {
        const elements = new TourGroup('#sibling2');
        expect(elements.textContent()).toBe('bbb');
    });

    test('[textContent] textContent setter should set the inner text for all elements', () => {
        const elements = new TourGroup('#parent');
        elements.textContent('New Text');
        expect(elements[0].textContent).toBe('New Text');
    });

    test('[afterHTML] should insert the specified HTML content after each element in the set of matched elements', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1"></div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = new TourGroup('#sibling1');
        
        // Call the afterHTML method
        elements.afterHTML('<div id="newSibling">New Sibling</div>');
        
        // Assert that the new sibling is added after the existing element
        const newSibling = document.querySelector('#newSibling');
        expect(newSibling.previousElementSibling.id).toBe('sibling1');
    });
    
    test('[beforeHTML] should insert the specified HTML content before each element in the set of matched elements', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="sibling1"></div>
            </div>
        `;
        
        // Create a new instance of TourGroup
        const elements = new TourGroup('#sibling1');
        
        // Call the beforeHTML method
        elements.beforeHTML('<div id="newSibling">New Sibling</div>');
        
        // Assert that the new sibling is added before the existing element
        const newSibling = document.querySelector('#newSibling');
        expect(newSibling.nextElementSibling.id).toBe('sibling1');
    });
});