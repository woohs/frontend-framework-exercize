// render 核心代码
const render = (vdom, parent = null) => {
  const mount = parent ? el => parent.appendChild(el) : el => el;
  if (isTextVdom(vdom)) {
    return mount(document.createTextNode(vdom));
  } else if (isElementVdom(vdom)) {
    const dom = mount(document.createElement(vdom.type));
    // 拍平children数组
    for (const child of [].concat(...vdom.children)) {
      render(child, dom);
    }
    for (const prop in vdom.props) {
      setAttribute(dom, prop, vdom.props[prop]);
    }
    return dom;
  } else if (isComponentVdom(vdom)) {
    const props = Object.assign({}, vdom.props, {
      children: vdom.children
    });

    const fn = vdom.type;

    // 判断是否类组件
    // eslint-disable-next-line no-prototype-builtins
    if (Component.isPrototypeOf(fn)) {
      const instance = new fn(props);
      instance.componentWillMount();
      const componentVdom = instance.render();
      instance.dom = render(componentVdom, parent);
      instance.componentDidMount();
      return instance.dom;
    }

    const componentVdom = fn(props);
    return render(componentVdom, parent);
  } else {
    throw new Error(`Invalid VDOM: ${JSON.stringify(vdom)}.`);
  }
};

const createElement = (type, props, ...children) => {
  if (props === null) props = {};
  return {
    type,
    props,
    children
  };
};

const setAttribute = (dom, key, value) => {
  if (isEventListenerAttr(key, value)) {
    const eventType = key.slice(2).toLowerCase();
    dom.addEventListener(eventType, value);
  } else if (isStyleAttr(key, value)) {
    Object.assign(dom.style, value);
  } else if (isPlainAttr(key, value)) {
    dom.setAttribute(key, value);
  }
};

// 类组件原型
class Component {
  constructor(props) {
    this.props = props || {};
    this.state = null;
  }

  setState(nextState) {
    this.state = nextState;
  }

  componentWillMount() {
    return undefined;
  }

  componentDidMount() {
    return undefined;
  }
}

function isTextVdom(vdom) {
  return typeof vdom === "string" || typeof vdom === "number";
}

function isElementVdom(vdom) {
  return typeof vdom === "object" && typeof vdom.type === "string";
}

function isComponentVdom(vdom) {
  return typeof vdom.type === "function";
}

function isEventListenerAttr(key, value) {
  return typeof value == "function" && key.startsWith("on");
}

function isStyleAttr(key, value) {
  return key == "style" && typeof value == "object";
}

function isPlainAttr(key, value) {
  return typeof value != "object" && typeof value != "function";
}
