class DomArr extends Array {
    constructor(cssSelector, context) {
        super();
        
        if (!cssSelector)
            return;
        if (isDomArr(cssSelector))
            return cssSelector;
        
        let eles = cssSelector;
        if (isString(cssSelector)) {
            const ctx = context || document;
            eles = Array.from(ctx.querySelectorAll(cssSelector));
        }
        if (eles.nodeType || eles === window)
            eles = [eles];
        
        for (let i = 0, l = eles.length; i < l; i++) {
            this[i] = eles[i];
        }
    }
    
    static init(cssSelector, context) {
        return new DomArr(cssSelector, context);
    }
    
    addEventListener(event, func, useCapture) {
        for(let ele of this) {
            ele.addEventListener(event, func, useCapture);
        }
    }
    
    after(content, func) {
        for(let ele of this) {
            ele.after(content, func);
        }
    }

    closest(selectors) {
        return (unique(this.map(element => element.closest(selectors))));
    }

    parentElement() {
        var parentElements = this.map(element => element.parentElement);
        return (unique(parentElements));
    }
    
    not(cssSelector) {
        return this.filter(element => !element.matches(cssSelector));
    }

    parentElement() {
        return new DomArr(unique(this.map(element => element.parentElement)));
    }
    
    querySelectorAll(cssSelector) {
        const subEles = this.flatMap(element => {
            return Array.from(element.querySelectorAll(cssSelector));
        });
        return new DomArr(subEles);
    }
    
    get id()  {
        return this.length === 0 ? undefined : this[0].id;
    }

    get length() {
        return this.length;
    }
  
    get value() {
        return this.length === 0 ? undefined : this[0].value;
    }
  
    set value(value) {
        for(let ele of this) {
            if (ele instanceof HTMLInputElement) {
                ele.value = value;
            }
        }
    }

    get innerHTML() {
        return this.length === 0 ? undefined : this[0].innerHTML;
    }

    /**
     * Set innerHTML for all elements
     */
    set innerHTML(html) {
        for(let ele of this) {
            ele.innerHTML = html;
        }
    }

    set innerText(text) {
        for(let ele of this) {
            ele.innerText = text;
        }
    }

    /**
     * Add class to all elements
     * @param {*} className 
     */
    addClass(className) {
        for(let ele of this) {
            ele.classList.add(className);
        }
    }

    /**
     * Remove class from all elements
     * @param {*} className 
     */
    removeClass(className) {
        for(let ele of this) {
            ele.classList.remove(className);
        }
    }

    /**
     * Toggle class for all elements
     * @param {*} className 
     */
    toggleClass(className) {
        for(let ele of this) {
            ele.classList.toggle(className);
        }
    }
}

function isDomArr(value) {
    return value instanceof DomArr;
}
function isString(value) {
    return typeof value === 'string';
}
function unique(array) {
    return array.filter((currentValue, index, arr) => (
        arr.indexOf(currentValue) === index
    ));
}

export default DomArr;