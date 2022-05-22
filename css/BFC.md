# BFC了解

在了解BFC之前，先了解下常见的定位方案，定位方案是控制元素的布局，有三种常见的方式

- 普通流 (normal flow)

> 在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。

- 浮动 (float)

> 在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。

- 绝对定位 (absolute positioning)

> 在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定。
>
>

Formatting context(格式化上下文) 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

## BFC

那么 BFC 是什么呢？

BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于上述定位方案的普通流。

**具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。
**

通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

### 触发BFC

![image-20220522225738782](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20220522225738782.png)

这很有用，因为新的BFC的行为与最外层的文档非常相似，它在主布局中创造了一个小布局。BFC包含其内部的所有内容，[`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 和 [`clear`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear) 仅适用于同一格式上下文中的项目，而页边距仅在同一格式上下文中的元素之间折叠。

### BFC特性和应用

#### 1.同一个BFC下外边距会发生折叠

~~~html
<head>
div{
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}
</head>
<body>
    <div></div>
    <div></div>
</body>
~~~

![image-20220522225953570](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20220522225953570.png)

首先这不是 CSS 的 bug，我们可以理解为一种规范，**如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。**

```html
<div class="container">
    <p></p>
</div>
<div class="container">
    <p></p>
</div>
```

~~~css
.container {
    overflow: hidden;
}
p {
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}
~~~

这样，两个盒子间的边距就是200px

![image-20220522231241454](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20220522231241454.png)

#### 2.清除浮动

我们都知道，浮动的元素会脱离普通文档流，来看下下面一个例子

![image-20220522234141229](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20220522234141229.png)

由于容器内元素浮动，脱离了文档流，所以容器只剩下 2px 的边距高度。如果使触发容器的 BFC，那么容器将会包裹着浮动元素。

![image-20220522234231444](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20220522234231444.png)

#### 3.两栏布局的方法之一

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .left {
            width: 100px;
            height: 300px;
            background-color: aqua;
            float: left;
        }
        .right {
            height: 400px;
            background-color: blueviolet;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div>
        <!-- BFC：自适应两栏布局 -->
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</body>
</html>

~~~

![image-20220522234336907](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20220522234336907.png)

除了此方法还有

1.  flex盒模型实现自适应两栏布局
2. 左浮动float+右margin-left实现自适应两栏布局

