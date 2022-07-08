# 现代JS之样式和类

通常设置元素样式的方式有以下两种

1. 在css文件中创建一个类，并添加它`<div class='...'>`
2. 内联样式，`<div style='...'>`

JS既可以修改类，也可以修改style属性

相较于将样式写入 `style` 属性，我们应该首选通过 CSS 类的方式来添加样式。仅当类“无法处理”时，才应选择使用 `style` 属性的方式。

例如，如果我们动态地计算元素的坐标，并希望通过 JavaScript 来设置它们，那么使用 `style` 是可以接受的，如下所示：

```javascript
let top = /* 复杂的计算 */;
let left = /* 复杂的计算 */;

elem.style.left = left; // 例如 '123px'，在运行时计算出的
elem.style.top = top; // 例如 '456px'
```

对于其他情况，例如将文本设为红色，添加一个背景图标 — 可以在 CSS 中对这些样式进行描述，然后添加类`element.classList.add(class)`。这样更灵活，更易于支持。

## className和classList

~~~js
<body class="main page">
  <script>
    alert(document.body.className); // main page
  </script>
</body>
~~~

通过元素的className属性获取其所有的类

如果我们对 `elem.className` 进行赋值，它将替换类中的整个字符串。有时，这正是我们所需要的，但通常我们希望添加/删除单个类。

这里还有另一个属性：`element.classList`。

`element.classList` 是一个特殊的对象，它具有 `add/remove/toggle` 单个类的方法。

例如：

```js
<body class="main page">
  <script>
    // 添加一个 class
    document.body.classList.add('article');

    alert(document.body.className); // main page article
  </script>
</body>
```

因此，我们既可以使用 `className` 对完整的类字符串进行操作，也可以使用使用 `classList` 对单个类进行操作。我们选择什么取决于我们的需求。

`classList` 的方法：

- `elem.classList.add/remove(class)` — 添加/移除类。
- `elem.classList.toggle(class)` — 如果类不存在就添加类，存在就移除它。
- `elem.classList.contains(class)` — 检查给定类，返回 `true/false`。

此外，`classList` 是可迭代的，因此，我们可以像下面这样列出所有类：

```js
<body class="main page">
  <script>
    for (let name of document.body.classList) {
      alert(name); // main，然后是 page
    }
  </script>
</body>
```

`classList` 的方法：

- `elem.classList.add/remove(class)` — 添加/移除类。
- `elem.classList.toggle(class)` — 如果类不存在就添加类，存在就移除它。
- `elem.classList.contains(class)` — 检查给定类，返回 `true/false`。

## 计算样式

修改样式很简单。但是如何 **读取** 样式呢？

例如，我们想知道元素的 size，margins 和 color。应该怎么获取？

**`style` 属性仅对 `"style"` 特性（attribute）值起作用，而没有任何 CSS 级联（cascade）。**

因此我们无法使用 `elem.style` 读取来自 CSS 类的任何内容。

例如，这里的 `style` 看不到 margin：

```js
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  The red text
  <script>
    alert(document.body.style.color); // 空的
    alert(document.body.style.marginTop); // 空的
  </script>
</body>
```

……但如果我们需要，例如，将 margin 增加 20px 呢？那么我们需要 margin 的当前值。

对于这个需求，这里有另一种方法：`getComputedStyle`。

语法如下：

```javascript
getComputedStyle(element, [pseudo])
```

- element

  需要被读取样式值的元素。

- pseudo

  伪元素（如果需要），例如 `::before`。空字符串或无参数则意味着元素本身。

结果是一个具有样式属性的对象，像 `elem.style`，但现在对于所有的 CSS 类来说都是如此。

例如：

```js
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // 现在我们可以读取它的 margin 和 color 了

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

**`getComputedStyle` 需要完整的属性名**

我们应该总是使用我们想要的确切的属性，例如 `paddingLeft`、`marginTop` 或 `borderTopWidth`。否则，就不能保证正确的结果。

## [总结](https://zh.javascript.info/styles-and-classes#zong-jie)

要管理 class，有两个 DOM 属性：

- `className` — 字符串值，可以很好地管理整个类的集合。
- `classList` — 具有 `add/remove/toggle/contains` 方法的对象，可以很好地支持单个类。

要改变样式：

- `style` 属性是具有驼峰（camelCased）样式的对象。对其进行读取和修改与修改 `"style"` 特性（attribute）中的各个属性具有相同的效果。要了解如何应用 `important` 和其他特殊内容 — 在 [MDN](https://developer.mozilla.org/zh/docs/Web/API/CSSStyleDeclaration) 中有一个方法列表。
- `style.cssText` 属性对应于整个 `"style"` 特性（attribute），即完整的样式字符串。

要读取已解析的（resolved）样式（对于所有类，在应用所有 CSS 并计算最终值之后）：

- `getComputedStyle(elem, [pseudo])` 返回与 `style` 对象类似的，且包含了所有类的对象。只读。

### 任务

编写一个函数 `showNotification(options)`：该函数创建一个带有给定内容的通知 `<div class="notification">`。该通知应该在 1.5 秒后自动消失。

index.js

~~~js

<!DOCTYPE HTML>
<html>
<head>
  <link rel="stylesheet" href="index.css">
</head>

<body>

  <h2>Notification is on the right</h2>
  <script>
    function showNotification({top = 0, right = 0, className, html}) {

      let notification = document.createElement('div'); //创建一个div元素
      notification.className = "notification"; //给元素的className赋值
      notification.classList.toggle(className); //添加一个类（如果不存在该类）

      notification.style.top = top + 'px';
      notification.style.right = right + 'px'; //位置

      notification.innerHTML = html; //textContent推荐使用而非innerHTML（针对文本）
      document.body.append(notification); //添加元素到body元素中

      // 1.5秒后移除元素使用elem.remove()，IE 12开始
      setTimeout(() => notification.remove(), 1500);
    }

    // test it
    let i = 1;
    setInterval(() => {
      showNotification({
        top: 10,
        right: 10,
        html: 'Hello ' + i++,
        className: "welcome"
      });
    }, 2000);
  </script>


</body>
</html>
~~~

index.css

~~~css

.notification {
  position: fixed;
  z-index: 1000;
  padding: 5px;
  border: 1px solid black;
  font-size: 20px;
  background: white;
  text-align: center;
}

.welcome {
  background: #b80000;
  color: yellow;
}
~~~

