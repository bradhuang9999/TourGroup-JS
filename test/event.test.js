import TourGroup from "../src/tourgroup.js";
import {expect, jest, test} from '@jest/globals';


describe('TourGroup Event Listeners', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="parent">
                <button class="child">Button 1</button>
                <button class="child">Button 2</button>
            </div>
        `;
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('addEventListener should add event listener to each element', () => {
        let tourGroup = TourGroup.at('.child');
        const mockFunc = jest.fn();
        tourGroup.addEventListener('click', mockFunc);
        
        tourGroup.forEach(element => {
            element.click();
        });

        expect(mockFunc).toHaveBeenCalledTimes(2);
    });

    test('addDelegateEventListener should add event listener to matching elements', () => {
        let tourGroup = TourGroup.at('.parent');
        const mockFunc = jest.fn();
        tourGroup.addDelegateEventListener('click', '.child', mockFunc);

        const buttons = document.querySelectorAll('.child');
        buttons[0].click();
        buttons[1].click();

        expect(mockFunc).toHaveBeenCalledTimes(2);
    });

    test('addOneTimeEventListener should add event listener that triggers only once', () => {
        let tourGroup = TourGroup.at('.parent');
        const mockFunc = jest.fn();
        tourGroup.addOneTimeEventListener('click', mockFunc);

        const button = document.querySelector('.child');
        button.click();
        button.click(); // Second click should not trigger the listener again

        expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    test('removeEventListener should remove event listener from each element', () => {
        let tourGroup = TourGroup.at('.parent');
        const mockFunc = jest.fn();
        tourGroup.addEventListener('click', mockFunc);        
        tourGroup.removeEventListener('click', mockFunc);

        const button = document.querySelector('.child');
        button.click();

        expect(mockFunc).not.toHaveBeenCalled();
    });
});