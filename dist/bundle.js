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
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // 元素节点
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
  // 获取节点对应的属性对象
  var newProps = virtualDOM.props || {};
  var oldProps = oldVirtualDOM.props || {};

  if (virtualDOM.type === "text") {
    // 文本节点
    if (newProps.textContent !== oldProps.textContent) {
      // 判断内容是否相等 

      /**
       * 如果父节点类型相同 替换 
       * 不相同 追加
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
   * 属性节点
   */


  Object.keys(newProps).forEach(function (propName) {
    // 获取属性值
    var newPropsValue = newProps[propName];
    var oldPropsValue = oldProps[propName];

    if (newPropsValue !== oldPropsValue) {
      // 判断属性是否是否事件属性 onClick -> click
      if (propName.slice(0, 2) === "on") {
        // 事件名称
        var eventName = propName.toLowerCase().slice(2); // 为元素添加事件

        newElement.addEventListener(eventName, newPropsValue); // 删除原有的事件的事件处理函数

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
  }); // 判断属性被删除的情况

  Object.keys(oldProps).forEach(function (propName) {
    var newPropsValue = newProps[propName];
    var oldPropsValue = oldProps[propName];

    if (!newPropsValue) {
      // 属性被删除了
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
    // 添加
    pop: function pop() {
      return taskQueue.shift();
    },
    // 获取 先进先出
    isEmpty: function isEmpty() {
      return taskQueue.length === 0;
    },
    // 返回是否还有任务
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
var subTask = null; // 任务

var pendingCommit = null; // 待获取的fiber根节点

var commitAllWork = function commitAllWork(fiber) {
  var currentFiber = fiber.firstEffect;

  while (currentFiber) {
    if (currentFiber.tag === 'class_component') {
      currentFiber.stateNode.__fiber = currentFiber;
    }

    if (currentFiber.effectTag === 'placement') {
      // 初始化
      var _fiber = currentFiber;

      if (_fiber.tag === 'host_component') {
        // 只有普通节点 可以appendChild
        var parentFiber = currentFiber.parent;

        while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') {
          // 过滤掉class function
          parentFiber = parentFiber.parent;
        }

        parentFiber.stateNode.appendChild(_fiber.stateNode);
      }
    } else if (currentFiber.effectTag === 'update') {
      // 更新
      if (currentFiber.type === currentFiber.alternate.type) {
        // 节点相同
        (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.updateNodeElement)(currentFiber.stateNode, currentFiber, currentFiber.alternate);
      } else {
        // 不同
        currentFiber.parent.stateNode.replaceChild(currentFiber.stateNode, currentFiber.alternate.stateNode); // 直接替换
      }
    } else if (currentFiber.effectTag === 'delete') {
      debugger; // 删除

      currentFiber.parent.stateNode.removeChild(currentFiber.stateNode);
    }

    currentFiber = currentFiber.nextEffect;
  }
  /**
   * 备份旧 fiber 
   * 备份到 根节点
   */


  fiber.stateNode.__rootFiberContainer = fiber;
};

var reconcileChildren = function reconcileChildren(fiber, children) {
  /**
   * children 可能对象 也可能是数组
   * 将children 转换成数组
   */
  var arrifiedChildren = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.arrified)(children);
  var index = 0; // 索引

  var numberOfElement = arrifiedChildren.length; // children 数组中元素的个数

  var element = null; // 循环过程中的 子节点 virtualDom对象

  var newFiber = null; // 子集 fiber

  var prevFiber = null; // 上一个兄弟 fiber

  var alternate = null; // 备份

  if (fiber.alternate && fiber.alternate.child) {
    // 条件 有备份 && 有子集
    alternate = fiber.alternate.child;
  }

  while (index < numberOfElement || alternate) {
    // 子级 virtualDOM 对象
    element = arrifiedChildren[index];

    if (!element && alternate) {
      // 删除
      newFiber = {
        type: alternate.type,
        props: _objectSpread(_objectSpread({}, alternate.type), {}, {
          children: []
        }),
        tag: alternate.tag,
        effects: [],
        effectTag: "delete",
        // 当前 Fiber 要被执行的操作 (新增, 删除, 修改)
        parent: fiber,
        // 当前 Fiber 的父级 Fiber
        alternate: alternate,
        stateNode: alternate.stateNode
      }; // alternate.effectTag = 'delete'
      // fiber.effects.push(alternate)
      // console.log(alternate)
      // prevFiber.sibling = newFiber
      // newFiber = alternate
    } else if (element && alternate) {
      // 更新
      newFiber = {
        type: element.type,
        props: element.props,
        tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.getTag)(element),
        effects: [],
        effectTag: "update",
        // 当前 Fiber 要被执行的操作 (新增, 删除, 修改)
        parent: fiber,
        // 当前 Fiber 的父级 Fiber
        alternate: alternate
      };

      if (element.type === alternate.type) {
        // 类型相同
        newFiber.stateNode = alternate.stateNode;
      } else {
        // 不相同
        newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.createStateNode)(newFiber);
      }
    } else if (element && !alternate) {
      // 子级 fiber 对象 初始化
      newFiber = {
        type: element.type,
        props: element.props,
        tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.getTag)(element),
        effects: [],
        effectTag: "placement",
        // 当前 Fiber 要被执行的操作 (新增, 删除, 修改)
        parent: fiber // 当前 Fiber 的父级 Fiber

      };
      newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.createStateNode)(newFiber);
    }

    if (index === 0) {
      fiber.child = newFiber; // 第一个子节点 设置为父节点的子节点
    } else if (newFiber) {
      console.log(newFiber.effectTag);
      prevFiber.sibling = newFiber; // 第二 。。。个子节点 设置为上一个子节点的兄弟节点
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
  // 获取当前 Fiber 的父级
  var returnFiber = workInProgressFiber.parent; //div
  // 父级是否存在
  // if (returnFiber) { // ok
  //   // 需要执行 DOM 操作
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
  // 将子树和此 Fiber 的所有副作用附加到父级的 effect 列表上
  // 以下两个判断的作用是搜集子 Fiber的 effect 到父 Fiber

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
    // 为 fiberRoot 添加 firstEffect
    returnFiber.firstEffect = workInProgressFiber;
  } // 为 fiberRoot 添加 lastEffect


  returnFiber.lastEffect = workInProgressFiber; // }
};

var executeTask = function executeTask(fiber) {
  if (fiber.tag === 'class_component') {
    var _fiber$stateNode$__fi;

    if ((_fiber$stateNode$__fi = fiber.stateNode.__fiber) !== null && _fiber$stateNode$__fi !== void 0 && _fiber$stateNode$__fi.partialState) {
      fiber.stateNode.state = _objectSpread(_objectSpread({}, fiber.stateNode.state), fiber.stateNode.__fiber.partialState);
    }

    reconcileChildren(fiber, fiber.stateNode.render()); // 构建子集 fiber
  } else if (fiber.tag === 'function_component') {
    reconcileChildren(fiber, fiber.stateNode(fiber.props));
  } else {
    reconcileChildren(fiber, fiber.props.children); // 构建子集 fiber
  }

  if (fiber.child) {
    // 判断是否有子集 返回子集
    return fiber.child;
  }

  var currentExecutelyFiber = fiber;

  while (currentExecutelyFiber.parent) {
    // 循环获取父级
    completeUnitOfWork(currentExecutelyFiber);

    if (currentExecutelyFiber.sibling) {
      // 判断是否有同集 返回同集
      return currentExecutelyFiber.sibling;
    }

    currentExecutelyFiber = currentExecutelyFiber.parent; // 获取父级
  }

  pendingCommit = currentExecutelyFiber; // 获取最顶层
};

var getFirstTask = function getFirstTask() {
  // 从任务队列获取任务
  var task = taskQueue.pop();
  /**
   * 初始化task为根节点
   * setState 需要手动获取根节点
   */

  if (task.from === 'class_component') {
    var root = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.getRoot)(task.instance); // 根节点

    task.instance.__fiber.partialState = task.partialState;
    return {
      props: root.props,
      // 节点属性
      stateNode: root.stateNode,
      // 节点 DOM 对象 | 组件实例对象
      tag: 'host_root',
      // 节点标记 (对具体类型的分类 hostRoot || hostComponent || classComponent || functionComponent)
      effects: [],
      // 数组, 存储需要更改的 fiber 对象
      child: null,
      // 当前 Fiber 的子级 Fiber
      alternate: root // Fiber 备份 fiber 比对时使用

    };
  } // 返回最外层节点的fiber对象


  return {
    props: task.props,
    // 节点属性
    stateNode: task.dom,
    // 节点 DOM 对象 | 组件实例对象
    tag: 'host_root',
    // 节点标记 (对具体类型的分类 hostRoot || hostComponent || classComponent || functionComponent)
    effects: [],
    // 数组, 存储需要更改的 fiber 对象
    child: null,
    // 当前 Fiber 的子级 Fiber
    alternate: task.dom.__rootFiberContainer // Fiber 备份 fiber 比对时使用

  };
};

var wookLoop = function wookLoop(deadline) {
  if (!subTask) {
    // 判断有无任务
    subTask = getFirstTask(); // 获取任务
  }
  /**
   * 有任务 并且有空余时间 循环执行任务
  */
  //  console.log(deadline.timeRemaining())


  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask); // 执行 重新赋值
  }

  if (pendingCommit) {
    // commit 阶段
    console.log(pendingCommit);
    commitAllWork(pendingCommit);
  }
};

var performTask = function performTask(deadline) {
  wookLoop(deadline); // 执行任务

  /**
   * 判断任务是否存在
   * 判断任务队列中是否还有任务没有执行
   * 再一次告诉浏览器在空闲的时间执行任务
   */

  if (subTask || !taskQueue.isEmpty) {
    requestIdleCallback(performTask);
  }
};

var render = function render(element, dom) {
  /**
   * 1. 向任务队列中添加任务
   * 2. 指定在浏览器空闲时执行任务
   */

  /**
   * 任务就是通过 vdom 对象 构建 fiber 对象
   */
  taskQueue.push({
    dom: dom,
    // root
    props: {
      children: element
    }
  }); // console.log(taskQueue.pop())

  /**
   * 指定在浏览器空闲的时间去执行任务
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