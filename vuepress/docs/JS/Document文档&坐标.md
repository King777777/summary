# DOM树

根据文档对象模型，每个HTML标签都是一个对象，标签内的文本也是一个对象

这些对象包含很多属性

- innerHTML -节点的HTML内容
- offsetWidth-节点的宽度
- ...等等

## DOM例子

~~~html
<!DOCTYPE HTML>
<html>
    <head>
      <title>About elk</title>  
    </head>
    <body>
        The truth about elk
    </body>
</html>
~~~

DOM将HTML表示为标签的树形结构，看起来如下所示

![image-20220615155235396](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/imgimage-20220615155235396.png)

**标签被称为元素节点**，并形成了树形结构，html是根节点，head和body是其子项

**元素内的文本形成文本节点**，被标记为`#text`,一个文本节点只包含一个字符串，并且它一定是叶子

请注意文本节点中的特殊字符：

- 换行符：`↵`（在 JavaScript 中为 `\n`）
- 空格：`␣`

## **表格永远有<tbody>**

表格是一个有趣的“特殊的例子”。按照 DOM 规范，它们必须具有 `<tbody>` 标签，但 HTML 文本可能会忽略它。然后浏览器在创建 DOM 时，自动地创建了 `<tbody>`。

对于 HTML：

```markup
<table id="table"><tr><td>1</td></tr></table>
```

![image-20220615160420921](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/imgimage-20220615160420921.png)

## 其他节点类型

除了元素节点和文本节点，还有其他类型的节点

例如，**注释节点**

~~~html
<!DOCTYPE HTML>
<html>
<body>
  The truth about elk.
  <ol>
    <li>An elk is a smart</li>
    <!-- comment -->
    <li>...and cunning animal!</li>
  </ol>
</body>
</html>
~~~

![image-20220615161129960](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/img/imgimage-20220615161129960.png)

在这里我们可以看到一个新的树节点类型 — *comment node*，被标记为 `#comment`，它在两个文本节点之间。

我们可能会想 — 为什么要将注释添加到 DOM 中？它不会对视觉展现产生任何影响吗。但是有一条规则 — 如果一些内容存在于 HTML 中，那么它也必须在 DOM 树中。

**HTML 中的所有内容，甚至注释，都会成为 DOM 的一部分。**

甚至 HTML 开头的 `<!DOCTYPE...>` 指令也是一个 DOM 节点。它在 DOM 树中位于 `<html>` 之前。很少有人知道这一点。我们不会触及那个节点，我们甚至不会在图表中绘制它，但它确实就在那里。

表示整个文档的 `document` 对象，在形式上也是一个 DOM 节点。

一共有 [12 种节点类型](https://dom.spec.whatwg.org/#node)。实际上，我们通常用到的是其中的 4 种：

1. `document` — DOM 的“入口点”。
2. 元素节点 — HTML 标签，树构建块。
3. 文本节点 — 包含文本。
4. 注释 — 有时我们可以将一些信息放入其中，它不会显示，但 JS 可以从 DOM 中读取它。

# 遍历DOM

DOM允许我们对元素和它们中的任何内容操作，首先需要获取对应的DOM对象

**对 DOM 的所有操作都是以 `document` 对象开始。它是 DOM 的主“入口点”。从它我们可以访问任何节点**。

这里是一张描述对象间链接的图片，通过这些链接我们可以在 DOM 节点之间移动。

![image-20220615161632269](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/img/imgimage-20220615161632269.png)

## documentElement和body

最顶层的这两个节点，可以直接通过document的属性来使用

```
<html>` = `document.documentElement
```

最顶层的 document 节点是 `document.documentElement`。这是对应 `<html>` 标签的 DOM 节点。

```
<body>` = `document.body
```

另一个被广泛使用的 DOM 节点是 `<body>` 元素 — `document.body`。

```
<head>` = `document.head
```

`<head>` 标签可以通过 `document.head` 访问。

**这里有个问题：`document.body` 的值可能是 `null`**

**脚本无法访问在运行时不存在的元素**。

尤其是，如果一个脚本是在 `<head>` 中，那么脚本是访问不到 `document.body` 元素的，因为浏览器还没有读到它。

**在 DOM 的世界中，`null` 就意味着“不存在”**

在 DOM 中，`null` 值就意味着“不存在”或者“没有这个节点”。

## 子节点

**childNodes集合列出了所有子节点，包括文本节点**

~~~html
<html>
<body>
  <div>Begin</div>

  <ul>
    <li>Information</li>
  </ul>

  <div>End</div>

  <script>
    for (let i = 0; i < document.body.childNodes.length; i++) {
      alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
    }
  </script>
  ...more stuff...
</body>
</html>
~~~

**请注意这里的一个有趣的细节。如果我们运行上面这个例子，所显示的最后一个元素是 `<script>`。**实际上，文档下面还有很多东西，但是**在这个脚本运行的时候，浏览器还没有读到下面的内容，所以这个脚本也就看不到它们。**

**`firstChild` 和 `lastChild` 属性是访问第一个和最后一个子元素的快捷方式。**

它们只是简写。如果元素存在子节点，那么下面的脚本运行结果将是 true：

```javascript
elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
```

这里还有一个特别的函数 `elem.hasChildNodes()` 用于检查节点是否有子节点。

> **DOM 集合是只读的**
>
> DOM 集合，甚至可以说本章中列出的 **所有** 导航（navigation）属性都是只读的。
>
> 我们不能通过类似 `childNodes[i] = ...` 的操作来替换一个子节点。

> **DOM 集合是实时的**
>
> 除小部分例外，几乎所有的 DOM 集合都是 **实时** 的。换句话说，它们反映了 DOM 的当前状态。
>
> 如果我们保留一个对 `elem.childNodes` 的引用，然后向 DOM 中添加/移除节点，那么这些节点的更新会自动出现在集合中。

## 父节点和兄弟节点

下一个兄弟节点在 `nextSibling` 属性中，上一个是在 `previousSibling` 属性中。

可以通过 `parentNode` 来访问父节点。

## 纯元素导航

上面列出的导航（navigation）属性引用 **所有** 节点。例如，在 `childNodes` 中我们可以看到文本节点，元素节点，甚至包括注释节点（如果它们存在的话）。

但是对于很多任务来说，我们并不想要文本节点或注释节点。我们希望操纵的是代表标签的和形成页面结构的元素节点。

所以，让我们看看更多只考虑 **元素节点** 的导航链接（navigation link）：

![image-20220615162636919](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/imgimage-20220615162636919.png)

**为什么是 `parentElement`? 父节点可以不是一个元素吗？**

`parentElement` 属性返回的是“元素类型”的父节点，而 `parentNode` 返回的是“任何类型”的父节点。这些属性通常来说是一样的：它们都是用于获取父节点。

唯一的例外就是 `document.documentElement`：

```javascript
alert( document.documentElement.parentNode ); // document
alert( document.documentElement.parentElement ); // null
```

## 表格的导航

到现在，我们已经描述了基本的导航（navigation）属性。

方便起见，某些类型的 DOM 元素可能会提供特定于其类型的其他属性。

表格（Table）是一个很好的例子，它代表了一个特别重要的情况：

<table> 元素支持 (除了上面给出的，之外) 以下这些属性:

- `table.rows` — `<tr>` 元素的集合。
- `table.caption/tHead/tFoot` — 引用元素 `<caption>`，`<thead>`，`<tfoot>`。
- `table.tBodies` — `<tbody>` 元素的集合（根据标准还有很多元素，但是这里至少会有一个 — 即使没有被写在 HTML 源文件中，浏览器也会将其放入 DOM 中）。

**`<thead>`，`<tfoot>`，`<tbody>`** 元素提供了 `rows` 属性：

- `tbody.rows` — 表格内部 `<tr>` 元素的集合。

**`<tr>`：**

- `tr.cells` — 在给定 `<tr>` 中的 `<td>` 和 `<th>` 单元格的集合。
- `tr.sectionRowIndex` — 给定的 `<tr>` 在封闭的 `<thead>/<tbody>/<tfoot>` 中的位置（索引）。
- `tr.rowIndex` — 在整个表格中 `<tr>` 的编号（包括表格的所有行）。

**`<td>` 和 `<th>`：**

- `td.cellIndex` — 在封闭的 `<tr>` 中单元格的编号。

~~~html
<table id="table">
  <tr>
    <td>one</td><td>two</td>
  </tr>
  <tr>
    <td>three</td><td>four</td>
  </tr>
</table>

<script>
  // 获取带有 "two" 的 td（第一行，第二列）
  let td = table.rows[0].cells[1];
  td.style.backgroundColor = "red"; // highlight it
</script>
~~~

## [总结](https://zh.javascript.info/dom-navigation#zong-jie)

给定一个 DOM 节点，我们可以使用导航（navigation）属性访问其直接的邻居。

这些属性主要分为两组：

- 对于所有节点：`parentNode`，`childNodes`，`firstChild`，`lastChild`，`previousSibling`，`nextSibling`。
- 仅对于元素节点：`parentElement`，`children`，`firstElementChild`，`lastElementChild`，`previousElementSibling`，`nextElementSibling`。

某些类型的 DOM 元素，例如 table，提供了用于访问其内容的其他属性和集合。

# 获取DOM对象

当元素彼此靠得近时，DOM 导航属性（navigation property）非常有用。如果不是，那该怎么办？如何去获取页面上的任意元素？

还有其他搜索方法。

## getElementById

如果一个元素有 `id` 特性（attribute），那我们就可以使用 `document.getElementById(id)` 方法获取该元素，无论它在哪里。

~~~html
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // 获取该元素
  let elem = document.getElementById('elem');

  // 将该元素背景改为红色
  elem.style.background = 'red';
</script>
~~~

## querySelectorAll

到目前为止，最通用的方法是 `elem.querySelectorAll(css)`，它返回 `elem` 中与给定 CSS 选择器匹配的**所有元素**。

在这里，我们查找所有为最后一个子元素的 `<li>` 元素：

~~~html
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
  let elements = document.querySelectorAll('ul > li:last-child');

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
~~~

这个方法确实功能强大，因为可以使用任何 CSS 选择器。

**也可以使用伪类**

CSS 选择器的伪类，例如 `:hover` 和 `:active` 也都是被支持的。例如，`document.querySelectorAll(':hover')` 将会返回鼠标指针正处于其上方的元素的集合（按嵌套顺序：从最外层 `<html>` 到嵌套最多的元素）。

## querySelector

`elem.querySelector(css)` 调用会**返回给定 CSS 选择器的第一个元素**。

换句话说，结果与 `elem.querySelectorAll(css)[0]` 相同，但是后者会查找 **所有** 元素，并从中选取一个，而 `elem.querySelector` 只会查找一个。因此它在速度上更快，并且写起来更短。

## matches

之前的方法是搜索 DOM。

[elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) 不会查找任何内容，它只会检查 `elem` 是否与给定的 CSS 选择器匹配。它返回 `true` 或 `false`。

当我们遍历元素（例如数组或其他内容）并试图过滤那些我们感兴趣的元素时，这个方法会很有用。

例如：

~~~html
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // 不一定是 document.body.children，还可以是任何集合
  for (let elem of document.body.children) {
    if (elem.matches('a[href$="zip"]')) {
      alert("The archive reference: " + elem.href );
    }
  }
</script>
~~~

## closest

元素的祖先（ancestor）是：父级，父级的父级，它的父级等。祖先们一起组成了从元素到顶端的父级链。

`elem.closest(css)` 方法会查找与 CSS 选择器匹配的最近的祖先。`elem` 自己也会被搜索。

换句话说，方法 `closest` 在元素中得到了提升，并检查每个父级。如果它与选择器匹配，则停止搜索并返回该祖先。

## 总结

有 6 种主要的方法，可以在 DOM 中搜索元素节点：

| 方法名                   | 搜索方式     | 可以在元素上调用？ | 实时的？ |
| ------------------------ | ------------ | ------------------ | -------- |
| `querySelector`          | CSS-selector | ✔                  | -        |
| `querySelectorAll`       | CSS-selector | ✔                  | -        |
| `getElementById`         | `id`         | -                  | -        |
| `getElementsByName`      | `name`       | -                  | ✔        |
| `getElementsByTagName`   | tag or `'*'` | ✔                  | ✔        |
| `getElementsByClassName` | class        | ✔                  | ✔        |

目前为止，最常用的是 `querySelector` 和 `querySelectorAll`，但是 `getElement(s)By*` 可能会偶尔有用，或者可以在旧脚本中找到。

此外：

- `elem.matches(css)` 用于检查 `elem` 与给定的 CSS 选择器是否匹配。
- `elem.closest(css)` 用于查找与给定 CSS 选择器相匹配的最近的祖先。`elem` 本身也会被检查。

让我们在这里提一下另一种用来检查子级与父级之间关系的方法，因为它有时很有用：

- 如果 `elemB` 在 `elemA` 内（`elemA` 的后代）或者 `elemA==elemB`，`elemA.contains(elemB)` 将返回 true。

# 节点属性

innerHTML给元素节点用的

nodeValue/data给文本节点用的，data更短，更常用

## DOM节点类

不同的DOM节点可能有不同的属性，例如a标签有href属性，input标签有value属性等。

文本节点和元素节点不同

这些标签对应的DOM节点也存在共有的属性和方法，所有的DOM节点都形成了一个单一层次结构

每个DOM节点都属于相应的内建类

层次结构的根节点是EventTarget，Node继承自它，其他DOM节点继承自Node

![image-20220617112038316](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/imgimage-20220617112038316.png)

- [EventTarget](https://dom.spec.whatwg.org/#eventtarget) — 是根的“抽象（abstract）”类。该类的对象从未被创建。它作为一个基础，以便让所有 DOM 节点都支持所谓的“事件（event）”，我们会在之后学习它。

- [Node](http://dom.spec.whatwg.org/#interface-node) — 也是一个“抽象”类，充当 DOM 节点的基础。它提供了树的核心功能：`parentNode`，`nextSibling`，`childNodes` 等（它们都是 getter）。`Node` 类的对象从未被创建。但是有一些继承自它的具体的节点类，例如：文本节点的 `Text`，元素节点的 `Element`，以及更多异域（exotic）类，例如注释节点的 `Comment`。

- [Element](http://dom.spec.whatwg.org/#interface-element) — 是 DOM 元素的基本类。它提供了元素级的导航（navigation），例如 `nextElementSibling`，`children`，以及像 `getElementsByTagName` 和 `querySelector` 这样的搜索方法。浏览器中不仅有 HTML，还会有 XML 和 SVG。`Element` 类充当更多特定类的基本类：`SVGElement`，`XMLElement` 和 `HTMLElement`。

- HTMLElement

   

  — 最终是所有 HTML 元素的基本类。各种 HTML 元素均继承自它：

  - [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) — `<input>` 元素的类，
  - [HTMLBodyElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlbodyelement) — `<body>` 元素的类，
  - [HTMLAnchorElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlanchorelement) — `<a>` 元素的类，
  - ……等。

因此，**给定节点的全部属性和方法都是继承的结果**

例如，考虑下<input>元素的DOM对象， 它属于HTMLInputElement类

它获取属性和方法，并将其作为下列类的叠加

1. HTMLInputElement --提供特定于输入的属性
2. HTMLElement --提供通用的HTML元素方法
3. Element -- 提供通用的元素方法
4. Node -- 提供DOM节点属性
5. EventTarge --提供事件支持
6. ...继承自Object，因为像hasOwnProperty这样的对象方法也是可用的

**`console.dir(elem)` 与 `console.log(elem)`**

大多数浏览器在其开发者工具中都支持这两个命令：`console.log` 和 `console.dir`。它们将它们的参数输出到控制台中。对于 JavaScript 对象，这些命令通常做的是相同的事。

但对于 DOM 元素，它们是不同的：

- `console.log(elem)` 显示元素的 DOM 树。
- `console.dir(elem)` 将元素显示为 DOM 对象，非常适合探索其属性。

你可以在 `document.body` 上尝试一下。

### 获取节点类名

我们可以通过回调来查看 DOM 节点类名，因为对象通常都具有 `constructor` 属性。它引用类的 constructor，`constructor.name` 就是它的名称：

```javascript
alert( document.body.constructor.name ); // HTMLBodyElement
```

……或者我们可以对其使用 `toString` 方法：

```javascript
alert( document.body ); // [object HTMLBodyElement]
```

我们还可以使用 `instanceof` 来检查继承：

```javascript
alert( document.body instanceof HTMLBodyElement ); // true
alert( document.body instanceof HTMLElement ); // true
alert( document.body instanceof Element ); // true
alert( document.body instanceof Node ); // true
alert( document.body instanceof EventTarget ); // true
```

## nodeName和tagName

给定一个 DOM 节点，我们可以从 `nodeName` 或者 `tagName` 属性中读取它的标签名：

例如：

```javascript
alert( document.body.nodeName ); // BODY，总是大写的
alert( document.body.tagName ); // BODY，总是大写的
```

tagName 和 nodeName 之间有什么不同吗？

当然，差异就体现在它们的名字上，但确实有些微妙。

- `tagName` 属性仅适用于 `Element` 节点。
- nodeName是为任意Node

定义的：

- 对于元素，它的意义与 `tagName` 相同。
- 对于其他节点类型（text，comment 等），它拥有一个对应节点类型的字符串。

换句话说，`tagName` 仅受元素节点支持（因为它起源于 `Element` 类），而 `nodeName` 则可以说明其他节点类型。

例如，我们比较一下 `document` 的 `tagName` 和 `nodeName`，以及一个注释节点：

```markup
<body><!-- comment -->

  <script>
    // for comment
    alert( document.body.firstChild.tagName ); // undefined（不是一个元素）
    alert( document.body.firstChild.nodeName ); // #comment

    // for document
    alert( document.tagName ); // undefined（不是一个元素）
    alert( document.nodeName ); // #document
  </script>
</body>
```

如果我们只处理元素，那么 `tagName` 和 `nodeName` 这两种方法，我们都可以使用，没有区别。

## innerHTML内容

[innerHTML](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) 属性允许将元素中的 HTML 获取为字符串形式。

我们也可以修改它。因此，它是更改页面最有效的方法之一。

下面这个示例显示了 `document.body` 中的内容，然后将其完全替换：

我们可以尝试插入无效的 HTML，浏览器会修复我们的错误：

```markup
<body>

  <script>
    document.body.innerHTML = '<b>test'; // 忘记闭合标签
    alert( document.body.innerHTML ); // <b>test</b>（被修复了）
  </script>

</body>
```

**小心：innerHTML += 'xxx'**会完全重写

## nodeValue/data

innerHTML仅对元素节点生效

其他类型，如文本节点，注释节点，具有它们的对应项，nodeValue和data，它们几乎相同，推荐使用data，它更短

~~~html
<body>
  Hello
  <!-- Comment -->
  <script>
    let text = document.body.firstChild;
    alert(text.data); // Hello

    let comment = text.nextSibling;
    alert(comment.data); // Comment
  </script>
</body>

~~~

## textContent：纯文本

textContent提供了对元素内的 **文本** 的访问权限，仅文本

**写入textContent要有用的多，因为它允许安全的写入文本**

假设我们有一个用户输入的任意字符串，我们希望将其显示出来。

- 使用 `innerHTML`，我们将其“作为 HTML”插入，带有所有 HTML 标签。
- 使用 `textContent`，我们将其“作为文本”插入，所有符号（symbol）均按字面意义处理。

比较两者：

```markup
<div id="elem1"></div>
<div id="elem2"></div>

<script>
  let name = prompt("What's your name?", "<b>Winnie-the-Pooh!</b>");

  elem1.innerHTML = name;
  elem2.textContent = name;
</script>
```

1. 第一个 `<div>` 获取 name “作为 HTML”：所有标签都变成标签，所以我们可以看到粗体的 name。
2. 第二个 `<div>` 获取 name “作为文本”，因此我们可以从字面上看到 `<b>Winnie-the-Pooh!</b>`。

在大多数情况下，我们期望来自用户的文本，并希望将其视为文本对待。我们不希望在我们的网站中出现意料不到的 HTML。对 `textContent` 的赋值正好可以做到这一点。

# 元素大小和滚动

~~~html
<div id="example">
  ...Text...
</div>
<style>
  #example {
    width: 300px;  // content width box-sizing为cotent-box下
    height: 200px; // content height
    border: 25px solid #E8C48F;
    padding: 20px;
    overflow: auto;
  }
</style>
~~~

它有边框（border），内边距（padding）和滚动（scrolling）等全套功能。但没有外边距（margin），因为它们不是元素本身的一部分，并且它们没什么特殊的属性。

这个元素看起来就像这样：

![image-20220617143514143](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/imgimage-20220617143514143.png)

**注意滚动条**

上图演示了元素具有滚动条这种最复杂的情况。一些浏览器（并非全部）通过从内容（上面标记为 “content width”）中获取空间来为滚动条保留空间。

因此，如果没有滚动条，内容宽度将是 `300 px`，但是如果滚动条宽度是 `16px`（不同的设备和浏览器，滚动条的宽度可能有所不同），那么还剩下 `300 - 16 ＝ 284px`，我们应该考虑到这一点。这就是为什么本章的例子总是假设有滚动条。如果没有滚动条，一些计算会更简单。

## 几何

![image-20220617144409557](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/imgimage-20220617144409557.png)

## 总结

元素具有以下几何属性：

- `offsetParent` — 是最接近的 CSS 定位的祖先，或者是 `td`，`th`，`table`，`body`。
- `offsetLeft/offsetTop` — 是相对于 `offsetParent` 的左上角边缘的坐标。
- `offsetWidth/offsetHeight` — 元素的“外部” width/height，边框（border）尺寸计算在内。
- `clientLeft/clientTop` — 从元素左上角外角到左上角内角的距离。对于从左到右显示内容的操作系统来说，它们始终是左侧/顶部 border 的宽度。而对于从右到左显示内容的操作系统来说，垂直滚动条在左边，所以 `clientLeft` 也包括滚动条的宽度。
- `clientWidth/clientHeight` — 内容的 width/height，包括 padding，但不包括滚动条（scrollbar）。
- `scrollWidth/scrollHeight` — 内容的 width/height，就像 `clientWidth/clientHeight` 一样，但还包括元素的滚动出的不可见的部分。
- `scrollLeft/scrollTop` — 从元素的左上角开始，滚动出元素的上半部分的 width/height。

除了 `scrollLeft/scrollTop` 外，所有属性都是只读的。如果我们修改 `scrollLeft/scrollTop`，浏览器会滚动对应的元素。

# Window大小和滚动

## 窗口的宽高

![image-20220617145804009](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/imgimage-20220617145804009.png)

## 文档的宽高

从理论上讲，由于根文档元素是 `document.documentElement`，并且它包围了所有内容，因此我们可以通过使用 `documentElement.scrollWidth/scrollHeight` 来测量文档的完整大小。

但是在该元素上，对于整个文档，这些属性均无法正常工作。在 Chrome/Safari/Opera 中，如果没有滚动条，`documentElement.scrollHeight` 甚至可能小于 `documentElement.clientHeight`！很奇怪，对吧？

为了可靠地获得完整的文档高度，我们应该采用以下这些属性的最大值：

```javascript
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Full document height, with scrolled out part: ' + scrollHeight);
```

## 窗口的滚动

DOM 元素的当前滚动状态在其 `scrollLeft/scrollTop` 属性中。

对于文档滚动，在大多数浏览器中，我们可以使用 `document.documentElement.scrollLeft/scrollTop`，但在较旧的基于 WebKit 的浏览器中则不行，例如在 Safari（bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)）中，我们应该使用 `document.body` 而不是 `document.documentElement`。

幸运的是，我们根本不必记住这些特性，因为我们可以从 `window.pageXOffset/pageYOffset` 中获取页面当前滚动信息：

```javascript
alert('当前已从顶部滚动：' + window.pageYOffset);
alert('当前已从左侧滚动：' + window.pageXOffset);
```

这些属性是只读的。

**我们也可以从 `window` 的 `scrollX` 和 `scrollY` 属性中获取滚动信息**

由于历史原因，存在了这两种属性，但它们是一样的：

- `window.pageXOffset` 是 `window.scrollX` 的别名。
- `window.pageYOffset` 是 `window.scrollY` 的别名。

## 总结

几何：

- 文档可见部分的 width/height（内容区域的 width/height）：`document.documentElement.clientWidth/clientHeight`

- 整个文档的 width/height，其中包括滚动出去的部分：

  ```javascript
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  ```

滚动：

- 读取当前的滚动：`window.pageYOffset/pageXOffset`。
- 更改当前的滚动：
  - `window.scrollTo(pageX,pageY)` — 绝对坐标，
  - `window.scrollBy(x,y)` — 相对当前位置进行滚动，
  - `elem.scrollIntoView(top)` — 滚动以使 `elem` 可见（`elem` 与窗口的顶部/底部对齐）。

# 坐标

**相对于窗口** — 类似于 `position:fixed`，从窗口的顶部/左侧边缘计算得出。

**相对于文档** — 与文档根（document root）中的 `position:absolute` 类似，从文档的顶部/左侧边缘计算得出

![image-20220617144839223](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/imgimage-20220617144839223.png)

当文档滚动了：

- `pageY` — 元素在文档中的相对坐标保持不变，从文档顶部（现在已滚动出去）开始计算。
- `clientY` — 窗口相对坐标确实发生了变化（箭头变短了），因为同一个点越来越靠近窗口顶部。

## 元素坐标

方法 `elem.getBoundingClientRect()` 返回最小矩形的窗口坐标，该矩形将 `elem` 作为内建 [DOMRect](https://www.w3.org/TR/geometry-1/#domrect) 类的对象。

主要的 `DOMRect` 属性：

- `x/y` — 矩形原点相对于窗口的 X/Y 坐标，
- `width/height` — 矩形的 width/height（可以为负）。

此外，还有派生（derived）属性：

- `top/bottom` — 顶部/底部矩形边缘的 Y 坐标，
- `left/right` — 左/右矩形边缘的 X 坐标。

![image-20220617145044034](https://lwq-img-1312073911.cos.ap-nanjing.myqcloud.com/img/imgimage-20220617145044034.png)

## 文档坐标PageX/Y

文档相对坐标从文档的左上角开始计算，而不是窗口。

在 CSS 中，窗口坐标对应于 `position:fixed`，而文档坐标与顶部的 `position:absolute` 类似。

我们可以使用 `position:absolute` 和 `top/left` 来把某些内容放到文档中的某个位置，以便在页面滚动时，元素仍能保留在该位置。但是我们首先需要正确的坐标。

这里没有标准方法来获取元素的文档坐标。但是写起来很容易。

这两个坐标系统通过以下公式相连接：

- `pageY` = `clientY` + 文档的垂直滚动出的部分的高度。
- `pageX` = `clientX` + 文档的水平滚动出的部分的宽度。

## 总结

页面上的任何点都有坐标：

1. 相对于窗口的坐标 — `elem.getBoundingClientRect()`。
2. 相对于文档的坐标 — `elem.getBoundingClientRect()` 加上当前页面滚动。

窗口坐标非常适合和 `position:fixed` 一起使用，文档坐标非常适合和 `position:absolute` 一起使用。
