const Base = (function () {
  let isIndividualElement = false;

  const isArray       = value => value && value.constructor === Array;
  const isBoolean     = value => typeof value === 'boolean';
  const isDate        = value => value && value instanceof Date;
  const isError       = value => value && value instanceof Error;
  const isFunction    = value => typeof value === 'function';
  const isHTMLElement = value => value && value.nodeName;
  const isNull        = value => value === null;

  // isFinite will handle NaN and Infinity case.
  const isNumber = value => typeof value === 'number' && isFinite(value);
  const isObject = value => value && value.constructor === Object;
  const isRegex  = value => value && value.constructor;

  // Checking instanceof ot handling scenario if string is defined by 'new String'
  const isString    = value => typeof value === 'string' || value instanceof String;
  const isSymbol    = value => typeof value === 'symbol';
  const isUndefined = value => typeof value === 'undefined';

  function createElement (name, props, children) {
    if(!name && !isString(name)) {
      return;
    }

    const element = document.createElement(name);

    if(isArray(children)) {
      for(let i=0, j=children.length; i<j; i++) {
        const child = children[i];

        if(isHTMLElement(child)) {
          element.appendChild(child);
        }
      }

    } else if(isHTMLElement(children)) {
      element.appendChild(children);
    } else if(isString(children)) {
      element.textContent = children;
    }


    if(!isObject(props)) {
      return element;
    }

    for(let key in props) {
      if(props.hasOwnProperty(key)) {
        element[key] = props[key];
      }
    }

    return element;
  }

  function deleteElement (element) {
    if(isHTMLElement(element)) {
      element.parentNode.removeChild(element);
    }
  }

  function Selection (elements, individual) {
    if(individual) {
      this.elements = [document.querySelector(elements)];
      isIndividualElement = true;
    }
    else {
      this.elements = Array.prototype.slice.call(document.querySelectorAll(elements));
    }

    this.length = this.elements.length;

    return this;
  }

  Selection.prototype.show = function () {
    for(let i=0, j=this.length; i<j; i++) {
      this.elements[i].style.display = '';
    }

    return this;
  }

  Selection.prototype.hide = function () {
    for(let i=0, j=this.length; i<j; i++) {
      this.elements[i].style.display = 'none';
    }

    return this;
  }

  Selection.prototype.addEvent = function (event, action) {
    for(let i=0, j=this.length; i<j; i++) {
      this.elements[i].addEventListener(event, action);
    }

    return this;
  }

  Selection.prototype.removeEvent = function (event, action) {
    for(let i=0, j=this.length; i<j; i++) {
      this.elements[i].removeEventListener(event, action);
    }

    return this;
  }

  Selection.prototype.val = function (value) {
    if(isIndividualElement) {
      if(isString(value) || isNumber(value)) {
        this.elements[0].value = value;
        return this;
      }
      else if(isUndefined(value)) {
        return this.elements[0].value;
      }
    }
    else {
      if(isArray(value)) {
        const valueLength = value.length;

        for(let i=0, j=this.length; i<j; i++) {

          if(i === valueLength) {
            return this;
          }

          const _value = value[i];

          if(isString(_value) || isNumber(_value)) {
            this.elements[i].value = _value;
          }
        }

        return this;
      }
      else if(isUndefined(value)) {
        const result = [];

        for(let i=0, j=this.length; i<j; i++) {
          result.push(this.elements[i].value);
        }

        return result;
      }
    }

    return this;
  }

  Selection.prototype.fillVal = function (value) {
    if(isString(value) || isNumber(value)) {
      for(let i=0, j=this.length; i<j; i++) {
        this.elements[i].value = value;
      }
    }

    return this;
  }

  function select (element) {
    return new Selection(element, true);
  }

  function selectAll (element) {
    const params = Array.prototype.slice.call(arguments);

    return new Selection(params);
  }

  return {
    isArray,
    isBoolean,
    isDate,
    isError,
    isFunction,
    isHTMLElement,
    isNull,
    isNumber,
    isObject,
    isRegex,
    isString,
    isSymbol,
    isUndefined,
    select,
    selectAll,
    createElement,
    deleteElement
  };
})();
