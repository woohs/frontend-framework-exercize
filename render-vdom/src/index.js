/* eslint-disable react/react-in-jsx-scope */

/* global render, vdom, createElement, Component */

// 直接引用vdom数据渲染
// render(vdom, document.getElementById("root"));

function Item(props) {
  return (
    <li className='item' style={props.style} onClick={props.onClick}>
      {props.children}
    </li>
  );
}

class List extends Component {
  constructor(props) {
    super();
    this.state = {
      list: [
        {
          text: "aaa",
          color: "blue"
        },
        {
          text: "bbb",
          color: "orange"
        },
        {
          text: "ccc",
          color: "red"
        }
      ],
      textColor: props.textColor
    };
  }

  render() {
    return (
      <ul className='list'>
        {this.state.list.map((item, index) => {
          return (
            <Item
              key={index}
              style={{ background: item.color, color: this.state.textColor }}
              onClick={() => alert(item.text)}
            >
              {item.text}
            </Item>
          );
        })}
      </ul>
    );
  }
}

const list = [
  {
    text: "aaa",
    color: "blue"
  },
  {
    text: "ccc",
    color: "orange"
  },
  {
    text: "ddd",
    color: "red"
  }
];

// const jsx = (
//   <ul>
//     {list.map(item => (
//       <li className='item' key={item}>
//         {item}
//       </li>
//     ))}
//   </ul>
// );

// 使用jsx渲染，需要babel转义
// const jsx = (
//   <ul className='list'>
//     <li
//       className='item'
//       style={{ background: "blue", color: "pink" }}
//       onClick={() => alert(2)}
//     >
//       aaa
//     </li>
//     <li className='item'>bbbb</li>
//     <li className='item'>cccc</li>
//   </ul>
// );

render(<List list={list} />, document.getElementById("root"));
