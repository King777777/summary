# compose

compose 是函数式编程中一个非常重要的函数，**compose的函数作用就是组合函数**，将函数串联起来执行。将多个函数组合起来，一个函数的输出记过是另一个函数的输入参数，一旦第一个函数开始执行，就会像多米诺骨牌一样推导执行。

## reduce实现

~~~js
function compose(...funcs) {
  //没有传入函数参数，就返回一个默认函数（直接返回参数）
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
  // 单元素数组时调用reduce，会直接返回该元素，不会执行callback;所以这里手动执行
    return funcs[0]
  }
  // 依次拼凑执行函数
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

~~~

举例分析:`compose(f4,f3,f2,f1)(c,d,e)`

- reduce回调函数第一次执行时，返回值为 **函数** `(...args) => f4(f3(...args))`，作为下一次执行的a参数
- 回调函数第二次执行时，返回值为 **函数**`(...args) => f4(f3(f2(...args)))`,作为下一次执行的a参数
- 回调函数第三次执行时，返回值为 **函数**`(...args) => f4(f3(f2(f1(...args))))`

最右边的参数`f1`可以接受多个参数，然后返回结果传给下一个函数`f2`,返回结果再传入`f3`··· `f3`最先被调用，会等待`f2`的结果，再等待`f1`的结果。

```js
    let a = (x,y) => x + y,
        b = x => x * x,
        c = x => x === 0 ? x : 1/x;
    
    compose(c,b,a)(1,2); // 1/9
```

那么如果想从左到右返回结果呢?

1. 使用`reduceRight`
2. 将`funcs`倒序

## 迭代实现

~~~js
    function compose(...funcs) {
        let length = funcs.length;

        return function(...arg) {
            let index = length - 1,
                result = length > 0 ? funcs[index].apply(this,arg) : arg; //注意arg为数组，要用apply
            while(--index >=0 ) {
                result = funcs[index].call(this,result);
            }
            return result;
        }
    }

~~~

通过`index`来标记应该执行哪个函数，这里是从最右边（`length - 1`）开始执行的，每执行一个`index`就减1，直到`index`为`0`（最左边）为止。
用`result`来记录每次函数执行的返回值，每次都会更新，直到所有函数都执行完。才会返回最终结果
如果传递的函数列表为空，则返回传入参数。

同样的如果需要从左到右依次执行，则将`funcs`倒序即可。
