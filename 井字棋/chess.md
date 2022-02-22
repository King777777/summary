# 井字棋

井字棋是react官网上的一个入门教程，之前学习react就直接去看文档了，某天闲着没事看了下官网的这个井字棋教程，感觉它这个还是蕴含了值得学习的地方，正好也在学习hooks使用，就用hooks复现了一下。下面说下其中的过程以及学习到的思想。

先来看下最后的结果长啥样

![image-20220222231958254](https://gitee.com/lwq1229/picture/raw/master/img/image-20220222231958254.png)

## 组合

`React有非常强大的组合模式，在开发中，推荐使用组合而非基础实现组件间的代码重用`

首先要做的就是组件的拆分

- Game，最外层组件，其中包含Board和历史信息（这里历史信息也是可以拆出来）
- Board，井字棋面板组件
- Square，井字棋每个格子的组件

## 状态提升

首先明确的是，我们必须通过点击每个格子才能修改格子里显示 `x` 或`O`,这个state先暂定是在Square组件中的，但是这样会导致一个问题，就是我们要判断胜负，需要9个格子的state状态，这就需要 **状态提升**，官网讲解如下

**当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，需要把子组件的 state 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中所有组件的状态数据就能够更方便地同步共享了。**

所以就把所有9个格子的状态提升到Board，组成一个数组

`const [matrix, setMatrix] = useState(Array(9).fill(null));`

**在子组件中如何修改父组件的state？**，**对于状态提升，通过父组件向子组件传递一个函数，然后子组件通过props传来的函数来修改父组件的state**

接下来，我们要修改一下 Square 的点击事件监听函数。Board 组件当前维护了那些已经被填充了的方格。我们需要想办法让 Square 去更新 Board 的 state。由于 state 对于每个组件来说是私有的，因此我们不能直接通过 Square 来更新 Board 的 state。

相反，**从 Board 组件向 Square 组件传递一个函数，当 Square 被点击的时候，这个函数就会被调用**。接着，我们将 Board 组件的 `renderSquare` 方法改写为如下效果：

## 不可变性

~~~js
  const newMatrix = matrix.slice();
~~~

上面代码，我们使用数组的slice方法创建一个副本，

一般来说，改变数据的方式，一种直接修改变量的值，第二种使用新的变量，

~~~js
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// player 的值没有改变, 但是 newPlayer 的值是 {score: 2, name: 'Jeff'}

// 使用对象展开语法，就可以写成：
// var newPlayer = {...player, score: 2};
~~~



### 简化复杂的功能

不可变性使得复杂特性更容易实现，比如在井字棋中，我们后续会添加历史记录的功能，并且跳回之前的步骤，这样的需求随处可见，比如撤销和恢复等等，不直接在源数据上修改可以帮助我们追溯历史记录

### 跟踪数据改变

如果直接修改数据，难么就很难追踪数据的改变，跟踪不可变对象就相对简单多了，如果一个对象变成了一个新的对象，那么就可以说对象改变了

### 确定在React中何时重新渲染

不可变性最主要的优势在于它可以帮助我们在 React 中创建 *pure components*。我们可以很轻松的确定不可变数据是否发生了改变，从而确定何时对组件进行重新渲染。**这部分还不是很懂，后续有待调研**

## 轮流落子

可以在Board中新增一个state 变量来确定Square的状态改成`X`或`O`

下面是到这一步的代码

Game

~~~js
import React, { useState } from 'react';
import './game.css';
import Board from '@/pages/Game/Board';

export default function Game() {
  return (
    <div>
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info" />
      </div>
    </div>
  );
}


~~~

Board

```js
import React, { useState } from 'react';
import './game.css';
import Square from '@/pages/Game/Square';

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [matrix, setMatrix] = useState(Array(9).fill(null));
    // handleClick是个箭头函数, 通过参数i（数组索引）来更新数组对应项，然后更新matrix这个state，引起渲染
  const handleClick = (i) => {
    const newMatrix = matrix.slice();
    newMatrix[i] = xIsNext ? 'X' : 'O';
    setMatrix(newMatrix);
    setXIsNext(!xIsNext);
  };
  const renderSquare = (i) => {
    return <Square value={matrix[i]} xIsNext={xIsNext} handleClick={() => handleClick(i)} />;
  };
  return (
    <>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>);
}
```

Square

```js
import React from 'react';
import './game.css';

export default function Square(props) {
  const { value } = props;
  return (
    <button className="square" onClick={props.handleClick}>
      {value}
    </button>
  );
}
```

css

```css
body {
  font: 14px "Century Gothic", Futura, sans-serif;
  margin: 20px;
}

ol, ul {
  padding-left: 30px;
}

.board-row:after {
  clear: both;
  content: "";
  display: table;
}

.status {
  margin-bottom: 10px;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}



.kbd-navigation .square:focus {
  background: #ddd;
}

.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}
```

## 判断胜利

这个计算方式也很好理解，因为井字棋胜利就8种情况，满足其中一种就算胜利

```js
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```
