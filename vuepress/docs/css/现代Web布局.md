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

## Flexbox 中空间是如何分配的？

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