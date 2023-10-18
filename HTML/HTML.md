# HTML

## 基础

一个基础的实例如下

~~~html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>刘文强学习</title>
</head>
<body>
<h1>我的第一个标题</h1>
<p>我的第一个段落</p>
</body>
</html>
~~~

基本的要素如下图所示

![image-20220626172509838](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/img/imgimage-20220626172509838.png)

### meta标签

meta元素表示那些不能由其他html元相关元素

1. base
2. link
3. script
4. style
5. title

表示的任何元数据信息

参考

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta

`meta`标签是`html`标记语言`head`区一个非常有用的一个辅助性标签，在所有网页中都可以看到以下代码：

```xml
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
```

这些代码可有可无，其实利用好了，大有用途！会带带意想不到的效果，比如加入关键词被搜索引擎自动搜集，增加网站的曝光度及提高网站的排名，可以设定页面的格式及刷新等。

有以下两个属性

1. http-equiv
2. name

不同的属性又有不同的参数值，这些不同的参数值就实现了不同的网页功能。

#### **http-equiv**

meta`标签的`http-equiv`属性语法格式是：`

＜meta http-equiv=”参数” content=”参数变量值”＞

属性定义了一个编译指示指令。这个属性叫做 `http-equiv` 是因为所有允许的值都是特定 HTTP 头部的名称，如下：

- `content-security-policy`
  它允许页面作者定义当前页的[内容策略](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)。 内容策略主要指定允许的服务器源和脚本端点，这有助于防止跨站点脚本攻击。

- `content-type`
  如果使用这个属性，其值必须是"`text/html; charset=utf-8`"。注意：该属性只能用于 [MIME type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types) 为 `text/html` 的文档，不能用于 MIME 类型为 XML 的文档。

- ```
  default-style
  ```

  设置默认 [CSS 样式表](https://developer.mozilla.org/zh-CN/docs/Web/CSS)组的名称。

- `x-ua-compatible`
  如果指定，则 `content` 属性必须具有值 "`IE=edge`"。用户代理必须忽略此指示。

- ```
  refresh
  ```

  这个属性指定：

  - 如果 [`content`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-content) 只包含一个正整数，则为重新载入页面的时间间隔 (秒)；
  - 如果 [`content`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-content) 包含一个正整数，并且后面跟着字符串 '`;url=`' 和一个合法的 URL，则是重定向到指定链接的时间间隔 (秒)

#### name

主要用于描述网页，与之对应的属性值为`content`，`content`中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。

meta`标签的`name`属性语法格式是：`

＜meta name=”参数” content=”具体的参数值”＞

具体见

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name

name属性主要用于描述网页，与之对应的属性值为content，**content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。**

```xml
1.<meta name=”viewport” content=”width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no”>：在移动设备浏览器上，禁用缩放（zooming）功能，用户只能滚动屏幕。
2.<meta name=”description” content=””>：告诉搜索引擎，当前页面的主要内容是xxx。
3.<meta name=”keywords” content=””>：告诉搜索引擎，当前页面的关键字。
4.<meta name=”author” content=””>：告诉搜索引擎，标注网站作者是谁。
5.<meta name=”copyright” content=””>：标注网站的版权信息。
```

| charset                                                      | *character_set*                                        | 定义文档的字符编码。                              |
| ------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------- |
| [content](https://www.runoob.com/tags/att-meta-content.html) | *text*                                                 | 定义与 http-equiv 或 name 属性相关的元信息。      |
| [http-equiv](https://www.runoob.com/tags/att-meta-http-equiv.html) | content-type default-style refresh                     | 把 content 属性关联到 HTTP 头部。                 |
| [name](https://www.runoob.com/tags/att-meta-name.html)       | application-name author description generator keywords | 把 content 属性关联到一个名称。                   |
| [scheme](https://www.runoob.com/tags/att-meta-scheme.html)   | *format/URI*                                           | HTML5不支持。 定义用于翻译 content 属性值的格式。 |

## HTML标签

HTML标准标签内容参考如下

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element

### img

详见https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img

重要属性

- src，图片地址
- alt，图片不显示时的文字
- loading，指定浏览器如何加载图像，
  - **lazy**，延迟加载直到它和视口接近到一个计算得到的距离，由浏览器定义
  - eager，立刻加载，不管它是否在可视化窗口之外
- width 和height，指定宽高，当只有一种时保持图片原比例
- usemap，与元素相关的图像地图的url，（以#开始的部分）

**相关标签**

| 标签    | 描述                   |
| ------- | ---------------------- |
| \<map>  | 定义图像地图           |
| \<area> | 定义图像地图可点击区域 |

### 表格

弄清缩写的含义，在理解的基础上记忆是最为有效的

- tr即table-row，表格行
- td即table-datacell，表格数据单元
- th，作为标题的数据单元

详见https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/table

![image-20220705205703535](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/img/imgimage-20220705205703535.png)



​    语义化标签thead，tbody，tfoot

~~~html
  <style>
    table {
      margin: 0 auto;
      background-color: #E0E0E0;
      border-collapse: separate;
      border-spacing: 12px;
    }
    td {
      border: 1px solid black;
      padding: 8px;
    }
  </style>
~~~



~~~html
<table>
    <caption>标题</caption> 
        <tr>
            <td>姓名</th>
            <td>年龄</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Liuwq</td>
            <td>18</td>
        </tr>
    </tbody>
    <tfoot>
    	<tr>
            <td colspan='2'>表尾</td>
        </tr>
    </tfoot>
</table>
~~~

![image-20220705221808106](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/img/imgimage-20220705221808106.png)

#### table

表格标签支持全局属性，它的许多属性在html5被弃用了，这些属性基本上都是样式相关的，把html属性和css职责分离开来，明显更加清晰。

下面是**被弃用的html属性**

1. align属性，表示表格在文档的对齐方式，有三个属性值left，center，right，请使用css的margin-right: auto, margin: 0 auto, margin-left: auto来实现
2. bgcolor属性,定义表格背景颜色，请用css的background-color代替
3. border属性，表格整体的边框，如果设置为 0，这意味着[`frame`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/table#attr-frame) 属性被设置为空。如果设置为 1，表示表格具有 1px 大小的边框。请用css的border属性来代替
4. cellpadding属性，定义单元格内容和边框的空间，在table元素上使用css属性值为collapse的border-collapse属性，在td元素上使用padding。
5. cellspacing属性，定义两个单元格之间的间距，请在table元素上使用border-spacing代替



**border-collapse**

这个css属性，用来决定表格的边框是分开的还是合并的，在分隔模式下相邻的单元格拥有独立的边框，在合并模式下，相邻的单元格共享边框。

- border-collapse： collapse；合并边框

![image-20220705220516202](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/img/imgimage-20220705220516202.png)

- border-collapse：separate；独立边框，此为默认值

![image-20220705220528164](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/img/imgimage-20220705220528164.png)

合并（*collapsed* ）模式下，表格中相邻单元格共享边框。在这种模式下，CSS 属性[`border-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style) 的值 inset 表现为槽，值 outset 表现为脊。

分隔（*separated）*模式是 HTML 表格的传统模式。相邻单元格都拥有不同的边框。边框之间的距离是通过 CSS 属性 [`border-spacing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-spacing) 来确定的。

#### td

td标签的重要属性

- colspan，表示单元格所占的列数
- rowspan，标识单元格所占的行数

#### th

- colspan，表示单元格所占的列数
- rowspan，标识单元格所占的行数
- scope, 规定表头单元格是否是行，列，行组列祖的头部（scope 属性在普通的 Web 浏览器中没有视觉效果，但可以通过屏幕阅读器使用。）

#### colgroup标签

~~~html
<table> 
   <colgroup>
    <col span="2" style="background-color:red">
    <col style="background-color:yellow">
  </colgroup>
</table>
~~~



## HTML全局属性

HTML全局属性内容参考如下

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes