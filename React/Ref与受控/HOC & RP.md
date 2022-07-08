# HOC & R/CP

## render props

为什么叫`render props`,因为它使用一个值为函数(该函数将会返回一个React元素)的prop在React组件之间传递，而这个prop叫`render`

简单例子如下，在子组件中使用就是`this.props.render(data)`

就是父组件告诉子组件，你要渲染成我想要的样子

~~~js
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
~~~

使用这种方式的著名的库有`React Router`和`Downshift`

### 何时使用

**在交叉关注点使用render props**

组件在React是主要的代码复用单元，但如何共享状态或者一个组件的行为封装到其他需要相同状态的组件种并不是很明了

例如，下面的组件在web应用中追踪鼠标位置

~~~js

import React from 'react';
import ReactDOM from 'react-dom';

class MouseTracker extends React.Component {
  constructor(props){
    super(props);
    this.state={
      x: 0,
      y: 0
    }
  }
  handleMove = (e) => {
    this.setState({x: e.clientX, y: e.clientY});
  }
  render(){
    const {x, y} = this.state;
    return <div style={{height: "100vh"}} onMouseMove={this.handleMove}>
      <h1>鼠标地址</h1>
      <p>x:{x}, y:{y}</p>
      </div>
  }
}

ReactDOM.render(<MouseTracker />, document.getElementById('container'));
~~~

我们上面的这个组件，能够获取鼠标的位置并显示出来，但是现在有个问题，如果现在有另外一个组件，也想要知道鼠标的位置，能否封装上面这个组件以让复用？

比如，现在有个需求我们要在屏幕上跟随鼠标渲染一张猫的图片，基于上面的代码，我们第一时间可能都会这么写

~~~js

import React from 'react';
import ReactDOM from 'react-dom';
function Cat(props){
  return <img src='https://img0.baidu.com/it/u=1699717473,2542878443&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=659' 
        style={{position: 'absolute', left: props.mousePosition.x, top: props.mousePosition.y, width: 50, height: 50}} />
};

class MouseTracker extends React.Component {
  constructor(props){
    super(props);
    this.state={
      x: 0,
      y: 0
    }
  }
  handleMove = (e) => {
    this.setState({x: e.clientX, y: e.clientY});
  }
  render(){
    const {x, y} = this.state;
    return <div style={{height: "100vh"}} onMouseMove={this.handleMove}>
      <h1>鼠标地址</h1>
      <p>x:{x}, y:{y}</p>
      <Cat mousePosition={{x, y}}/>
      </div>
  }
}

ReactDOM.render(<MouseTracker />, document.getElementById('container'));
~~~

但是如果有另外一个组件也想要获取鼠标位置，我们不得不



## chilren props