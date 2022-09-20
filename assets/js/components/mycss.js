const myCSS = {
    toggleAnimation: (element, className) => {
        element.classList.remove(className)
        setTimeout(() => {
            element.classList.add(className)
        }, 100);
        return true
    },
    toggleClass: (element, className) => {
        const classNameMatch = className.substring(0, 1) == '.' ?
            className : `.${className}`;
        let state
        if (element.matches(classNameMatch)) {
            state = 'removed'
            element.classList.remove(className)
        }
        else{
            state = 'added'
            element.classList.add(className)
        }
        return state
    },
    classRemove: (element, className) => element.classList.remove(className),
    classRemoveInArray: (elements, className) => elements.forEach(element =>
        element.classList.remove(className))

};
export default myCSS;