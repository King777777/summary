# CSS过渡

CSS的transition属性提供了一种在更改CSS属性时控制动画速度的方法。其可以让属性的变化有一个过渡的效果而不是立刻生效，比如一个元素的颜色由黑到白，通过transition属性的设置，将按照一定的曲线速率变化，这个过程可以自定义

CSS transition可以决定哪些属性能发生动画效果，持续多久，动画函数，延迟多久

**不是所有的属性都可以设置过渡**，所以 [可动画属性列表](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animated_properties) 是一个有限集合

> 同时应当留意这种情形，在插入元素（如 `.appendChild()`）或改变属性 `display: none` 后立即使用过渡, 元素将视为没有开始状态，始终处于结束状态。简单的解决办法，改变属性前用 `window.setTimeout()` 延迟几毫秒。（这个没有实际用过）

## 定义过渡

通常使用简写属性transition，

1. transition-property, 指定哪个或哪些css要使用过渡
2. transition-duration，过渡持续时间
3. transition-timing-function，一个函数，定义属性值如何变化，缓动函数 *Timing functions* 定义属性如何计算。多数 [timing functions](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function) 由四点定义一个 bezier 曲线。也可以从 [Easing Functions Cheat Sheet](https://easings.net/) 选择缓动效果。
4. transition-delay,延迟时间

**简写语法**

~~~css
div {
 transition: <property> <duration> <timing-function> <delay>
}
~~~

如果不使用简写语法，当属性值列表长度不一致时，已property为准，如果其他属性短了，则重复，长了则截断

```
div {
  transition-property: opacity, left, top, height;
  transition-duration: 3s, 5s;
}
```

将按下面这样处理:

```
div {
  transition-property: opacity, left, top, height;
  transition-duration: 3s, 5s, 3s, 5s;
}
```

类似地，如果某个属性的值列表长于 [`transition-property`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-property) 的，将被截短。 例如:

```
div {
  transition-property: opacity, left;
  transition-duration: 3s, 5s, 2s, 1s;
}
```

将按下面这样处理:

```
div {
  transition-property: opacity, left;
  transition-duration: 3s, 5s;
}
```

下面看个例子

~~~js
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title>
<style> 
.menuButton {
  position: relative;
  transition: background-color 1s ease-out,color 1s ease-out;
  text-align: left;
  background-color: grey;
  left: 5px;
  top: 5px;
  height: 26px;
  color: white;
  border-color: black;
  font-family: sans-serif;
  font-size: 20px;
  text-decoration: none;
  box-shadow: 2px 2px 1px black;
  padding: 2px 4px;
  border: solid 1px black;
}

.menuButton:hover {
  background-color:white;
  color:black;
}
</style>
</head>
<body>
<div class="sidebar">
  <p><a class="menuButton" href="home">Home</a></p>
  <p><a class="menuButton" href="about">About</a></p>
  <p><a class="menuButton" href="contact">Contact Us</a></p>
  <p><a class="menuButton" href="links">Links</a></p>
</div>
</body>
</html>
~~~



![css-transition](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/imgcss-transition.gif)

## 过渡是否完成

当过渡完成时触发一个事件，在符合标准的浏览器下，这个事件是 `transitionend`, 在 WebKit 下是 `webkitTransitionEnd`. 详情查看页面底部的兼容性表格。 `transitionend 事件提供两个属性`:

- `propertyName`

  字符串，指示已完成过渡的属性。

- `elapsedTime`

  浮点数，指示当触发这个事件时过渡已运行的时间（秒）。这个值不受 [`transition-delay`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-delay) 影响。

照例可以用  [`element.addEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 方法来监听这个事件：

```
el.addEventListener("transitionend", updateTransition, true);
```

## 让JS效果更平滑

**transition 是非常好的工具，可以让 JavaScript 效果平滑而不用修改 JavaScript**。 看下面例子。

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title>
<style> 
.ball {
  border-radius: 25px;
  width: 50px;
  height: 50px;
  background: #c00;
  position: absolute;
  top: 0;
  left: 0;
  transition: top 1s, left 1s;
}
</style>
</head>
<body>
<p>Click anywhere to move the ball</p>
<div id="foo" class="ball"></div>
	<script>
		var f = document.getElementById('foo');
document.addEventListener('click', function(ev){
    f.style.top = `${ev.clientY-25}px`;
    f.style.left = `${ev.clientX-25}px`
},false);
	</script>
</body>
</html>
~~~

![GIF 2022-5-29 16-51-33](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/imgGIF%202022-5-29%2016-51-33.gif)