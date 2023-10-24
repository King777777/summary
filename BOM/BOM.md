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

- **innerWidth和 innerHeight 返回浏览器窗口中页面视口的大小（包含侧边滚动条）**

- outerWidth 和 outerHeight 返回浏览器窗口自身的大小（**不管是在最外层 window 上使用，还是在窗格<frame>中使用**，一定是大于等于inner的，不常用）。

  

**此外，document.documentElement.clientWidth 和 document.documentElement.clientHeight也可以返回页面视口的宽度和高度（但是不包括滚动条）**

### 视口位置

**浏览器窗口尺寸通常无法满足完整显示整个页面**，为此用户**可以通过滚动**在有限的视口中查看文档。

**度量文档相对于视口滚动距离的属性有两对，返回相等的值**：

- window.pageXoffset/window. scrollX 
- window.pageYoffset/window.scrollY。

![image-20231024135819200](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231024135819200.png)



可以使用 scroll()、scrollTo()和 scrollBy()方法**滚动**

**语法**

~~~js
scrollBy(x-coord, y-coord)
scrollBy(options)

~~~

[`options`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollBy#options)

包含以下参数的字典

- [`top`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollBy#top)

  指定沿 Y 轴滚动窗口或元素的像素数。

- [`left`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollBy#left)

  指定沿 X 轴滚动窗口或元素的像素数。

- [`behavior`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollBy#behavior)

  指定滚动是否应该平滑（`smooth`）、瞬时运动到该位置（`instant`）、或者让浏览器选择（`auto`，默认）。

**示例**

~~~js
// 让元素滚动
element.scrollBy(300, 300);
element.scrollBy({
    top: 100,
    left: 100,
    behavior: 'smooth'
})
~~~

**区别**：**scroll(), scrollTo()是绝对滚动， scrollBy()是相对滚动**

**可以在容器上用也可以在window上用**



### window.open

是用指定的名称将指定的资源加载到新的或已存在的浏览上下文（标签、窗口或 [iframe](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)）中。

~~~js

open()
open(url)
open(url, target)
open(url, target, windowFeatures)

~~~

主要功能就是打开一个新的窗口，第二个参数可以指定名称（如果已经有该名称的窗口则直接打开而不是创建新的），第三个参数是一些配置这些特性包括窗口的默认大小和位置、是否打开最小弹出窗口等选项。

详情见[Window：open() 方法 - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open)

### location对象

其中包含有关文档当前位置的信息

重点属性如下

![image-20231024164958794](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231024164958794.png)

通过更改location.href也能够改边当前页面的url

location.serach返回URL的查询字符串，qs库是一个常用的处理查询字符串的库

~~~js
import qs from 'qs';
// 解析查询字符串
const queryObj = qs.parse("name=zhang&age=18");// 输出{name: 'zhangsan', age: '18'}
// 转化obj为查询字符串
const queryString = qs.stringify({name: 'zhangsan', age: 18})// 输出"name=zhangsan&age=18"

~~~

### navigator对象

`navigator` 对象在前端开发中经常用于获取有关客户端浏览器和操作系统的信息，以便执行相应的操作或调整用户体验。以下是 `navigator` 对象在前端中常用的一些功能：

1. **浏览器信息**:
   - 获取浏览器的名称和版本信息，以便进行浏览器特定的代码处理。
   - 例如：`navigator.userAgent` 可用于检测浏览器。
2. **浏览器支持的功能检测**:
   - 检查浏览器是否支持某些特定的功能或API，以便进行特性检测。
   - 例如：`navigator.geolocation` 用于检测浏览器是否支持地理位置服务。。
4. **语言和地区信息**:
   - 获取用户的浏览器首选语言和地区设置，以本地化页面内容。
   - 例如：`navigator.language`。
5. **Cookie 启用检测**:
   - 检查浏览器是否启用了 cookie，以确保可跟踪用户的会话状态。
   - 例如：`navigator.cookieEnabled`。
7. **离线检测**:
   - 通过 `navigator.onLine` 属性检测客户端的在线/离线状态。
   - 这对于处理离线应用程序和同步数据非常有用。
8. **插件检测**:
   - 通过 `navigator.plugins` 属性检测已安装的浏览器插件，以提供相关的功能或提示。
   - 例如：检测 Flash 插件。
9. **媒体设备访问**:
   - `navigator` 提供了访问媒体设备（例如摄像头和麦克风）的接口，以便创建多媒体应用程序。

这些是 `navigator` 对象的一些常见用途，但还有更多属性和方法可用于获取有关客户端环境的信息，以便根据需要调整网站或应用程序的行为。



![image-20231024172506274](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231024172506274.png)

![image-20231024172549067](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231024172549067.png)

### screen对象

