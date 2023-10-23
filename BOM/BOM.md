BOM

## window对象

BOM 的核心是 window 对象，表示浏览器的实例。window 对象在浏览器中有两重身份，一个是

ECMAScript 中的 Global 对象，另一个就是浏览器窗口的 JavaScript 接口。这意味着网页中定义的所有

对象、变量和函数都以 window 作为其 Global 对象，都可以访问其上定义的 parseInt()等全局方法

### 窗口关系

window.parent, window.top, window.self的定义以及关系

**这里的多个窗口是指嵌套窗口<iframe>**

- **top对象始终指向最外层窗口，及浏览器窗口本身**
- **parent始终指向当前窗口的父级窗口**，如果当前窗口就是最外层窗口，则parent === top（均为window）
- self其实就是window本身

> 注意和window.opener的区别，window.opener返回打开当前窗口的那个窗口的引用，例如：在 window A 中打开了 window B，B.opener 返回 A.

### 窗口大小

所有现代浏览器都支持 4 个属性：

innerWidth、innerHeight、outerWidth 和 outerHeight。

outerWidth 和 outerHeight 返回浏览器窗口自身的大小（不管是在最外层 window 上使用，还是在窗格<frame>中使用）。

**innerWidth和 innerHeight 返回浏览器窗口中页面视口的大小**

**document.documentElement.clientWidth 和 document.documentElement.clientHeight**

**返回页面视口的宽度和高度。**

这两者应该是相等的

