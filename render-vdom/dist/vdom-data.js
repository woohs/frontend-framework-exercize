// vdom 数据结构
// 使用jsx + babel后不需要引用该文件
const vdom = {
  type: "ul",
  props: {
    className: "list"
  },
  children: [{
    type: "li",
    props: {
      className: "item",
      style: {
        background: "blue",
        color: "#fff"
      },
      onClick: function () {
        alert(1);
      }
    },
    children: ["aaaa"]
  }, {
    type: "li",
    props: {
      className: "item"
    },
    children: ["bbbbddd"]
  }, {
    type: "li",
    props: {
      className: "item"
    },
    children: ["cccc"]
  }]
};