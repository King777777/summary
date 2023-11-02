掘金《现代Web布局学习》

## 内在、外在尺寸

### 外在尺寸

外在尺寸是指用精确的值指定元素尺寸。举个例子：

```css
css复制代码.c-button {
    width: 100px;
}
```

这个按钮的尺寸是 `100px`，这就是外在尺寸了。再比如一个 `<div>` 元素，它默认是个块级元素，就是说它的宽默认等于 `100%` 父元素的宽。

有时，我们**想要根据元素实际的内容来设置尺寸**，这个时候，使用外在尺寸就没有用了。

### 内在尺寸

1. `min-content` 值表示**内在最小尺寸**，它等于元素内容里最长的那个单词宽度。看下图

![image-20231030154108037](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231030154108037.png)

2. **max-content**， `max-content` 表示元素的**内在首选宽度**（intrinsic preferred width），**其实就是元素内容长度**。

   注意观察，元素宽度等于标题宽度了。这个宽度是动态的，随着标题内容的改变，max-content 所代表的值也相应改变。

![image-20231030154221419](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231030154221419.png)

3. **fit-content**

这个属性可以看成是 `min-content` 和 `max-content` 的结合。available表示可用空间

> **`fit-content` 默许使用 `max-content`**；如果 available < `max-content`，那就使用 available；如果 available < `min-content`，那就使用 `min-content`。







## 内联轴和块级轴

![image-20231026095013253](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231026095013253.png)



![image-20231026100002508](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231026100002508.png)

简而言之，**块元素遵循流方向，内联元素遵循写入方向, width，height是元素的物理属性，对应的逻辑属性是inline-size, block-size**

## Flex

概念集合

![c30bdb31294e40f8a98768024de75e09~tplv-k3u1fbpfcp-jj-mark_1874_0_0_0_q75](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/c30bdb31294e40f8a98768024de75e09~tplv-k3u1fbpfcp-jj-mark_1874_0_0_0_q75.png)

Flexbox 布局模块除了概念多之外，就是可用于 Flexbox 布局的属性也多，这些属性分为两个部分，其中一部分用于 **Flex 容器** 上，另一部分用于 **Flex 项目** 上。

下面是flex容器的属性

![image-20231030111330562](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231030111330562.png)



**flex容器属性**需要注意的点

- **align-content是只有在多行时才生效，也就是flex-wrap必须为wrap活wrap-reverse，默认值为stretch，如果没有指定flex子项目的height则拉伸子项目，指定了子项目height但align-content属性值为stretch虽然不会拉伸，但子项目每一行高度是拉伸的，如下图**

  ![image-20231030143007463](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231030143007463.png)





下面是可用于flex项目的属性

![image-20231030111527742](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231030111527742.png)

**align-items的默认值是stretch,也就是拉伸，如果未指定子项目高度，那么就会在垂直方向拉伸，如果指定了子元素告诉，则不会拉伸**

### flex子项目属性

#### Flexbox 中空间是如何分配的？

1. **计算 Flex 容器内的可用空间** 。Flex 容器的可用空间指的是 Flex 容器的主轴尺寸（Main Size）减去其 **边框宽度（`border-width`）** ，**内边距（`padding`）** 、**间距（`gap`）** 和 **Flex 项目的外边距（`margin`）**

#### flex属性

1. 默认值, 等于flex: 0 1 auto
2. `auto` ：Flex 项目会根据自身的 `width` （或 `inline-size`）和 `height` （或 `block-size`）来确定尺寸，但 Flex 项目会根据 Flex 容器剩余空间进行伸缩。其相当于 `flex: 1 1 auto` 。
3. 

`flex` 属性的**单值语法**时，其值必须为以下其中之一：

- 一个无单位的数值（`<number>`），比如 `flex: 1` ，这个时候它（即`1`）会被当作 `flex-grow` 属性的值；

- 一个有效的长度值（`<length-percentage>` ），比如 `flex: 30vw` ，这个时候它（即 `30vw`）会被当作 `flex-basis` 属性的值；

- 关键词 `none` 、 `auto` 或 `initial` （即初始值）。

~~~css

.item {
  flex: 1;
    
  /* 等同于 */
  flex-grow: 1;
  flex-shrink: 1; 
  flex-basis: 0%; 
}
​
.item {
  flex: 30vw;
    
  /* 等同于 */
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 30vw;
}

~~~



`flex` 属性的**双值语法**，其第一个值必须为 **一个无单位的数值（`<number>`）** ，并且它会**被当作** **`flex-grow`** **属性的值** ；第二个值必须为以下之一：

- 一个无单位的数值（`<number>`），它会被当作 `flex-shrink` 属性的值；

- 一个有效的长度值（`<length-percentage>`），它会被当作 `flex-basis` 属性的值。

~~~css

.item {
  flex: 1 2;
  
  /* 等同于 */
  flex-grow: 1;
  flex-shrink: 2;
  flex-basis: 0%;
}
​
.item {
  flex: 2 30vw;
  
  /* 等同于 */
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: 30vw;
}

~~~





`flex` 属性的**三值语法**：

- 第一个值必须是一个无单位的数值（`<number>`），并且它会被当作 `flex-grow` 属性的值；

- 第二个值必须是一个无单位的数值（`<number>`），并且它会被当作 `flex-shrink` 属性的值；

- 第三个值必须是一个有效的长度值（`<length-percentage>`），并且它会被当作 `flex-basis` 属性的值。

~~~css

.items {
  flex: 2 1 200px;
    
  /* 等同于 */
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: 200px;
}
​
.item {
  flex: 30vw 2 1;
  
  /* 等同于 */
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: 30vw;
}

~~~



**此外**

Flexbox 布局中，很多开发者为了**让所有 Flex 项目尺寸相等** ，习惯性使用 `flex: 1` 

这里有一个**误区**，**大多数开发者都误认为，只要在 Flex 项目上显式设置了** **`flex:1`** **，所有 Flex 项目的宽度（或高度）就相等。** 事实并非如此，比如下图，由于第一个 Flex 项目的内容就要比其他 Flex 项目略宽一点，即使在所有 Flex 项目设置了 `flex:1` ，也没有实现所有 Flex 项目等宽的效果：

![image-20231030145121283](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231030145121283.png)

如果要真的实现所有 Flex 项目宽度相等，**除了在 Flex 项目上设置为 `flex:1` 之外，还需要显式设置 `min-width` 值为 `0`** 

~~~css
.item {
  flex: 1;
  min-width: 0;
}

~~~

![image-20231030145711621](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231030145711621.png)

**如果 Flex 项目未显式设置** **`flex-basis`** **属性的值，浏览器会采取 Flex 项目上的** **`width`** **属性的值** 。

### flex项目宽度

**如果 Flex 项目未显式指定** **`flex-basis`** **属性的值，那么** **`flex-basis`** **将回退到** **`width`** **属性；如果 Flex 项目同时都未显式指定** **`flex-basis`** **和** **`width`** **属性的值，那么** **`flex-basis`** **将回退到基于 Flex 项目的内容计算宽度** 。

如下图，flex-basis为auto及未设置宽度，则取项目的width值，如果项目的width也没有设置，则取内容宽度

![GIF 2023-10-31 14-48-53](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/GIF%202023-10-31%2014-48-53.gif)



## flex构建的经典布局

### 水平垂直居中

首先，水平垂直居中常见的效果有两种，单行（或单列）水平垂直居中和多行（或多列）水平垂直居中。它对应的 HTML 结构可能会像下面这样：

~~~html
<!-- 单行（或单列）水平垂直居中 -->
<div class="container--single">
    <img src="avatar.png" alt="需要在容器中水平垂直居中" />
</div>

<!-- 多行（或多列）水平垂直居中 -->
<div class="container--multiple">
    <img src="avatar" alt="我们要水平垂直居中" />
    <h3>大漠|W3cplus.com</h3>
    <p>掘金小册.现代Web布局</p>
</div>

~~~

在 Flexbox 中，可以在 **Flex 容器上使用**：

- `justify-content` 的 `center` 让 Flex 项目水平居中。
- 对于单行而言，可以使用 `align-items` 的 `center` 让 Flex 项目垂直居中；此外，使用 `align-content` 的 `center` 也可以让 Flex 项目垂直居中，但需要显式设置`flex-wrap` 的值为 `wrap` 或 `wrap-reverse`。
- 对于多行而言（`flex-direction` 显式设置了 `column`），则使用 `align-items` 的 `center` 让所有 Flex 项目水平居中，再配合 `justify-content` 的 `center` 实现垂直方向居中

使用flex布局实现单个元素水平垂直居中有以下两种方法：

~~~css
/* 单个元素水平垂直居中, 容器属性设置如下 */
.container--single {
  display: flex;
  justify-content: center;
  align-items: center;
}

~~~

![image-20231031092052804](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231031092052804.png)



也可以在子项目上设置margin：auto实现子项目的水平垂直居中

~~~css
.container--single {
    display: flex;
}

.item {
    margin: auto;
}
~~~



![image-20231031092512338](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231031092512338.png)



多行元素水平垂直居中，和单个不同的点就是改变了flex-direction为colomn，也就是让元素垂直排列，然后居中

~~~html
<div class="container--multiple">
    <img src="avatar" alt="我们要水平垂直居中" />
    <h3>大漠|W3cplus.com</h3>
    <p>掘金小册.现代Web布局</p>
</div>
~~~



~~~css
/* 多行（或多列）水平垂直居中 */
.container--multiple {
    flex-direction: column; 
    align-items: center;     /* 水平居中 */
    justify-content: center; /* 垂直居中 */
}
~~~

![image-20231031093441631](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231031093441631.png)

### 等高布局

等高布局的核心就是，align-items 或 align-content（需要flex-wrap为wrap||wrap-reverse）、的默认值stretch会拉伸子项目的高度（如果父容器没有指定高度，那么以子项目那一行最高的高度为主）

![image-20231031112101185](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231031112101185.png)

如果不采用 Flexbox 布局技术方案，当未给卡片设置一个**最小高度**时，往往实现的效果会像下图这样：

![image-20231031112140533](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231031112140533.png)

使用flex布局实现，相关代码如下

~~~html
<div class="cards">
    <div class="card">
        <figure>
            <img src="thumb.png" alt="缩略图" />
        </figure>
        <h3>Card Title</h3>
        <p>Card Describe</p>
        <button>Button</button>
    </div>
    <!-- 其他 Card -->
</div>

~~~

与布局相关css代码

~~~css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  flex: 1 1 300px;
}

~~~

在这个示例中，卡片`.card` 和其容器 `.cards` 都是 Flex 容器，并且每张卡片的初始化尺寸是 `300px` （即 `flex-basis` 的值为 `300px`），而且容器 `.cards` 无法容纳所有卡片 `.card` 时，它会自动换行，并且最后一个卡片宽度变宽了，这是因为flex项目的卡片 `.card` 设置了`flex-grow:1`（**改成 0 就不会占满了**） 。



![image-20231031112819029](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231031112819029.png)

因为，Flex 容器 `.cards` 的 `align-items` 属性的默认值是 `stretch` ，如果没有调整 `align-items` 属性的值，那么该容器中的所有子元素（即 Flex 项目 `.card`）在侧轴方向就会被拉伸，并且等于侧轴尺寸。

虽然说，将 `.cards` 创建为一个 Flex 容器就实现了卡片等高的效果，但这个效果还不是设计师所期待的，比如第二和第三张卡，因卡片标题和描述内容比第一张卡片更少，造成按钮偏上，卡片底部留下一定的空白空间（设计师期望的是，所有卡片的按钮都能在底部对齐）：

![image-20231031140345473](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231031140345473.png)

要实现上图左侧的效果，在 Flexbox 布局中也有多种方式，比如我们这个示例，**每张卡片 `.card` 本身就是一个 Flex 容器，你只需要将剩余空间分配给卡片中的 `p` 元素（描述文本）即可，就是将其 `flex-grow` 值设置为 `1`** ：

~~~css
.card p {
    flex-grow: 1;
}

~~~

也可以设置按钮的margin-top为auto，因为是flex布局所以button会跑到最底下

~~~css
.card button {
    margin-top: auto;
}

~~~

如果你不希望按钮宽度占满整个卡片，还可以改变 `button` 的 `algin-self` 值，比如：

![image-20231031140713036](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231031140713036.png)

### 均分列布局

**均分列又称为等分列或等列，它的最大特征就是列的宽度是相等的** ！

例如常见的app底部布局

![image-20231031172313370](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231031172313370.png)

下面是他的hmtl

~~~html
<footer>
    <div class="item">
        <Icon /> Icon name
    </div>
    <!-- 省略其他的菜单项 -->
</footer>

footer {
    display: flex;
}

.item {
    flex: 1;
    min-width: 0; /* 这行代码很重要 */
}

/* 菜单项图标和文字的布局 */
.item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

~~~

**子项目使用 `flex:1` 来均分列（即平均分配 Flex 容器可用空间）并不是完全可以的，它需要配合 `min-width:0`** 一起使用。因为在 Flex 项目上显式设置 `flex:1` 时已重置了 `flex` 的初始值（`flex: 0 1 auto`），浏览器会把 `flex:1` 计算成：

~~~css
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0% /* 其实只要是一个带单位的长度就行了，因为如果是0会与简写有歧义冲突，所以规则要求是有单位的0的长度 */
~~~

因为flex-basis是0%，所以项目以min-content为准，但是如果项目的min-cotent都大于其他子项目，那么就不能均等分列了，如下图

![image-20231031180200974](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231031180200974.png)

**但是子项目最后计算的长度或者高度还和min-width，min-height挂钩，于是我们设置它为0，然后在flex-grow的作用下，就实现了均等分列的布局**

~~~css
.container{
  display: flex;
  gap:10px;
}
.item{
  flex: 1;
  min-width: 0px;
}
~~~

### sticky foot

看图说话

![image-20231101161857184](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231101161857184.png)

页脚（Footer）的位置会随着页头（Header）和主内容（Content）高度而变化，但当页头和主内容内容较小，其高度总和小于浏览器视窗高度时，页脚要始终位于浏览器视窗底部。

这其实就时我们两栏布局的右半部分的一种变体

![image-20231101162058590](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231101162058590.png)

对于 Sticky Footer 的布局，使用 Flexbox 再容易不过了，只需要保持主内容容器（它也是一个 Flex 项目）能随着它的父容器（Flex 容器）的剩余空间扩展。简单地说，给主内容设置一个 `flex-grow` 值为 `1` 即可。具体代码如下：

~~~html
<body>
    <header>
    </header>
    <main>
    </main>
    <footer>
    </footer>
</body>
body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

main {
    flex-grow: 1;
}

~~~

**需要注意的是，这里我们设置body的高度min-height：100vh而不是height：100vh，这两者的相同点就是内容区域的高度大于body时，body这一层都可以滚动y轴，不同点就是前者在main元素内设置的overflow-y不会生效（也就是不能在内容区域中滚动了），而后者可以在main元素内设overflow-y属性（内容区域可以滚动）**，前者适合手机，后者适合pc

原因是，设置min-height：100vh，如果容器高度大于100vh，则容器高度取较大值，内容区域就满足高度不会出现滚动，而设置容器高度100vh，如果内容区域可以滚动就不会扩大高度，内容区域不可以滚动则会撑开容器，也会导致外围出现滚动

1. body设置min-height：100vh或height:100vh，外围body都可以滚动

   ![image-20231101170914930](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231101170914930.png)

2. height：100vh，content设置overflow-y：auto，内容区域可以滚动，body高度没有超出视口

![image-20231101171155311](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231101171155311.png)

### 百分百无滚动

其实和上面这个差不多，就是去掉页脚，然后在内容区域滚动

![image-20231102110934516](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231102110934516.png)

~~~html
<!-- 整个 Modal 高度是 100vh -->
<modal>
    <modal-header>
        <!-- 固定高度 -->
    </modal-header>
    <modal-content>
        <!-- 滚动容器：flex: 1 -->
    </modal-content>
</modal>

~~~

很经典的一个flex布局

~~~CSS

modal {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

modal-header {
    height: 120px; /* 一个固定高度值 */
}

modal-content {
    flex: 1 1 0%;     /* 或 flex: 1*/
    overflow-y: auto; /* 内容超过容器高度时出现滚动条 */
}

~~~

看上去似乎没有问题，但实际上我们在 iOS 系统上触发了一个 Flexbox 的 Bug，就是在**滚动容器上显示设置** **`overflow-y:scroll`** **，滚动依旧失效** 。造成这个 Bug 是因为我们上面的 CSS 代码触发了 Flex 项目的边缘情况。如果要避免这个 Bug 的出现，需要对结构做出一定的调整：

~~~HTML

<div class="main-container"> <!-- flex-direction: column -->
    <div class="fixed-container">Fixed Container</div><!-- eg. height: 100px -->
    <div class="content-wrapper"><!-- min-height: 0, 这个很重要 -->
        <div class="content"><!-- 滚动容器，overflow-y: auto & flex: 1 -->
            内容
        </div>
    </div>
</div>

~~~

对应css

~~~css
.main-container {
    display: flex;
    flex-direction: column;
}

.fixed-container {
    height: 100px; /* 固定容器的高度值，任何一个你想的固定值 */
}

.content-wrapper {
    flex: 1;       /* 可以是 flex: 1 1 0% */
    min-height: 0; /* 这个很重要 */
    display: flex;
}

.content {
    flex: 1;
    overflow-y: auto; /* 内容超出滚动容器高度时，会出现滚动条 */
}

~~~

其实就是在原先的内容区域加一个wrapper，并设置其min-height：0

> 感觉没啥必要，第一种感觉就满足了

### 12列网格布局

使用flex实现的12列网格布局

![image-20231102140701512](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231102140701512.png)

~~~html
<!-- 12列：flex 容器中包含 12 个 flex 项目 -->
<flex-container>
    <flex-item> 1 of 12</flex-item>
    <!-- 中间省略 n个 flex-item -->
    <flex-item> 1 of 12</flex-item>
</flex-container>

~~~

css也很简单

~~~css
.flex-container{
  display: flex;
  gap: 1rem;
}
.flex-item{
  flex: 1 1 0%;
  min-width: 0; /* 确保一定等分*/
}

~~~

当然，你也可以根据实际需要，给 Flex 项目指定明确的值，即给 Flex 项目的 `flex-basis` 初始化一个值，同时 `flex-grow` 和 `flex-shrink` 都重置为 `0` ，告诉浏览器，该 Flex 项目不能扩展和收缩：

~~~css

.flex-item{
  flex: 0 0 33.3%;
  min-width: 0;
}
~~~



- `50%` 、`33.33%` 和`25%` 标记的列，表示`flex-basis` 的值为  ，同时 `flex-grow` 和 `flex-shrink` 都重置为 `0`

![image-20231102141229643](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231102141229643.png)



### 九宫格

九宫格简单地说就是一个 `3 × 3` 的网格（三行三列），它也常用于 Web 布局中，而且你可以基于它演变出很多种不同的布局风格：

![image-20231102151221823](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231102151221823.png)

虽然使用 Flexbox 可以构建一个网格布局，但 Flexbox 布局毕竟是一种**一维布局** ，用它来构建这样的九宫格布局效果，还是有一定的局限性，需要通过 HTML 结构强力配合才能实现。比如下面这个示例：

![image-20231102151313445](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231102151313445.png)

类似的html代码

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="./index.css" rel="stylesheet" />
  <title>flex格子</title>
</head>
<body>
<div class="container">
  <div class="left">left</div>
  <div class="right">
    <div class="right-item">1</div>
    <div class="right-item">2</div>
    <div class="right-item">3</div>
    <div class="right-item">4</div>
    <div class="right-item">5</div>
    <div class="right-item">6</div>
    <div class="right-item">7</div>
    <div class="right-item">8</div>
    <div class="right-item">9</div>
  </div>
</div>
</body>
</html>
~~~

对应的css

~~~css
*, ::before, ::after{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.container{
  width: 600px;
  height: 400px;
  background-color: #90ffa8;
  display: flex;
  padding: 12px;
  gap: 12px;
}
.left{
  flex: 6 1 0%;
  min-width: 0;
  background-color: azure;
}
.right{
  flex: 4 1 0%;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  background-color: darkgrey;
}
/* 九宫格这部分的宽度需要计算 */
.right-item{
  flex: 0 0 calc((100% - 24px)/3);
  min-width: 0;
  background-color: bisque;
}
~~~

![image-20231102171740982](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/image-20231102171740982.png)

> 列宽（flex-basis） = （100%容器宽度（Flex 容器）- （列数 - 1）× (列间距)）÷ 列数