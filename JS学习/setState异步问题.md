# setState的异步

先看下官网的描述

![image-20220616103926599](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/imgimage-20220616103926599.png)

为什么说是 **可能** 呢，因为在不同场景下setState有时表现为同步有时表现为“异步”(带引号，跟promise，setTimeout的异步有区别，表现的像异步)。

先说结论: **在生命周期函数和合成事件中使用setState表现为异步，在原生事件和setTimeout中表现为同步**

## 异步表现

### 1.在生命周期函数中

单选，非必填的改成了单选，必填，不初始化查询，其他没变

~~~jsx

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Button } from 'antd';
class App extends Component {
  state = {
      count: 0
  }
  componentDidMount() {
    this.setState({count: 1})
    console.log(this.state.count) // 0
  }
  render() {
      return (
          <div>App
              <h2>{this.state.count}</h2>
          </div>
      )
  }
}
ReactDOM.render(
 <App />,
  document.getElementById('container'),
);
          
~~~

![image-20220616110145229](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/imgimage-20220616110145229.png)

在生命周期函数中，我们更新了count值为1，然后打印this.state.count却输出0，可见在生命周期函数中使用setState表现为异步更新

### 2.在合成事件中

~~~jsx

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
class App extends Component {
  state = {
      count: 0
  }
  render() {
      return (
          <div>App
              <h2>{this.state.count}</h2>
              <button onClick={this.change}>change</button>
          </div>
      )
  }
  // setState继承自Component
  change = () => {
      this.setState({count: 1})
      console.log(this.state.count) // 0
  }
}
ReactDOM.render(
 <App />,
  document.getElementById('container'),
);
~~~

![image-20220616110654556](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/imgimage-20220616110654556.png)

点击change，console打印出0，可见react的合成事件中setState也表现为异步

## 同步表现

### 1.在setTimeout中

~~~jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Button } from 'antd';
class App extends Component {
  state = {
      count: 0
  }
  componentDidMount() {
    setTimeout(()=> {
      this.setState({count: 1})
      console.log(this.state.count) // 1
    })
  }
  render() {
      return (
          <div>App
              <h2>{this.state.count}</h2>
          </div>
      )
  }
}
ReactDOM.render(
 <App />,
  document.getElementById('container'),
);
~~~

![image-20220616110954931](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/imgimage-20220616110954931.png)

我们在setTimeout中更新count的值，然后立刻输出，可见count输出为1，count的更新表现为同步

### 2.在原生事件中

~~~jsx

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
class App extends Component {
  state = {
      count: 0
  }
  componentDidMount(){
    const button = document.querySelector('button');
  // 在原生和合成事件中点击事件拼写不同
      button.onclick = ()=> {
      this.setState({count: 1});
      console.log(this.state.count); //输出1 
    }
  }
  render() {
      return (
          <div>App
              <h2>{this.state.count}</h2>
              <button>change</button>
          </div>
      )
  }
}
ReactDOM.render(
 <App />,
  document.getElementById('container'),
);
~~~

![image-20220616112258773](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/imgimage-20220616112258773.png)

可见，在原生事件中，更新state表现为同步更新

## 原因

~~~js
function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  if (lane === SyncLane) {
    // 同步操作
    ensureRootIsScheduled(root, eventTime);
    // 判断当前是否还在 React 事件流中
    // 如果不在，直接调用 flushSyncCallbackQueue 更新
    if (executionContext === NoContext) {
      flushSyncCallbackQueue();
    }
  } else {
    // 异步操作
  }
}
~~~

