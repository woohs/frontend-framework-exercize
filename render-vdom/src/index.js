/* eslint-disable react/react-in-jsx-scope */

/* global render, vdom */

// 直接引用vdom数据渲染
// render(vdom, document.getElementById("root"));

// 使用jsx渲染，需要babel转义
const jsx = (
  <ul className='list'>
    <li
      className='item'
      style={{ background: "blue", color: "pink" }}
      onClick={() => alert(2)}
    >
      aaa
    </li>
    <li className='item'>bbbb</li>
    <li className='item'>cccc</li>
  </ul>
);

render(jsx, document.getElementById("root"));
