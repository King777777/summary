# CSS

## 简写属性

简写属性可以让我们同时设置好几个CSS属性，简写成一行，从而编写出简洁的代码，如常见的border,margin,background都是简写属性。

### 简写边界情况

1. 未指定的值会被赋予初始值，这似乎是很符合常理的，但是**它会覆盖之前设置好的属性**，**如下,border-color并未生效，而是被默认值覆盖了**

~~~html
<!DOCTYPE html>
<html>
<head>
<style>
    
p{
    border-color: red;
    border: solid;
}
</style>
    
</head>
<body>
<p>没有指定的值会被设置为它的初始值。这听起来似乎本来就很合理的样子，但这确实意味着，它将会覆盖之前设置的值</p>
</body>
</html>
~~~

![image-20211001115309642](https://gitee.com/lwq1229/picture/raw/master/img/image-20211001115309642.png)

## background简写

background具有以下简写属性：

>- background-color: #ff0000
>
>- background-image: url();
>- background-repeat: no-repeat;
>- background-attachment: fixed;
>- background-position: top right;

属性值之一缺失不要紧，只要在简写时按此顺序设置其他值即可

### background-color

用来设置元素背景的颜色

### background-image

此属性为元素设置背景图像，**元素的背景占据了元素的全部尺寸，包括内边距和边框，但是不包括外边距**，

**默认地，背景图像位于元素左上角，并在水平和垂直方向重复**，相应的，可以根据`background-repeat`属性的值，图像可以不重复或在某一方向重复，也可以用`background-position`来设置背景图片位置。

```css
body
  { 
  background-image: url(bgimage.gif);
  background-color: #000000;
  }
```

### background-repeat

此属性用于设置背景图片是否重复，以及如何重复，默认在水平以及垂直方向都重复，具有以下属性值

> - repeat,  默认值
> - repeat-x, 在水平方向重复
> - repeat-y, 在垂直方向重复
> - no-repeat, 不重复
> - inherit，从父元素继承属性值 

### background-attachment

此属性用来**设置背景图片是否固定或者随着页面滚动，默认scroll，**

具有以下属性值

> - scroll
> - fixed, 固定，当页面滚动时，背景图片不会滚动
> - inherit， 从父元素继承属性值

### background-position

此属性用来设置背景图片的起始位置，默认 0% 0%

具有以下属性

> - top left, top center, top right，以此类推，中左，中中，中右，下左，下中，下右，如果只规定一个值，则第二个值默认为center
> - x% y%，设置水平和垂直位置，左上角为0% 0%,右下角为100% 100%
> - xpos ypos,第一个值时水平，第二个时垂直，左上角时 0 0 ，单位可以是任何css单位，如果之规定一个值，另一个将会是50%，此外可以混用%与position值

### background-clip

规定背景的绘制区域, 默认值border-box

~~~css
div{
    background-clip: content-box;
}
~~~

此属性于有以下值

> - border-box，默认，背景绘制到边框盒子
> - padding-box, 背景被绘制到内边距盒子
> - content-box，背景被裁减到内容盒子

### background-size

**规定背景图片的尺寸** 默认auto

语法

```
background-size: length|percentage|cover|contain;
```

```css
div{
    background:url(img_flwr.gif);
    background-size:80px 60px;
    background-repeat:no-repeat;
}
```

> - length和percentage都是用来设置宽高的，如果只设置一个，则第二个值默认为auto
> - cover，完全覆盖，即把背景图片放大到覆盖整个背景，图片可能不会完全显示
> - contain，放大图片到宽度和高度完全适应内容区域

## font简写

> - font-style: italic;
> - font-weight: bold;
> - font-size: 14px;
> - line-height: 1.2;
> - font-family: Arial;

## border

border是一个**简写属性**，border属性用来**设置元素边框的宽度(border-width)、样式(border-style)、颜色(border-color)**

*注意: 除非设置border-style属性，否则其他的边框属性将不会生效*

~~~css
p.one{
    //一个值，因border-style是必须的，所以一个值属性代表border-style
    border: solid;
}
p.two{
    // 两个值按[width], style, [color]来的话，为border-style border-color
    border: dashed red;
}
p.three{
    // 三个值按[width], style, [color]来的话，为border-width,border-style border-color
    border: 10px double #32a1ce;
}
p.four{
    //ridge为脊状，rgba()//第四个参数为透明度，0-1之间
    border: 4mm ridge rgba(170, 50, 220, .6);
}
~~~

### 各边简写

1. border-top
2. border-right
3. border-bottom
4. border-left

以上四个是各边的简写属性，为[width]，style, [color]的简写

### 各边框属性

**border的三个属性border-width, border-style, border-color也是一个简写属性，**

如border-style简写属性如下：

1. border-top-style

2. border-right-style

3. border-bottom-style

4. border-left-style

   其他两个以此类推

   下面这个demo分别设置一个边框各边的属性

~~~html
<!DOCTYPE html>
<html>
<head>
<style>
p.one {
    //下面这种写法可以使用border-top,border-right,border-bottom,border-left简写
    //如,border-top: 5px dotted red;
  border-top-width: 5px;
  border-right-width: 3px;
  border-bottom-width: 10px;
  border-left-width: 20px;
	
  border-top-style: dotted;
  border-right-style: solid;
  border-bottom-style: dashed;
  border-left-style: double;
  
  border-top-color: red;
  border-right-color: purple;
  border-bottom-color: fuchsia;
  border-left-color: green;
}

</style>
</head>
<body>

<p class="one">一些文本。</p>

</body>
</html>
~~~

### 圆角边框

`border-radius`属性用于向元素添加圆角边框

~~~css
p{
    border: 2px solid red;
    border-radius: 5px // 50%
}
~~~

### box-sizing属性

在CSS盒子模型的默认定义中，对一个元素设置的宽高都只会应用到这个元素的内容区content-box（box-sizing默认就是这），如果对这个元素设置内边距padding或边框border,那么绘制到屏幕上的盒子的宽高会累加上内边距和边框的宽高。

box-sizing属性可以被用来调整这些表现

- content-box默认值，效果如上

- border-box, 告诉浏览器，要设置的边框和内边距都是包含在width内的，如果一个元素的width为100px,则这个100px既包含border又包含padding宽度，实际的content就是100 -（padding +　border）

  

## 选择器

可以分为五类

1. 简单选择器（根据id、class、标签来选择）
2. 组合选择器（根据他们之间特定管理来选择元素）
3. 伪类选择器（根据特定状态来选取元素）
4. 伪元素选择器（选取元素一部分并设置样式）
5. 属性选择器（根据属性选择元素）

### 简单选择器

规则如下

| 选择器          | 例子            | 描述                                                 |
| --------------- | --------------- | ---------------------------------------------------- |
| .class          | .intro{K:V}     | 选择**所有class="intro"的元素**                      |
| element.class   | a.highlight     | 选择**所有class="highlight"的<a>元素**               |
| .class.class    | .first.second   | 选择**class 属性中同时有 name1 和 name2 的所有元素** |
| #id             | #firstName{K:V} | 选择**所有id="firstName"的元素**                     |
| *               | *{K:V}          | 选择所有元素                                         |
| element         | p{K:V}          | 选择**所有<p>元素**                                  |
| element,element | div,p           | 选择**所有<div>和<p>元素**                           |

### 组合选择器

1. 后代选择器，空格

2. 子选择器 >

3. 相邻兄弟选择器 + 

4. 通用兄弟选择器~

   **下一表格相邻的意思是紧随其后的元素**

   | 选择器               | 示例       | 描述                                        |
   | -------------------- | ---------- | ------------------------------------------- |
   | element 空格 element | div p{K:V} | 选择<div>元素内的<p>元素                    |
   | element>element      | div>p{K:V} | 选择<div>元素的儿子<p>元素                  |
   | element+element      | div+p{K:V} | 选择<div>元素同级相邻的<p>元素（只能为1个） |
   | element~element      | div~p{K:V} | 选择<div>元素同级相邻的兄弟<p>元素          |

   

#### 后代选择器

后代选择器**匹配属于指定元素后代的所有元素**,**空格选择**，

如下例子，选择div元素内所有p元素，**子子孙孙全都选择，区别于下面的子选择器**

~~~css
div p{
    background-color: red;
}
~~~

#### 子选择器

子选择器**匹配属于指定元素子元素**的所有元素，**> 选择**

~~~css
div > p {
  background-color: yellow;
}
~~~



如下例子，必须是**p元素必须是div的儿子元素，而不能是孙子**以及其他的后代

~~~html
<!DOCTYPE html>
<html>
<head>
<style>
div > p {
  background-color: yellow;
}
</style>
</head>
<body>

<h1>子选择器</h1>
<p>子选择器 (>) 选择属于指定元素子元素的所有元素。</p>

<div>
  <p>div 中的段落 1。</p>
  <p>div 中的段落 2。</p>
  <section><p>div 中的段落 3。</p></section> <!-- 非子但属后代 -->
  <p>div 中的段落 4。</p>
</div>

<p>段落 5。不在 div 中。</p>
<p>段落 6。不在 div 中。</p>

</body>
</html>
~~~

#### 相邻选择器

相邻兄弟选择器**匹配所有作为指定元素的相邻同级的元素**

注意：*相邻元素必须具备相同的父级元素，**这里相邻的意思是紧随其后的那个元素***

~~~css
div + p {
    background-color: yellow;
}
~~~

~~~html
<!DOCTYPE html>
<html>
<head>
<style>
div + p {
  background-color: yellow;
}
</style>
</head>
<body>
<div>
  <p>div 中的段落 1。</p>
</div>

<p>段落 3。不在 div 中 </p>
<p>段落 4。不在 div 中。</p>
</body>
</html>
~~~

![image-20210929153210186](https://gitee.com/lwq1229/picture/raw/master/img/image-20210929153210186.png)

#### 兄弟选择器

匹配指定元素同级元素的所有元素，注意**是后面的所有兄弟**

~~~css
div ~ p {
    background-color: yellow;
}
~~~

~~~html
<!DOCTYPE html>
<html>
<head>
<style>
div ~ p {
  background-color: yellow;
}
</style>
</head>
<body>

<div>
  <p>段落 1。</p>
</div>

<p>段落 2。</p>
<p>段落 3。</p>
<code>一些代码。</code>
<p>段落 4。</p>

</body>
</html>
~~~

![image-20210929153339720](https://gitee.com/lwq1229/picture/raw/master/img/image-20210929153339720.png)

### 伪类选择器

伪类用于定义元素的特殊状态

例如, 它可以用于

- 设置鼠标悬停在元素上时的样式
- 为已访问和未访问的链接设置不同的样式
- 设置元素获得焦点的样式

~~~css
selector: pseudo-class{
    K:V
}
~~~

#### 锚伪类

链接能够以不同方式显示

~~~css
a:link{
    color: red;
}
a:visited{
    color: green;
}
a:hover{
    color: #ff00ff;
}
a:active{
    color:#0000ff
}
~~~

**注意：**`a:hover` 必须在 CSS 定义中的 `a:link` 和 `a:visited` 之后，才能生效！`a:active` 必须在 CSS 定义中的 `a:hover` 之后才能生效！伪类名称对大小写不敏感。

#### 伪类和css类结合

伪类可以和css类结合使用

如下,选择所有class='highlight'的a标签，并设置其伪类属性

悬停在a标签上，改变颜色

~~~css
a.highlight:hover{
    color: green;
}
~~~

悬停在div上

~~~css
div:hover{
    background-color: blue;
}
~~~

#### 简单的工具悬停提示

把鼠标悬停在div元素以显示p元素

~~~css
p{
    display: none;
    background-color: yello;
    padding: 20;
}
div:hover{
   display: block; 
}
~~~

~~~html
<!DOCTYPE html>
<html>
<head>
<style>
p {
  display: none;
  background-color: yellow;
  padding: 20px;
}

div:hover p {
  display: block;
}
</style>
</head>
<body>

<div>鼠标移到我上面来显示 p 元素
  <p>哈哈！我在这里！</p>
</div>

</body>
</html>

~~~

![image-20210929161502427](https://gitee.com/lwq1229/picture/raw/master/img/image-20210929161502427.png)

#### first-child伪类

`:first-child`伪类与指定的元素匹配：该元素的第一个子元素

实例

~~~css
p:fist-child{
    color: blue;
}
~~~

~~~html
<!DOCTYPE html>
<html>
<head>
<style>
p:first-child {
  color: blue;
} 
</style>
</head>
<body>

<p>这是一段文本。</p>

<p>这是一段文本。</p>

</body>
</html>
~~~

![image-20210929162746912](https://gitee.com/lwq1229/picture/raw/master/img/image-20210929162746912.png)

#### 所有css伪元素

| 选择器         | 例子            | 描述                    |
| -------------- | --------------- | ----------------------- |
| ::after        | p::after        | 在每个p元素之后插入内容 |
| ::before       | p::before       | 在每个p元素之前插入内容 |
| ::first-letter | p::first-letter | 选择p元素首个字母       |
| ::first-line   | p::first-line   | 选择p元素首行           |
| ::selection    | p::selection    | 选择用户选择的元素部分  |

### 属性选择器

#### [attribute]选择器

**为带有特定属性的html元素设置样式**

实例

~~~css
a[target]{
    background-color: yellow;
}
~~~

~~~html
<!DOCTYPE html>
<html>
<head>
<style>
a[target] {
  background-color: yellow;
}
</style>
</head>
<body>

<h1>CSS [attribute] 选择器</h1>

<p>带有 target 属性的链接获得颜色背景：</p>

<a href="https://www.w3school.com">w3school.com.cn</a>
<a href="http://www.disney.com" target="_blank">disney.com</a>
<a href="http://www.wikipedia.org" target="_top">wikipedia.org</a>

</body>
</html>

~~~

![image-20210929163905810](https://gitee.com/lwq1229/picture/raw/master/img/image-20210929163905810.png)

#### [attribute="value"]选择器

[attribute="value"]用于选择带有特定属性和值的元素

~~~css
a[target="_blank"] {
    background-color: yellow;
}
~~~

实例

~~~html
<!DOCTYPE html>
<html>
<head>
<style>
a[target="_blank"]{
	border: 1px solid;
}
</style>
</head>
<body>

<a target="_blank">fk</a>

</body>
</html>

~~~

![image-20210929164634641](https://gitee.com/lwq1229/picture/raw/master/img/image-20210929164634641.png)

#### [attribute~='value']

[attribute~="value"] 选择器选取属性值包含指定词的元素。

下例选取 title 属性包含 "flower" 单词的所有元素：

~~~css
[title~="flower"] {
  border: 5px solid yellow;
}
~~~

上面的例子会匹配以下属性的元素：title="flower"、title="summer flower" 以及 title="flower new"，但不匹配：title="my-flower" 或 title="flowers"。

#### [attribute|='value']

[attribute|="value"] 选择器用于选取指定属性以指定值开头的元素。

下例选取 class 属性以 "top" 开头的所有元素：

**注释：值必须是完整或单独的单词，或者后跟连字符的，**比如 class="top-text"。

~~~html
<!DOCTYPE html>
<html>
<head>
<style>
[class|=top] {
  background: yellow;
}
</style>
</head>
<body>

<h1>CSS [attribute|="value"] 选择器</h1>

<h1 class="top-header">Welcome</h1>
<p class="top-text">Hello world!</p>
<p class="topcontent">Are you learning CSS?</p>

</body>
</html>
~~~

![image-20210929165812615](https://gitee.com/lwq1229/picture/raw/master/img/image-20210929165812615.png)

#### [attribute^='value']

[attribute^="value"] 选择器用于选取指定属性以指定值开头的元素。

下例选取 class 属性以 "top" 开头的所有元素：

**提示：**值不必是完整单词！

#### [attribute$='value']

#### [attribute*="value"] 选择器

#### 场景

若需为不带 class 或 id 的表单设置样式，属性选择器会很有用：

~~~css
input[type="text"] {
  width: 150px;
  display: block;
  margin-bottom: 10px;
  background-color: yellow;
}

input[type="button"] {
  width: 120px;
  margin-left: 35px;
  display: block;
}
~~~

## dispaly属性

`display`属性规定如何显示元素

每一个html元素都有一个默认的display值，具体取决于它的元素类型。大多数为block或inline

### 块级元素

**总是从新的一行开始，并且占据可用的全部宽度**

常见的块级元素

- \<div\>
- \<p\>
- h1 ~ h6
- \<form\>
- header
- footer
- section

### 行内元素

**内联元素不从新行开始，仅占用所需的宽度。**

- <span>
- <a>
- <img>

### display:none

用于显示或隐藏元素，而无需删除和重新创建他们，并且页面将显示为元素似乎不在其中

使用CSS和JS在但单击时显示元素，**通过更改document.style对象的display属性来控制元素显示或隐藏**

~~~html
<!DOCTYPE html>
<html>
<head>
<style>
#panel, .flip {
  font-size: 16px;
  padding: 10px;
  text-align: center;
  background-color: #4CAF50;
  color: white;
  border: solid 1px #a6d8a8;
  margin: auto;
}

#panel {
  display: none;
}
</style>
</head>
<body>

<p class="flip" onclick="myFunction()">点击这里来显示面板</p>

<div id="panel">
  <p>该面板包含一个 div 元素，默认情况下该元素是隐藏的（display: none）。</p>
  <p>它使用 CSS 进行样式设置，我们使用 JavaScript 来显示它（display: block）。</p>
  <p>工作原理：请注意，带有 class="flip" 的 p 元素有 onclick 属性。当用户单击 p 元素时，将执行一个名为 myFunction() 的函数，该函数将 id="panel" 的 div 样式从 display:none（隐藏）更改为 display:block（可见）。</p>
</div>

<script>
function myFunction() {
  document.getElementById("panel").style.display = "block";
}
</script>

</body>
</html>
~~~



![image-20210930173308072](https://gitee.com/lwq1229/picture/raw/master/img/image-20210930173308072.png)



<iframe  
 width=300 
 src="file:///D:/Desktop/Learing/%E5%AD%A6%E4%B9%A0/lwq.html"  
 frameborder=0  
 allowfullscreen>
 </iframe>

## 定位

position属性规定应用于元素的定位方法的类型

- static，默认的
- relative
- fixed
- absolute
top、bottom ， right，left则规定具体位置

### static定位

HTML元素默认情况下的定位方式为static（静态）

静态定位的元素，不受top、bottom、left和right属性的影响

它始终根据正常的流进行定位

### relative定位

相对定位即相对于其原来的位置进行定位

可以设置top、bottom、left、right属性的值来进行位置的调整**，但是不会对其余内容进行调整来自适应元素留下的空间**，***即原来的元素空间会影响其他元素***

```
div.relative {
  position: relative;
  left: 30px;
  border: 3px solid #73AD21;
}
```

### absolute定位

绝对定位，***相对于最近定位的祖先元素进行定位***，如果元素没有祖先，他将使用body元素作为父元素

> **注意：最近定位的祖先元素是指除了static以外的元素**

~~~html
<html>
<head>
<style type="text/css">
p.pos_abs
{
position:absolute;
bottom: 0px;
right: 0px;
}
</style>
</head>

<body>

<p>这里class为pos_abs的标签定位的祖先是第一个div，因为其父级div定位是static不合要求</p>
<div style="height:300; width:300; position:relative; border:solid">
	<div style="height:200; width:200; position:static; border:solid">
		<p class="pos_abs">这是带有绝对定位的标题</p>
	</div>
</div>
</body>

</html>

~~~



### fixed定位

设置了position为此值的话，则相对于窗口定位，这意味着及时滚动页面，它的位置不会变动，可以使用top、bottom、left、right设置其相对窗口的位置

~~~css
div.fixed {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  border: 3px solid #73AD21;
}
~~~

### 重叠元素

在对元素进行定位时，他们可以与其他元素重叠

`z-index`属性指定元素的堆叠顺序

元素可以设置正负值

**具有较高堆叠顺序的元素始终位于较低的之前**

> 如果两个定位的元素重叠而未指定z-index，则在代码后的元素显示在上层
