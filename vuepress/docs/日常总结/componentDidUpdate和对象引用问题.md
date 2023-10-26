问题

JS对象 在内存中的位置，

~~~js
class A extends Component {
    this.allList = ['a', 'b'];
...
this.setState({checkedList: this.allList}) //此条语句会导致bug，this.allList引用指向checkedList(很奇怪),所以应在此前，深拷贝一下this.allList
    
}
~~~

ComponentDidUpdate

为避免无限循环，所有网络请求都必须位于条件语句中，如下所示：

~~~js
// 这里如果发起请求，则必须比较判断
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("prevProps.title: ", prevProps.title);
    console.log("Props.title", this.props.title);

    if (prevProps.title !== this.props.title) {
      this.handleQueryList();
    }
  }
~~~

