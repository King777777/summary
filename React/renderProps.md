# HOC & R/CP

render

## render prop

为什么叫`render props`,因为它使用一个**值为函数(该函数将会返回一个React元素)的prop**在React组件之间传递，而这个prop叫`render`

简单例子如下，在子组件中使用就是`this.props.render(data)`

就是父组件告诉子组件，你要渲染成我想要的样子

~~~js
// 子组件中调用props的render函数，渲染父组件想要的样子
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
~~~

使用这种方式的著名的库有`React Router`和`Downshift`

### 何时使用

**在横切关注点使用render props**

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

现在的问题是：如何在另一个组件中复用这个行为？现在尝试重构一部分代码使其能够在`<Mouse>`组件中封装我们需要共享的行为

~~~js
// <Mouse> 组件封装了我们需要的行为...
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/* ...但我们如何渲染 <p> 以外的东西? */}
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <>
        <h1>移动鼠标!</h1>
        <Mouse />
      </>
    );
  }
}
~~~



现在这个`<Mouse>`组件封装了所有关于监听mousemove事件和存储鼠标坐标的行为，但它不是真正的可复用。

举个例子，

我们上面的这个组件，能够获取鼠标的位置并显示出来，但是现在有个问题，如果现在有另外一个组件，也想要知道鼠标的位置，能否封装上面这个组件以让复用？

比如，现在有个需求我们要在屏幕上跟随鼠标渲染一张猫的图片，基于上面的代码，我们第一时间都会这么写

~~~js
import React from 'react';
import ReactDOM from 'react-dom';
// <Mouse> 组件封装了我们需要的行为...
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src='https://img0.baidu.com/it/u=1699717473,2542878443&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=659' style={{ position: 'absolute', left: mouse.x, top: mouse.y, width:50,height:50 }} />
    );
  }
}

class MouseWithCat extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          我们可以在这里换掉 <p> 的 <Cat>   ......
          但是接着我们需要创建一个单独的 <MouseWithSomethingElse>
          每次我们需要使用它时，<MouseWithCat> 是不是真的可以重复使用.
        */}
        <Cat mouse={this.state} />
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <MouseWithCat />
      </div>
    );
  }
}

ReactDOM.render(<MouseTracker />, document.getElementById('container'));
~~~

这种方法适用于特定的用例，没有做到组件的复用，本质上我们创建了一个新的组件`<MouseWithCat>`。

这也是render prop的来历：**我们可以提供一个值为函数的prop给Mouse组件，它能动态决定什么需要渲染，而不是在Mouse组件里硬编码一个Cat组件，render prop能有效地改变它的渲染结果**

~~~js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
        这里不再硬编码一个Cat组件，而是使用render prop来动态地渲染内容
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        // 这里提供给Mouse组件的render prop是个函数，它接受一个mouse变量，然后返回一个Cat组件，这个Cat组件的mouse prop就是render prop函数的入参，所以子组件渲染的内容能够动态变化
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
~~~

现在，我们提供了一个 `render` 方法 让 `<Mouse>` 能够动态决定什么需要渲染，而不是复制`<Mouse>` 组件然后硬编码来解决特定的用例。

更具体地说，**render prop 是一个用于告知组件需要渲染什么内容的函数 prop。**

这项技术使我们共享行为非常容易。要获得这个行为，只要渲染一个带有 `render` prop 的 `<Mouse>` 组件就能够告诉它当前鼠标坐标 (x, y) 要渲染什么。（`形如<Mouse render={...} />`)。

关于 render prop 一个有趣的事情是你可以使用带有 render prop 的常规组件来实现大多数[高阶组件](https://react.docschina.org/docs/higher-order-components.html) (HOC)。 例如，如果你更喜欢使用 `withMouse` HOC而不是 `<Mouse>` 组件，你可以使用带有 render prop 的常规 `<Mouse>` 轻松创建一个：

~~~js
// 如果你出于某种原因真的想要 HOC，那么你可以轻松实现
// 使用具有 render prop 的普通组件创建一个！
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}
~~~

因此，你可以将任一模式与 render prop 一起使用。

### children prop形式的RP

重要的是要记住，render prop 是因为模式才被称为 *render* prop ，你不一定要用名为 `render` 的 prop 来使用这种模式。事实上， [*任何*被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 “render prop”](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce).

尽管之前的例子使用了 `render`，我们也可以简单地使用 `children` prop！

**注意下面的children prop是一个函数，在Mouse组件中，使用方式就是props.children(mouse)**

~~~js
<Mouse>
  {mouse => (
    <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>
  )}
</Mouse>
~~~

在CodePen上验证下，下面WelcomeDialog的children prop是一个函数，它接受一个值x，并返回一个React元素，内容是x+1，

![image-20220225234922193](https://gitee.com/lwq1229/picture/raw/master/img/image-20220225234922193.png)

然后我们在FancyBorder组件中用 typeof判断下 props.children的类型，并查看输出结果

![image-20220225234950100](https://gitee.com/lwq1229/picture/raw/master/img/image-20220225234950100.png)

![image-20220225235001301](https://gitee.com/lwq1229/picture/raw/master/img/image-20220225235001301.png)

![image-20220225235235690](https://gitee.com/lwq1229/picture/raw/master/img/image-20220225235235690.png)

结果和预期的一样，children prop也可以当作render prop使用，它也可以作为一个函数(之前都是当元素用)

**由于这一技术的特殊性**，当你在设计一个类似的 API 时，你或许会要直接地在你的 propTypes 里声明 children 的类型应为一个函数。

```js
Mouse.propTypes = {
  children: PropTypes.func.isRequired
};
```

### 注意事项

### 将 Render Props 与 React.PureComponent 一起使用时要小心

如果你在 render 方法里创建函数，那么使用 render prop 会抵消使用 [`React.PureComponent`](https://react.docschina.org/docs/react-api.html#reactpurecomponent) 带来的优势。因为浅比较 props 的时候总会得到 false，并且在这种情况下每一个 `render` 对于 render prop 将会生成一个新的值。

例如，继续我们之前使用的 `<Mouse>` 组件，如果 `Mouse` 继承自 `React.PureComponent` 而不是 `React.Component`，我们的例子看起来就像这样：

~~~js

class Mouse extends React.PureComponent {
  // 与上面相同的代码......
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>

        {/*
          这是不好的！
          每个渲染的 `render` prop的值将会是不同的。
        */}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
~~~

在这样例子中，每次 `<MouseTracker>` 渲染，它会生成一个新的函数作为 `<Mouse render>` 的 prop，因而在同时也抵消了继承自 `React.PureComponent` 的 `<Mouse>` 组件的效果！

为了绕过这一问题，有时你可以定义一个 prop 作为实例方法，类似这样：

```js
class MouseTracker extends React.Component {
  // 定义为实例方法，`this.renderTheCat`始终
  // 当我们在渲染中使用它时，它指的是相同的函数
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
```

如果你无法静态定义 prop（例如，因为你需要关闭组件的 props 和/或 state），则 `<Mouse>` 应该扩展 `React.Component`。

## HOC

HOC的含义是高阶组件，具体而言就是一个参数为组件，返回值为新组件的函数

~~~js
const EnhancedComponent = higherOrderComponent(WrappedComponent)
~~~

组件是将props转换成UI，而**高阶组件是将组件转换为另一个组件**

HOC在React的第三方库中很常见，例如Redux的`connect`。

### **何时使用**

**使用HOC解决横切关注点问题**

组件时React中代码复用的基本单元。但你会发现某些模式不适合传统组件。

例如，有一个CommentList组件，它订阅外部数据源，用以渲染评论列表

~~~js
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // 假设 "DataSource" 是个全局范围内的数据源变量
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // 订阅更改
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // 清除订阅
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // 当数据源更新时，更新组件状态
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
~~~

稍后，编写了一个用于订阅单个博客帖子的组件，该帖子遵循类似的模式

~~~js
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
~~~

CommentList和BlogPost不同：它们在DataSource上调用不同的方法，且渲染不同的结果。但是他们的大部分实现都是一样的：

1. 在挂载时，向DataSource添加一个更改监听器
2. 在监听器内部，当数据源发生变化时，调用setState
3. 在卸载时，删除内部的监听器

你可以想象，在一个大型应用程序中，这种订阅 `DataSource` 和调用 `setState` 的模式将一次又一次地发生。我们需要一个抽象，允许我们在一个地方定义这个逻辑，并在许多组件之间共享它。这正是高阶组件擅长的地方。

对于订阅了 `DataSource` 的组件，比如 `CommentList` 和 `BlogPost`，我们可以编写一个创建组件函数。该函数将接受一个子组件作为它的其中一个参数，该子组件将订阅数据作为 prop。让我们调用函数 `withSubscription`：

~~~js
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
~~~

第一个参数是被包装组件。第二个参数通过 `DataSource` 和当前的 props 返回**我们需要的数据。**

当渲染 `CommentListWithSubscription` 和 `BlogPostWithSubscription` 时， `CommentList` 和 `BlogPost` 将传递一个 `data` prop，其中包含从 `DataSource` 检索到的最新数据：

~~~js
// 此函数接收一个组件...
function withSubscription(WrappedComponent, selectData) {
  // ...并返回另一个组件...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ...负责订阅相关的操作...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... 并使用新数据渲染被包装的组件!
      // 请注意，我们可能还会传递其他属性
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
~~~

请注意，HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件*包装*在容器组件中来*组成*新组件。HOC 是纯函数，没有副作用。

被包装组件接收来自容器组件的所有 prop，同时也接收一个新的用于 render 的 `data` prop。HOC 不需要关心数据的使用方式或原因，而被包装组件也不需要关心数据是怎么来的。

因为 `withSubscription` 是一个普通函数，你可以根据需要对参数进行增添或者删除。例如，您可能希望使 `data` prop 的名称可配置，以进一步将 HOC 与包装组件隔离开来。或者你可以接受一个配置 `shouldComponentUpdate` 的参数，或者一个配置数据源的参数。因为 HOC 可以控制组件的定义方式，这一切都变得有可能。

与组件一样，`withSubscription` 和包装组件之间的契约完全基于之间传递的 props。这种依赖方式使得替换 HOC 变得容易，只要它们为包装的组件提供相同的 prop 即可。例如你需要改用其他库来获取数据的时候，这一点就很有用。

#### 不要改变原始组件。使用组合

不要试图在 HOC 中修改组件原型（或以其他方式改变它）。

~~~js
function logProps(InputComponent) {
  InputComponent.prototype.componentDidUpdate = function(prevProps) {
    console.log('Current props: ', this.props);
    console.log('Previous props: ', prevProps);
  };
  // 返回原始的 input 组件，暗示它已经被修改。
  return InputComponent;
}

// 每次调用 logProps 时，增强组件都会有 log 输出。
const EnhancedComponent = logProps(InputComponent);
~~~

这样做会产生一些不良后果。其一是输入组件再也无法像 HOC 增强之前那样使用了。更严重的是，如果你再用另一个同样会修改 `componentDidUpdate` 的 HOC 增强它，那么前面的 HOC 就会失效！同时，这个 HOC 也无法应用于没有生命周期的函数组件。

修改传入组件的 HOC 是一种糟糕的抽象方式。调用者必须知道他们是如何实现的，以避免与其他 HOC 发生冲突。

**HOC 不应该修改传入组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能：**

```js
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }
    render() {
      // 将 input 组件包装在容器中，而不对其进行修改。Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

该 HOC 与上文中修改传入组件的 HOC 功能相同，同时避免了出现冲突的情况。它同样适用于 class 组件和函数组件。而且因为它是一个纯函数，它可以与其他 HOC 组合，甚至可以与其自身组合。

您可能已经注意到 HOC 与**容器组件模式**之间有相似之处。容器组件担任将高级和低级关注点分离的责任，由容器管理订阅和状态，并将 prop 传递给处理 UI 的组件。HOC 使用容器作为其实现的一部分，你可以将 HOC 视为参数化容器组件。

#### 约定

##### **将不相关的 props 传递给被包裹的组件**

HOC 为组件添加特性。自身不应该大幅改变约定。HOC 返回的组件与原组件应保持类似的接口。

**HOC 应该透传与自身无关的 props**。大多数 HOC 都应该包含一个类似于下面的 render 方法：

~~~js
render() {
  // 过滤掉非此 HOC 额外的 props，且不要进行透传
  const { extraProp, ...passThroughProps } = this.props;

  // 将 props 注入到被包装的组件中。
  // 通常为 state 的值或者实例方法。
  const injectedProp = someStateOrInstanceMethod;

  // 将 props 传递给被包装组件
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
~~~

##### 最大化可组合性

并不是所有的 HOC 都一样。有时候它仅接受一个参数，也就是被包裹的组件：

~~~js
const NavbarWithRouter = withRouter(Navbar);
~~~

HOC 通常可以接收多个参数。比如在 Relay 中，HOC 额外接收了一个配置对象用于指定组件的数据依赖：

~~~js
const CommentWithRelay = Relay.createContainer(Comment, config);
~~~

### 注意

##### 不要在 render 方法中使用 HOC

##### Refs 不会被传递

虽然高阶组件的约定是将所有 props 传递给被包装组件，但这对于 refs 并不适用。那是因为 `ref` 实际上并不是一个 prop - 就像 `key` 一样，它是由 React 专门处理的。如果将 ref 添加到 HOC 的返回组件中，则 ref 引用指向容器组件，而不是被包装组件。

这个问题的解决方案是通过使用 `React.forwardRef` API（React 16.3 中引入）
