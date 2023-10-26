# JS数组的reduce方法

## 1.语法

> ```
> arr.reduce(callback(prev, cur[, index[, array]])[, initialValue])
> 
> ```

其中

**prev**表示上次**调用回调时返回的值**或者初始值initialValue，**如果没有提供初始值，则默认将数组的第一项作为prev，空数组调用reduce会报错。**

**cur**表示当前正在处理的元素，

**index**表示当前正在处理元素的索引，

> **注意：**如果没有提供`initialValue`，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供`initialValue`，从索引0开始。

**arr**表示原数组，

callback这个回调最常用的参数就是prev和cur

## 2.示例

原数组

~~~js
const arr = [1,2,3,4,5];
~~~

### 1.求数组和

~~~js
const recuder = (prev, cur) => prev + cur; // 先定一个函数变量，作为reduce的第一个参数
const sum = arr.reduce(reducer, 0); // 这里提供初始值是要避免arr为空的报错
// const sum = arr.reduce((prev, cur) => prev + cur, 0) //写出一行也行
~~~

### 2.求数组最大项

~~~js
const max = arr.reduce((prev, cur) => Math.max(prev, cur));
// 由于没有提供初始值，默认将数组第一项作为prev的值，cur就是索引为1的值，然后取较大的返回，进入下一轮回调，注意没有提供初始值的reduce方法，空数组会报错
~~~

### 3.数组去重

~~~js
const newArr = arr.reduce((prev, cur) => {
    prev.indexOf(cur) === -1 && prev.push(cur);
    return prev;
}, [])
// 基本思路就是，prev被初始化为一个空数组[]，然后利用数组的indexOf方法去判断cur是否在prev数组中，不在就添加进去，然后返回prev数组给下次回调使用
~~~

**我想说，以上方法都可以在lodash中找到，而且它们更安全，覆盖点更多(对象数组），所以实际使用可以参考lodash**

## reduceRight()

和reduce一样，只不过遍历顺序相反，从右向左遍历

## 总结

reduce() 是数组的**归并方法**，与forEach()、map()、filter()等**迭代方法**一样都会对数组每一项进行遍历，但是reduce() 可同时将前面数组项遍历返回的值与当前遍历项进行运算，这一点是其他迭代方法无法企及的

## 进阶用法

~~~js
// 对象数组求和，无非就是在求和过程中使用对象的点运算符获取属性的值罢了
var result = [
  { subject: 'math', score: 88 },
  { subject: 'chinese', score: 95 },
  { subject: 'english', score: 80 }
];
const sum = result.reduce((accumulator, cur) => accumulator + cur.score, 0); 
const sum = result.reduce((accumulator, cur) => accumulator + cur.score, -10);  // 总分扣除10分
~~~

### 求字符串字母出现次数

```js
const str = 'sfhjasfjgfasjuwqrqadqeiqsajsdaiwqdaklldflas-cmxzmnha';
const res = str.split('').reduce((accumulator, cur) => {accumulator[cur] ? accumulator[cur]++ : accumulator[cur] = 1; return accumulator;}, {});
```

数组转对象

```js
var streams = [{name: '技术', id: 1}, {name: '设计', id: 2}];
var obj = streams.reduce((accumulator, cur) => {accumulator[cur.id] = cur; return accumulator;}, {});
```

## 高级用法

#### **多维度的叠加执行操作**

> 各科程机占比重不同，求加权结果

~~~js
var result = [
  { subject: 'math', score: 88 },
  { subject: 'chinese', score: 95 },
  { subject: 'english', score: 80 }
];
var dis = {
    math: 0.5,
    chinese: 0.3,
    english: 0.2
};
var res = result.reduce((accumulator, cur) => dis[cur.subject] * cur.score + accumulator, 0);
~~~

#### 扁平二维数组

```js
var arr = [[1, 2, 8], [3, 4, 9], [5, 6, 10]];
var res = arr.reduce((x, y) => x.concat(y), []);
```

### compose函数

redux的compose实现

~~~js
function compose (...funs){
    if (funs.length === 0) {
        return arg => arg;
    }
    if (funs.length === 1) {
        return funs[0];
    }
    return funs.reduce((a, b) => (...arg)=> a(b(...arg)));
}
~~~

串联管道函数
