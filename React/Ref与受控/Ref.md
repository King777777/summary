# Ref & 非受控组件

## Ref

在React的典型数据流中，props是父子组件交互的唯一方式，要修改一个子组件，可以用新的props来重新渲染它，但是某些情况下，我们**需要在典型数据流之外强制修改子组件**，被修改的子组件可能是一个React组件的实例，也可能是一个DOM元素，React提供的ref属性都能做到

### 何时使用 Refs

下面是几个适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。
- 需要绕过典型数据流时

### 勿过度使用ref

**避免使用 refs 来做任何可以通过声明式实现来完成的事情。**

举个例子，避免在 `Dialog` 组件里暴露 `open()` 和 `close()` 方法，最好props传递 `isOpen` 属性。

好好思考下state属性应该被安排在哪个组件层中，通常情况下典型数据流还是首选。

### 创建ref

#### React.createRef()

> 注意
>
> 下面的例子已经更新为使用在 React 16.3 版本引入的 `React.createRef()` API。如果你正在使用一个较早版本的 React，我们推荐你使用[回调形式的 refs](https://react.docschina.org/docs/refs-and-the-dom.html?#callback-refs)。

ref是使用`React.createRef()创建的`，并通过`ref`属性附加到React元素上，在构造组件时，通常将ref分配给实例属性，以便可以在整个组件中引用他们

~~~js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
      // 使用React.createRef()创建一个ref出来，并赋值给对象的实例属性myRef
    this.myRef = React.createRef();
  }
  render() {
      // 在React中，元素默认有ref属性（类似的还有key），之后就可以用this.myRef来操作这个React元素
    return <div ref={this.myRef} />;
  }
}
~~~

#### 回调Ref

React 也支持另一种设置 refs 的方式，称为“回调 refs”。它能助你更精细地控制何时 refs 被设置和解除。

不同于传递 `createRef()` 创建的 `ref` 属性，**你会传递一个函数。这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问**。

下面的例子描述了一个通用的范例：使用 `ref` 回调函数，在实例的属性中存储对 DOM 节点的引用。

~~~js
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.focusTextInput = () => {
      // 使用原生 DOM API 使 text 输入框获得焦点
        //注意，回调形式的没有current属性
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    this.focusTextInput();
  }

  render() {
    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
    // 实例上（比如 this.textInput）
    return (
      <div>
        <input
          type="text"
          ref={ elementRef => { this.textInput = elementRef;}}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
~~~

你可以在组件间传递回调形式的 refs，就像你可以传递通过 `React.createRef()` 创建的对象 refs 一样。

```js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}      />
    );
  }
}
```

在上面的例子中，`Parent` 把它的 refs 回调函数当作 `inputRef` props 传递给了 `CustomTextInput`，而且 `CustomTextInput` 把相同的函数作为特殊的 `ref` 属性传递给了 `<input>`。结果是，在 `Parent` 中的 `this.inputElement` 会被设置为与 `CustomTextInput` 中的 `input` 元素相对应的 DOM 节点。

**总之就是爷孙之间的ref传递，爷爷把自己的ref传给孙子，这样他就可以访问自己的孙子了，**

下面是createRef，爷爷访问孙子dom的例子

~~~js
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.textInput.current.focus();
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
      // 孙子input的ref属性获得爷爷的parentRef，然后爷爷就可以用parentRef控制他了！
    return (
      <div>
      <input
          type="text"
          ref={this.props.parentRef} />
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.parentRef = React.createRef();
  }

  componentDidMount() {
    // this.textInput.current.focusTextInput();
    this.parentRef.current.focus();
    console.log("?")
  }

  render() { 
    return (
      <CustomTextInput ref={this.textInput} parentRef={this.parentRef} />
    );
  }
}

ReactDOM.render(<AutoFocusTextInput />, mountNode);
~~~



#### 不同点

如果仔细看上面代码，并运行的话，就会发现

**通过React.createRef()创建的ref需要用current属性取访问DOM或组件实例**

**通过回调形式的ref，直接使用ref就可以访问DOM或组件实例**

### 访问React.createRef创建的ref

当ref被传递给`render`中的元素时，对该节点的引用可以用`ref的current`属性访问

**ref的值根据节点的类型而不同**

1. ref作用HTML元素，React.createRef()创建的myRef接受底层DOM元素作为其current属性
2. ref作用于class组件时，React.createRef()创建的myRef接受组件的实例作为current属性
3. **不能再函数组件上使用ref属性，因为他们没有实例**

#### 为DOM元素添加ref

以下代码使用 ref 来存储DOM节点的引用

~~~js
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "this.textInput.current" 来访问 DOM 节点
    this.textInput.current.focus();
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 这个ref上
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
~~~

初始

![image-20220224140906784](https://gitee.com/lwq1229/picture/raw/master/img/image-20220224140906784.png)

点击button后，可见我们成功使用ref来操作了DOM元素，使其调用了focus()方法聚焦

![image-20220224140931033](https://gitee.com/lwq1229/picture/raw/master/img/image-20220224140931033.png)

React 会在组件挂载时给 `current` 属性传入 DOM 元素，并在组件卸载时传入 `null` 值。`ref` 会在 `componentDidMount` 或 `componentDidUpdate` 生命周期钩子触发前更新。

附一张v16的生命周期图

#### ![image-20220224142034368](https://gitee.com/lwq1229/picture/raw/master/img/image-20220224142034368.png)

#### 为class组件添加ref

请注意，这仅在 `CustomTextInput` 声明为 class 时才有效：

如果我们想包装上面的 `CustomTextInput`，来模拟它挂载之后立即被点击的操作，我们可以使用 ref 来获取这个自定义的 input 组件并手动调用它的 `focusTextInput` 方法：

~~~js
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
      // 首先创建一个textInput这个ref用来赋值给子组件的ref属性，这样就可以访问子组件所有实例方法
    this.textInput = React.createRef();
  }

  componentDidMount() {
      // 组件加载好后，通过this.textInput.current来操作CustomTextInput的实例，直接调用它的实例方法focusTextInput()，这样就做到组件一挂载就聚焦了
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
~~~

#### ref和函数组件

默认情况下，函数组件上不能使用ref属性，因为他们没有实例

~~~js
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // This will *not* work!
    return (
        // 像这样，MyFunctionComponent是一个函数组件，你给他的ref属性赋值，没用！！！
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}
~~~



如果非要在函数组件上使用ref，你可以使用 [`forwardRef`](https://react.docschina.org/docs/forwarding-refs.html)（可与 [`useImperativeHandle`](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle) 结合使用），或者可以将该组件转化为 class 组件。（ref转发新开一篇）

无论如何，**你都可以在函数组件内部使用ref，只要它指向一个DOM或class组件，方式是useRef()**

~~~js

function CustomTextInput(props) {
  // 这里必须声明 textInput，这样 ref 才可以引用它
  const textInput = useRef(null);

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      // 在函数组件内部使用是完全ok的，只不过创建ref方式是用useRef(null)
      <input
        type="text"
        ref={textInput} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}
~~~





## 受控组件

在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）之类的表单元素通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 [`setState()`](https://react.docschina.org/docs/react-component.html#setstate)来更新。

我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

就是表单的value值取state变量，在表单触发onChange事件的时候，获取它的value，并通过setState，设置表单的value值，使之受控。

例如，如果我们想让前一个示例在提交时打印出名称，我们可以将表单写为受控组件：

~~~js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
~~~

由于在表单元素上设置了 `value` 属性，因此显示的值将始终为 `this.state.value`，这使得 React 的 state 成为唯一数据源。由于 `handlechange` 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。

对于受控组件来说，输入的值始终由 React 的 state 驱动。你也可以将 value 传递给其他 UI 元素，或者通过其他事件处理函数重置，但这意味着你需要编写更多的代码。



## 非受控组件

在大多数情况下，我们推荐使用 [受控组件](https://react.docschina.org/docs/forms.html#controlled-components) 来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的。另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。**其实像平时开发Form表单的时候，大多数情况下，我们都没有对表单项进行受控，最后是通过form.validateFieldAndScroll()来获取表单内容的，当然也可以改成受控的（没必要），如果涉及到增删，使用受控倒是可行**

要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以 [使用 ref](https://react.docschina.org/docs/refs-and-the-dom.html) 来从 DOM 节点中获取表单数据。

例如，下面的代码使用非受控组件接受一个表单的值：

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();  }

  handleSubmit(event) {
      // 这里this.input.current就是指向DOM元素，这里就是HTMLInputElement,它有一个value属性，记录表单值
    alert('A name was submitted: ' + this.input.current.value);    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

因为**非受控组件将真实数据储存在 DOM 节点中**，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。

如果你还是不清楚在某个特殊场景中应该使用哪种组件，那么 [这篇关于受控和非受控输入组件的文章](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/) 会很有帮助。

非受控组件看似简化了操作表单元素的过程，但这种方式破坏了 

React对组件状态管理的一致性，往往容易出现不容易排查的问题，因此非特殊情况下，不建议大家使用。

~~~js
  handleTableRemoveLine = (field, index) => {
    const { form } = this.props;
    const datas = form.getFieldValue(field);
    const { length } = datas;
    datas.splice(index, 1);
    this.setState({ [field]: datas });

    const resetFileds = [];
    for (let i = exceptNum; i < length; i += 1) {
      resetFileds.push(`${field}[${i}]`);
    }
    form.resetFields(resetFileds);
  };
~~~



## 遇到的一个用Ref的场景

通过ref来强制弹出modal，而不用在父组件内setState

场景，点击流程图节点，会弹出该节点的信息，但是如果有setState会刷新图，也就导致没有节点被选中，而导致节点信息变成空白，

解决方法，我知道的一个，就是通过ref

~~~js
  <ComponentInfoModal
          ref={ref => (this.componentInfoModal = ref)}
          componentInfoVisible={componentInfoVisible}
          componentInfo={componentInfo}
          onCancel={() => {
            this.setState({ componentInfoVisible: false });
          }}
        />
~~~

然后用this.componentInfoModal来调ComponentInfoModal的changeVisible方法即可，这是setState是发生在子组件内部的，不会影响父组件

**通过Ref来绕过单向数据流的方式操作组件，或者使用子组件来避免走父组件生命周期的更新，是制霸流程编排的重要法宝！**