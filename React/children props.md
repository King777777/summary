# React组合

children props，**使用children props组合组件而非在父组件中耦合**；

看下面这段代码：

~~~js
import { Modal, Button } from 'antd';

class App extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
~~~



一般都会把Modal组件拆出来，然后再App组件中组合使用，但是我之前总是这样做的：

Button还是放在App这个父组件中，然后Modal的visible这个状态提到父组件App中，点击Button更改App中的visible, 然后利用props传给Modal,这样写真的太差了，首先就是耦合太高，复用性太差，代码不优雅。

所以应该变成这样，把Button通过children props传给Modal组件，然后Click，visible这个都交给Modal内部管理

又或者，全都再MyModal里面写，不用children props

如下

~~~js
import { Modal, Button } from 'antd';

class App extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <MyModal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         <Button type="primary">
          Open Modal
        </Button>
        </MyModal>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
~~~

MyModal.js

~~~js
const MyModal = (props) => {
    const getBtn = ()=>{返回按钮}
    return (
     <>
      getBtn();
        <Modal></Modal>
     </>
    )
}
~~~

