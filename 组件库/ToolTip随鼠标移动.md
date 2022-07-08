ToolTip随鼠标移动

~~~jsx

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Tooltip } from 'antd';

class A extends Component {
  state = {
    toolVisible: false,
  }
  render() {
    const {toolVisible} = this.state;
    return (
      <Tooltip title="prompt text" placement="bottomLeft"
      visible={toolVisible}
       //下面这个设置为true鼠标移开后会闪回bottomLeft
      //destroyTooltipOnHide={true}
      
    >
      <p 
      onMouseOver={()=> this.setState({toolVisible: true})}
      onMouseOut={()=> this.setState({toolVisible: false})}
      onMouseMove={e=>{
        let tipRef = document.getElementsByClassName("ant-tooltip-placement-bottomLeft")[0];
        if(tipRef){
          tipRef.setAttribute("style",`left: ${e.clientX + 5}px; top: ${e.clientY + 15}px; transform-origin: 0px -4px; pointer-events: none`)
        }
      }}
      >Tooltip will show on mouse enter.</p>
    </Tooltip>
    )
  }
}

ReactDOM.render(
 <A />,
  document.getElementById('container'),
);
          
~~~

