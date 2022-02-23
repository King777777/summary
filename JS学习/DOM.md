# JS之DOM学习

文档对象模型

当网页被加载时，浏览器会创建页面的文档对象模型，，HTML DOM模型被构造为对象的树

![image-20220223213328340](https://gitee.com/lwq1229/picture/raw/master/img/image-20220223213328340.png)

通过这个可编程的对象模型，JS拥有了以下能力

- JavaScript 能改变页面中的所有 HTML 元素
- JavaScript 能改变页面中的所有 HTML 属性
- JavaScript 能改变页面中的所有 CSS 样式
- JavaScript 能删除已有的 HTML 元素和属性
- JavaScript 能添加新的 HTML 元素和属性
- JavaScript 能对页面中所有已有的 HTML 事件作出反应
- JavaScript 能在页面中创建新的 HTML 事件

## 查找HTML元素

JS操作首先要找到想操作的HTML元素，常用的方法就是下面四种

- **document.getElementById("id")**， 通过 id，返回一个`HTMLELEMENT`对象
- **document.getElementsByTagName("a")**， 通过**标签名**，**返回对象类型取决于标签类型**
- **document.querySelector("#id")**, 通过**选择器**，**返回类型取决于标签类型**，只能返回一个，如果需**要返回所有请用querySelectorAll**
- **document.getElementsByClassName("myClass")**, 通过类名

![image-20220223215255312](https://gitee.com/lwq1229/picture/raw/master/img/image-20220223215255312.png)

![image-20220223215546197](https://gitee.com/lwq1229/picture/raw/master/img/image-20220223215546197.png)

## 改变HTML内容

最简单的方法就是使用innerHTML属性

如需改变 HTML 元素的内容，请使用这个语法：

如需改变 HTML 元素的内容，请使用这个语法：

**document.getElementById(*id*).innerHTML=*新的 HTML***

## 改变HTML属性

**document.getElementById(*id*).*attribute=新属性值***

如下，改变了img元素的src属性

~~~html
<!DOCTYPE html>
<html>
<body>

<img id="image" src="smiley.gif">

<script>
document.getElementById("image").src="landscape.jpg";
</script>

</body>
</html>
~~~

## 改变HTML的样式

**document.getElementById(*id*).style.*property*=*新样式***，

下面这个例子改变了p元素的样式

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>
 
<p id="p1">Hello World!</p>
<p id="p2">Hello World!</p>
<script>
document.getElementById("p2").style.color="blue";
document.getElementById("p2").style.fontFamily="Arial";
document.getElementById("p2").style.fontSize="larger";
</script>
<p>以上段落通过脚本修改。</p>
 
</body>
</html>
~~~

## 使用事件

HTML DOM允许在触发对应事件时执行相关代码

比如以下事件

- 资源事件
- 网络事件
- 焦点事件
- websocket事件
- 会话历史事件
- css动画事件
- 鼠标事件
- 。。。。。还有很多，可以在MDN上查看

下面使用了button的点击事件来修改标题的颜色

~~~html
<!DOCTYPE html>
<html>
<body>

<h1 id="id1">我的标题 1</h1>
<button type="button"
onclick="document.getElementById('id1').style.color='red'">
点我!</button>

</body>
</html>
~~~

**InnerHTML？？有待调研**

## 添加事件监听

例子，在点击按钮时出发监听函数，鲜活的HTMLElement对象，给他加个事件监听

`document.getElementById("myBtn").addEventListener("click", displayDate);`

- addEventListener() 方法用于向指定元素添加事件句柄。
- addEventListener() 方法添加的事件句柄不会覆盖已存在的事件句柄
- 你可以向一个元素添加多个事件句柄。
- 你可以向同个元素添加多个同类型的事件句柄，如：两个 "click" 事件。
- 你可以向任何 DOM 对象添加事件监听，不仅仅是 HTML 元素。如： window 对象。
- addEventListener() 方法可以更简单的控制事件（冒泡与捕获）。
- 当你使用 addEventListener() 方法时, JavaScript 从 HTML 标记中分离开来，可读性更强， 在没有控制HTML标记时也可以添加事件监听。
- 你可以使用 removeEventListener() 方法来移除事件的监听。

### 语法

`element.addEventListener(event, function, useCapture);`

第一个参数是事件的类型 (如 "click" 或 "mousedown").

第二个参数是事件触发后调用的函数。

第三个参数是个布尔值用于描述事件是冒泡还是捕获。该参数是可选的。

#### 冒泡or捕获

**事件传递有两种方式：冒泡与捕获**。

事件传递定义了元素事件触发的顺序。 如果你将 <p> 元素插入到 <div> 元素中，用户点击 <p> 元素, 哪个元素的 "click" 事件先被触发呢？

在 *冒泡* 中，内部元素的事件会先被触发，然后再触发外部元素，即： <p> 元素的点击事件先触发，然后会触发 <div> 元素的点击事件。

在 *捕获* 中，外部元素的事件会先被触发，然后才会触发内部元素的事件，即： <div> 元素的点击事件先触发 ，然后再触发 <p> 元素的点击事件。

addEventListener() 方法可以指定 "useCapture" 参数来设置传递类型：

**useCapture默认为false，事件传递即为冒泡传递，当设置为true表示捕获传递**

### removeEventListener()

移除事件监听 *element*.removeEventListener("mousemove", myFunction);

具体可参考MDN上的addEventListener

## HTML全局属性

![image-20220223232539247](https://gitee.com/lwq1229/picture/raw/master/img/image-20220223232539247.png)

每个html 标签都有自己独特的属性如a标签有href，input标签有value， img标签有src等

然后html又有一个全局属性，大部分标签都有的
