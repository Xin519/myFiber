/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/react/Component/index.js":
/*!**************************************!*\
  !*** ./src/react/Component/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _reconciliation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reconciliation */ "./src/react/reconciliation/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var Component = /*#__PURE__*/function () {
  function Component(props) {
    _classCallCheck(this, Component);

    this.props = props;
  }

  _createClass(Component, [{
    key: "setState",
    value: function setState(partialState) {
      (0,_reconciliation__WEBPACK_IMPORTED_MODULE_0__.scheduleUpdate)(this, partialState);
    }
  }]);

  return Component;
}();

/***/ }),

/***/ "./src/react/CreateElement/index.js":
/*!******************************************!*\
  !*** ./src/react/CreateElement/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createElement)
/* harmony export */ });
function createElement(type, props) {
  var _ref;

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var childElements = (_ref = []).concat.apply(_ref, children).reduce(function (result, child) {
    if (child !== false && child !== true && child !== null) {
      if (child instanceof Object) {
        result.push(child);
      } else {
        result.push(createElement("text", {
          textContent: child
        }));
      }
    }

    return result;
  }, []);

  return {
    type: type,
    props: Object.assign({
      children: childElements
    }, props)
  };
}

/***/ }),

/***/ "./src/react/DOM/createDOMElement.js":
/*!*******************************************!*\
  !*** ./src/react/DOM/createDOMElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createDOMElement)
/* harmony export */ });
/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateNodeElement */ "./src/react/DOM/updateNodeElement.js");

function createDOMElement(virtualDOM) {
  var newElement = null;

  if (virtualDOM.type === "text") {
    // ????????????
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // ????????????
    newElement = document.createElement(virtualDOM.type);
    (0,_updateNodeElement__WEBPACK_IMPORTED_MODULE_0__["default"])(newElement, virtualDOM);
  }

  return newElement;
}

/***/ }),

/***/ "./src/react/DOM/index.js":
/*!********************************!*\
  !*** ./src/react/DOM/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDOMElement": () => (/* reexport safe */ _createDOMElement__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "updateNodeElement": () => (/* reexport safe */ _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _createDOMElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDOMElement */ "./src/react/DOM/createDOMElement.js");
/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateNodeElement */ "./src/react/DOM/updateNodeElement.js");



/***/ }),

/***/ "./src/react/DOM/updateNodeElement.js":
/*!********************************************!*\
  !*** ./src/react/DOM/updateNodeElement.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateNodeElement)
/* harmony export */ });
function updateNodeElement(newElement, virtualDOM) {
  var oldVirtualDOM = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // ?????????????????????????????????
  var newProps = virtualDOM.props || {};
  var oldProps = oldVirtualDOM.props || {};

  if (virtualDOM.type === "text") {
    // ????????????
    if (newProps.textContent !== oldProps.textContent) {
      // ???????????????????????? 

      /**
       * ??????????????????????????? ?????? 
       * ????????? ??????
       */
      if (virtualDOM.parent.type !== oldVirtualDOM.parent.type) {
        virtualDOM.parent.stateNode.appendChild(document.createTextNode(newProps.textContent));
      } else {
        virtualDOM.parent.stateNode.replaceChild(document.createTextNode(newProps.textContent), oldVirtualDOM.stateNode);
      }
    }

    return;
  }
  /**
   * ????????????
   */


  Object.keys(newProps).forEach(function (propName) {
    // ???????????????
    var newPropsValue = newProps[propName];
    var oldPropsValue = oldProps[propName];

    if (newPropsValue !== oldPropsValue) {
      // ???????????????????????????????????? onClick -> click
      if (propName.slice(0, 2) === "on") {
        // ????????????
        var eventName = propName.toLowerCase().slice(2); // ?????????????????????

        newElement.addEventListener(eventName, newPropsValue); // ??????????????????????????????????????????

        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue);
        }
      } else if (propName === "value" || propName === "checked") {
        newElement[propName] = newPropsValue;
      } else if (propName !== "children") {
        if (propName === "className") {
          newElement.setAttribute("class", newPropsValue);
        } else {
          newElement.setAttribute(propName, newPropsValue);
        }
      }
    }
  }); // ??????????????????????????????

  Object.keys(oldProps).forEach(function (propName) {
    var newPropsValue = newProps[propName];
    var oldPropsValue = oldProps[propName];

    if (!newPropsValue) {
      // ??????????????????
      if (propName.slice(0, 2) === "on") {
        var eventName = propName.toLowerCase().slice(2);
        newElement.removeEventListener(eventName, oldPropsValue);
      } else if (propName !== "children") {
        newElement.removeAttribute(propName);
      }
    }
  });
}

/***/ }),

/***/ "./src/react/Misc/Arrified/index.js":
/*!******************************************!*\
  !*** ./src/react/Misc/Arrified/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var arrified = function arrified(arg) {
  return Array.isArray(arg) ? arg : [arg];
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrified);

/***/ }),

/***/ "./src/react/Misc/CreateTaskQueue/index.js":
/*!*************************************************!*\
  !*** ./src/react/Misc/CreateTaskQueue/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var CreateTaskQueue = function CreateTaskQueue() {
  var taskQueue = [];
  return {
    push: function push(item) {
      return taskQueue.push(item);
    },
    // ??????
    pop: function pop() {
      return taskQueue.shift();
    },
    // ?????? ????????????
    isEmpty: function isEmpty() {
      return taskQueue.length === 0;
    },
    // ????????????????????????
    get: function get() {
      return taskQueue;
    }
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateTaskQueue);

/***/ }),

/***/ "./src/react/Misc/createReactInstance/index.js":
/*!*****************************************************!*\
  !*** ./src/react/Misc/createReactInstance/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createReactInstance": () => (/* binding */ createReactInstance)
/* harmony export */ });
var createReactInstance = function createReactInstance(fiber) {
  var instance = null;

  if (fiber.tag === 'class_component') {
    instance = new fiber.type(fiber.props);
  } else {
    instance = fiber.type;
  }

  return instance;
};

/***/ }),

/***/ "./src/react/Misc/createStateNode/index.js":
/*!*************************************************!*\
  !*** ./src/react/Misc/createStateNode/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../DOM */ "./src/react/DOM/index.js");
/* harmony import */ var _createReactInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../createReactInstance */ "./src/react/Misc/createReactInstance/index.js");



var createStateNode = function createStateNode(fiber) {
  if (fiber.tag === "host_component") {
    return (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.createDOMElement)(fiber);
  } else {
    return (0,_createReactInstance__WEBPACK_IMPORTED_MODULE_1__.createReactInstance)(fiber);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createStateNode);

/***/ }),

/***/ "./src/react/Misc/getRoot/index.js":
/*!*****************************************!*\
  !*** ./src/react/Misc/getRoot/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var getRoot = function getRoot(instance) {
  var fiber = instance.__fiber;

  while (fiber.parent) {
    fiber = fiber.parent;
  }

  return fiber;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRoot);

/***/ }),

/***/ "./src/react/Misc/getTag/index.js":
/*!****************************************!*\
  !*** ./src/react/Misc/getTag/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Component */ "./src/react/Component/index.js");


var getTag = function getTag(vdom) {
  if (typeof vdom.type === 'string') {
    return 'host_component';
  } else if (Object.getPrototypeOf(vdom.type) === _Component__WEBPACK_IMPORTED_MODULE_0__.Component) {
    return 'class_component';
  } else {
    return 'function_component';
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTag);

/***/ }),

/***/ "./src/react/Misc/index.js":
/*!*********************************!*\
  !*** ./src/react/Misc/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateTaskQueue": () => (/* reexport safe */ _CreateTaskQueue__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "arrified": () => (/* reexport safe */ _Arrified__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "createStateNode": () => (/* reexport safe */ _createStateNode__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "getRoot": () => (/* reexport safe */ _getRoot__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "getTag": () => (/* reexport safe */ _getTag__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _CreateTaskQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateTaskQueue */ "./src/react/Misc/CreateTaskQueue/index.js");
/* harmony import */ var _Arrified__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Arrified */ "./src/react/Misc/Arrified/index.js");
/* harmony import */ var _createStateNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createStateNode */ "./src/react/Misc/createStateNode/index.js");
/* harmony import */ var _getTag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getTag */ "./src/react/Misc/getTag/index.js");
/* harmony import */ var _getRoot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getRoot */ "./src/react/Misc/getRoot/index.js");






/***/ }),

/***/ "./src/react/index.js":
/*!****************************!*\
  !*** ./src/react/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* reexport safe */ _Component__WEBPACK_IMPORTED_MODULE_2__.Component),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "render": () => (/* reexport safe */ _reconciliation__WEBPACK_IMPORTED_MODULE_1__.render)
/* harmony export */ });
/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement */ "./src/react/CreateElement/index.js");
/* harmony import */ var _reconciliation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reconciliation */ "./src/react/reconciliation/index.js");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Component */ "./src/react/Component/index.js");
 // import { render } from "./reconciliation/index-array"




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  createElement: _CreateElement__WEBPACK_IMPORTED_MODULE_0__["default"]
});

/***/ }),

/***/ "./src/react/reconciliation/index.js":
/*!*******************************************!*\
  !*** ./src/react/reconciliation/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "scheduleUpdate": () => (/* binding */ scheduleUpdate)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOM */ "./src/react/DOM/index.js");
/* harmony import */ var _Misc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Misc */ "./src/react/Misc/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var taskQueue = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.CreateTaskQueue)();
var subTask = null; // ??????

var pendingCommit = null; // ????????????fiber?????????

var commitAllWork = function commitAllWork(fiber) {
  var currentFiber = fiber.firstEffect;

  while (currentFiber) {
    if (currentFiber.tag === 'class_component') {
      currentFiber.stateNode.__fiber = currentFiber;
    }

    if (currentFiber.effectTag === 'placement') {
      // ?????????
      var _fiber = currentFiber;

      if (_fiber.tag === 'host_component') {
        // ?????????????????? ??????appendChild
        var parentFiber = currentFiber.parent;

        while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') {
          // ?????????class function
          parentFiber = parentFiber.parent;
        }

        parentFiber.stateNode.appendChild(_fiber.stateNode);
      }
    } else if (currentFiber.effectTag === 'update') {
      // ??????
      if (currentFiber.type === currentFiber.alternate.type) {
        // ????????????
        (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.updateNodeElement)(currentFiber.stateNode, currentFiber, currentFiber.alternate);
      } else {
        // ??????
        currentFiber.parent.stateNode.replaceChild(currentFiber.stateNode, currentFiber.alternate.stateNode); // ????????????
      }
    } else if (currentFiber.effectTag === 'delete') {
      debugger; // ??????

      currentFiber.parent.stateNode.removeChild(currentFiber.stateNode);
    }

    currentFiber = currentFiber.nextEffect;
  }
  /**
   * ????????? fiber 
   * ????????? ?????????
   */


  fiber.stateNode.__rootFiberContainer = fiber;
};

var reconcileChildren = function reconcileChildren(fiber, children) {
  /**
   * children ???????????? ??????????????????
   * ???children ???????????????
   */
  var arrifiedChildren = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.arrified)(children);
  var index = 0; // ??????

  var numberOfElement = arrifiedChildren.length; // children ????????????????????????

  var element = null; // ?????????????????? ????????? virtualDom??????

  var newFiber = null; // ?????? fiber

  var prevFiber = null; // ??????????????? fiber

  var alternate = null; // ??????

  if (fiber.alternate && fiber.alternate.child) {
    // ?????? ????????? && ?????????
    alternate = fiber.alternate.child;
  }

  while (index < numberOfElement || alternate) {
    // ?????? virtualDOM ??????
    element = arrifiedChildren[index];

    if (!element && alternate) {
      // ??????
      newFiber = {
        type: alternate.type,
        props: _objectSpread(_objectSpread({}, alternate.type), {}, {
          children: []
        }),
        tag: alternate.tag,
        effects: [],
        effectTag: "delete",
        // ?????? Fiber ????????????????????? (??????, ??????, ??????)
        parent: fiber,
        // ?????? Fiber ????????? Fiber
        alternate: alternate,
        stateNode: alternate.stateNode
      }; // alternate.effectTag = 'delete'
      // fiber.effects.push(alternate)
      // console.log(alternate)
      // prevFiber.sibling = newFiber
      // newFiber = alternate
    } else if (element && alternate) {
      // ??????
      newFiber = {
        type: element.type,
        props: element.props,
        tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.getTag)(element),
        effects: [],
        effectTag: "update",
        // ?????? Fiber ????????????????????? (??????, ??????, ??????)
        parent: fiber,
        // ?????? Fiber ????????? Fiber
        alternate: alternate
      };

      if (element.type === alternate.type) {
        // ????????????
        newFiber.stateNode = alternate.stateNode;
      } else {
        // ?????????
        newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.createStateNode)(newFiber);
      }
    } else if (element && !alternate) {
      // ?????? fiber ?????? ?????????
      newFiber = {
        type: element.type,
        props: element.props,
        tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.getTag)(element),
        effects: [],
        effectTag: "placement",
        // ?????? Fiber ????????????????????? (??????, ??????, ??????)
        parent: fiber // ?????? Fiber ????????? Fiber

      };
      newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.createStateNode)(newFiber);
    }

    if (index === 0) {
      fiber.child = newFiber; // ?????????????????? ??????????????????????????????
    } else if (newFiber) {
      console.log(newFiber.effectTag);
      prevFiber.sibling = newFiber; // ?????? ????????????????????? ??????????????????????????????????????????
    }

    if (alternate && alternate.sibling) {
      alternate = alternate.sibling;
    } else {
      alternate = null;
    }

    prevFiber = newFiber;
    index++;
    newFiber = null;
  }
};

var completeUnitOfWork = function completeUnitOfWork(workInProgressFiber) {
  // 1 jsx parent => p.lastEffect = jsx 
  // 2 p.lastEffect = jsx.nextEffect => p parent => dav.lastEffect = p
  // 3 fiber parent = p.lastEffect = fiber
  // 4 p.lastEffect = fiber 
  // ???????????? Fiber ?????????
  var returnFiber = workInProgressFiber.parent; //div
  // ??????????????????
  // if (returnFiber) { // ok
  //   // ???????????? DOM ??????
  //   if (workInProgressFiber.effectTag) {
  //     if (!returnFiber.lastEffect) {
  //       returnFiber.lastEffect = workInProgressFiber.lastEffect
  //     }
  //     if (!returnFiber.firstEffect) {
  //       returnFiber.firstEffect = workInProgressFiber.firstEffect
  //     }
  //     if (workInProgressFiber.sibling) {
  //       workInProgressFiber.sibling.lastEffect = workInProgressFiber
  //     }
  //     if (returnFiber.lastEffect) {
  //       if (returnFiber.lastEffect.nextEffect) {
  //         returnFiber.lastEffect.nextEffect.nextEffect = workInProgressFiber
  //       } else {
  //         returnFiber.lastEffect.nextEffect = workInProgressFiber
  //       }
  //     } else {
  //       returnFiber.firstEffect = workInProgressFiber
  //     }
  //     returnFiber.lastEffect = workInProgressFiber
  //   }
  // }
  // ??????????????? Fiber ???????????????????????????????????? effect ?????????
  // ??????????????????????????????????????? Fiber??? effect ?????? Fiber

  if (!returnFiber.firstEffect) {
    // first
    returnFiber.firstEffect = workInProgressFiber.firstEffect;
  }

  if (workInProgressFiber.lastEffect) {
    if (returnFiber.lastEffect) {
      // next
      returnFiber.lastEffect.nextEffect = workInProgressFiber.firstEffect;
    } // last


    returnFiber.lastEffect = workInProgressFiber.lastEffect;
  }

  if (returnFiber.lastEffect) {
    returnFiber.lastEffect.nextEffect = workInProgressFiber;
  } else {
    // ??? fiberRoot ?????? firstEffect
    returnFiber.firstEffect = workInProgressFiber;
  } // ??? fiberRoot ?????? lastEffect


  returnFiber.lastEffect = workInProgressFiber; // }
};

var executeTask = function executeTask(fiber) {
  if (fiber.tag === 'class_component') {
    var _fiber$stateNode$__fi;

    if ((_fiber$stateNode$__fi = fiber.stateNode.__fiber) !== null && _fiber$stateNode$__fi !== void 0 && _fiber$stateNode$__fi.partialState) {
      fiber.stateNode.state = _objectSpread(_objectSpread({}, fiber.stateNode.state), fiber.stateNode.__fiber.partialState);
    }

    reconcileChildren(fiber, fiber.stateNode.render()); // ???????????? fiber
  } else if (fiber.tag === 'function_component') {
    reconcileChildren(fiber, fiber.stateNode(fiber.props));
  } else {
    reconcileChildren(fiber, fiber.props.children); // ???????????? fiber
  }

  if (fiber.child) {
    // ????????????????????? ????????????
    return fiber.child;
  }

  var currentExecutelyFiber = fiber;

  while (currentExecutelyFiber.parent) {
    // ??????????????????
    completeUnitOfWork(currentExecutelyFiber);

    if (currentExecutelyFiber.sibling) {
      // ????????????????????? ????????????
      return currentExecutelyFiber.sibling;
    }

    currentExecutelyFiber = currentExecutelyFiber.parent; // ????????????
  }

  pendingCommit = currentExecutelyFiber; // ???????????????
};

var getFirstTask = function getFirstTask() {
  // ???????????????????????????
  var task = taskQueue.pop();
  /**
   * ?????????task????????????
   * setState ???????????????????????????
   */

  if (task.from === 'class_component') {
    var root = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.getRoot)(task.instance); // ?????????

    task.instance.__fiber.partialState = task.partialState;
    return {
      props: root.props,
      // ????????????
      stateNode: root.stateNode,
      // ?????? DOM ?????? | ??????????????????
      tag: 'host_root',
      // ???????????? (???????????????????????? hostRoot || hostComponent || classComponent || functionComponent)
      effects: [],
      // ??????, ????????????????????? fiber ??????
      child: null,
      // ?????? Fiber ????????? Fiber
      alternate: root // Fiber ?????? fiber ???????????????

    };
  } // ????????????????????????fiber??????


  return {
    props: task.props,
    // ????????????
    stateNode: task.dom,
    // ?????? DOM ?????? | ??????????????????
    tag: 'host_root',
    // ???????????? (???????????????????????? hostRoot || hostComponent || classComponent || functionComponent)
    effects: [],
    // ??????, ????????????????????? fiber ??????
    child: null,
    // ?????? Fiber ????????? Fiber
    alternate: task.dom.__rootFiberContainer // Fiber ?????? fiber ???????????????

  };
};

var wookLoop = function wookLoop(deadline) {
  if (!subTask) {
    // ??????????????????
    subTask = getFirstTask(); // ????????????
  }
  /**
   * ????????? ????????????????????? ??????????????????
  */
  //  console.log(deadline.timeRemaining())


  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask); // ?????? ????????????
  }

  if (pendingCommit) {
    // commit ??????
    console.log(pendingCommit);
    commitAllWork(pendingCommit);
  }
};

var performTask = function performTask(deadline) {
  wookLoop(deadline); // ????????????

  /**
   * ????????????????????????
   * ???????????????????????????????????????????????????
   * ??????????????????????????????????????????????????????
   */

  if (subTask || !taskQueue.isEmpty) {
    requestIdleCallback(performTask);
  }
};

var render = function render(element, dom) {
  /**
   * 1. ??????????????????????????????
   * 2. ???????????????????????????????????????
   */

  /**
   * ?????????????????? vdom ?????? ?????? fiber ??????
   */
  taskQueue.push({
    dom: dom,
    // root
    props: {
      children: element
    }
  }); // console.log(taskQueue.pop())

  /**
   * ????????????????????????????????????????????????
   */

  requestIdleCallback(performTask);
};
var scheduleUpdate = function scheduleUpdate(instance, partialState) {
  // setState
  taskQueue.push({
    from: "class_component",
    instance: instance,
    partialState: partialState
  });
  requestIdleCallback(performTask);
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react */ "./src/react/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var root = document.getElementById('root');
var jsx = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", {
  id: "a1"
}, "jsx"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", {
  id: "a2"
}, "fiber")); // render(jsx, root)
// setTimeout(() => {
//     const jsx = (<div>
//         <p>new jsx</p>
//     </div>)
//     render(jsx, root)
// }, 5000);

var Greating = /*#__PURE__*/function (_Component) {
  _inherits(Greating, _Component);

  var _super = _createSuper(Greating);

  function Greating(props) {
    var _this;

    _classCallCheck(this, Greating);

    _this = _super.call(this, props);
    _this.state = {
      name: 'fall'
    };
    return _this;
  }

  _createClass(Greating, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, this.state.name, " class \xA0", /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", {
        onClick: function onClick() {
          return _this2.setState({
            name: 'FALL'
          });
        }
      }, "\u4FEE\u6539"));
    }
  }]);

  return Greating;
}(_react__WEBPACK_IMPORTED_MODULE_0__.Component); // render(<Greating />, root)


function FnComponent(_ref) {
  var title = _ref.title;
  return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, title, " function"), jsx, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(Greating, null));
}

(0,_react__WEBPACK_IMPORTED_MODULE_0__.render)( /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(FnComponent, {
  title: 'title'
}), root);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map