# flex布局

## what

flex弹性布局

任何一个容器都可以指定为flex如ul

行内元素也可以使用flex布局

![image-20220220233709914](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20220220233709914.png)

~~~css
.box{
	display: flex;
}
~~~

## 基本概念

![image-20210722181457064](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20210722181457064.png)



主轴指的是项目排列方向的周，交叉轴指的是与主轴垂直的

### 容器属性

#### flex-direction 

**决定主轴方向**，即子项目排列方向，如下分别为左右 | 右左| 上下| 下上

一定要注意，flex-direction决定主轴是哪一个，比如row，则主轴就是横轴，如果设置为column，主轴增长方向是上->下，则主轴变成了竖轴，后面的justify-contetn，align-items都受到主轴方向影响

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

![image-20210722181739042](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20210722181739042.png)

它可能有4个值。

> - `row`（默认值）：主轴为水平方向，起点在左端。
> - `row-reverse`：主轴为水平方向，起点在右端。
> - `column`：主轴为垂直方向，起点在上沿。
> - `column-reverse`：主轴为垂直方向，起点在下沿。

#### flex-wrap换行

![image-20210722181933978](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20210722181933978.png)

它可能取三个值。

（1）`nowrap`（默认）：不换行。

（2）`wrap`：换行，第一行在上方。

（3）`wrap-reverse`：换行，第一行在下方。

#### flex-flow弹性流

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

> ```css
> .box {
> flex-flow: <flex-direction> || <flex-wrap>;
> }
> ```

#### justify-content主轴对齐方式

justify-content定义了在主轴上的对其方向

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

> - `flex-start`（默认值）：左对齐
> - `flex-end`：右对齐
> - `center`： 居中
> - `space-between`：两端对齐，项目之间的间隔都相等。
> - `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

#### align-items交叉轴对齐方式

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

![image-20210722183004762](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20210722183004762.png)

可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

> - `flex-start`：交叉轴的起点对齐。
>
> - `flex-end`：交叉轴的终点对齐。
>
> - `center`：交叉轴的中点对齐。
>
> - `baseline`: 项目的第一行文字的基线对齐。
>
> - #### `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

#### align-content

`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

> ```css
> .box {
> align-content: flex-start | flex-end | center | space-between | space-around | stretch;
> }
> ```

![image-20210722222356479](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20210722222356479.png)

该属性可能取6个值。

> - `flex-start`：与交叉轴的起点对齐。
> - `flex-end`：与交叉轴的终点对齐。
> - `center`：与交叉轴的中点对齐。
> - `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
> - `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
> - `stretch`（默认值）：轴线占满整个交叉轴。

### 项目属性

以下6个属性设置在项目上。

> - `order`
> - `flex-grow`
> - `flex-shrink`
> - `flex-basis`
> - `flex`
> - `align-self`

#### order属性

定义项目的排列顺序，数值越小，排列越靠前，默认为0

```css
.item {
  order: <integer>;
}
```

![image-20210722222737936](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20210722222737936.png)

#### flex-grow

定义项目的放大比例，默认为0，不放大

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

![image-20210722222840298](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20210722222840298.png)

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

#### flex-shrink

定义缩小比例，默认为1，即如果空间不够，则默认缩小，设置为0则不缩小

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

![image-20210722223114219](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20210722223114219.png)

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

#### flex-basis

定义在分配多余空间之前，项目占据主轴的空间main-size，默认为auto即本身大小，根据此属性来计算是否有多余空间

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

#### flex属性

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

> ```css
> .item {
> flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
> }
> ```

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

####  align-self属性

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

> ```css
> .item {
> align-self: auto | flex-start | flex-end | center | baseline | stretch;
> }
> ```

![img](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/bg2015071016.png)

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

~~~html
<!DOCTYPE html>
<html>
<head>
<style>
.flexContainer {
  display: flex;
  flex-direction: row;
  background-color: gray;
  width: 800px;
  height: 50px;
}
.flexItem {
display: flex;
  color: white;
  flex:1;
	flex-wrap: wrap;
}
.third1 {
    background-color: green;
    height: 20px;
}
.third2 {
background-color: orange;
    height: 20px;
}
.third3 {
background-color: black;
    height: 20px;
}

</style>
</head>
<body>
<div class="flexContainer">
      <div class="flexItem" style="background-color: red">
      <div class="third1" style="width: 50px">1-a</div>
      <div class="third2" style="width: 150px">2-a</div>
       <div style="width: 30px" class="third3">3-a</div>
      </div>
      <div class="flexItem" style="background-color: blue">b</div>
      <div class="flexItem" style="background-color: green">c</div>
      <div class="flexItem" style="background-color: black">d</div>
</div>



</body>
</html>

~~~

