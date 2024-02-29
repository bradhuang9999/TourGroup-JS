import DomArr from "../src/travel.js";


describe('DomArr id getter', () => {
    test('should return the id of the first element in the array', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="element1"></div>
            <div id="element2"></div>
        `;
        
        // Create a new instance of DomArr
        const elements = new DomArr('#element1, #element2');
        
        // Assert that the id getter returns the id of the first element
        expect(elements.id).toBe('element1');
    });
});


describe('DomArr closest method', () => {
    test('should return the closest element matching the given selector', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="child">
                    <span id="target">Target Element</span>
                </div>
            </div>
        `;
        
        // Create a new instance of DomArr
        const elements = new DomArr('#target');
        
        // Call the closest method with a selector
        const closestElement = elements.closest('#parent');
        
        // Assert that the closest element is the parent element
        expect(closestElement.id).toBe('parent');
    });
});


describe('DomArr parentElement method', () => {
    test('should return the parent element of each element in the array', () => {
        // Create a test DOM structure
        document.body.innerHTML = `
            <div id="parent">
                <div id="child1"></div>
                <div id="child2"></div>
            </div>
        `;
        
        // Create a new instance of DomArr
        const elements = new DomArr('#child1, #child2');
        
        // Call the parentElement method
        const parentElements = elements.parentElement();
        
        // Assert that the parent elements are the same as the parent element in the DOM structure
        expect(parentElements.id).toBe('parent');
        expect(parentElements.id).toBe('parent');
    });
});
