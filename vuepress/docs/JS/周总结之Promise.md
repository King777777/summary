## 周总结之Promise

## 回调函数

在java中，异步操作往往都是通过回调函数来完成的。

回调函数就是一个函数，意为回头调用，即完成这个任务之后会调用，主线程几乎不用关心异步的状态了，他自己会善始善终

~~~js
function print() {
   console.log('hello,world');
}
setTimeout(print, 3000);
~~~

上面是最经典的例子，setTimeout的第一个参数就是一个回调函数，第二个参数是毫秒数，这个函数执行会产生一个子线程，子线程会等待3秒，然后执行print这个回调函数。

## Promise

Promise是ES6提供的一个类，目的是优雅的编写复杂的异步任务

~~~js
new Promise((resolve, reject) => {
    //doSomething...
    // success时调用resolve([value]); value是一个可选项,此值可以被then捕获
    resolve([value]);
     // 失败时调用reject([err]); err是一个可选项,此值可以被then捕获
    reject([err]);
})
~~~

Promise的实例对象都有一个then方法，该方法接受两个参数，第一个是成功时的回调，第二个是失败时的回调(一般失败会用catch来捕获)

在then方法中调用异步处理成功的状态时，既可以return一个确定的值，也可以再次返回一个Promise实例对象，当返回一个确切的值的时候，then方法会构造一个默认的Promise对象，它的状态是fullfilled(其实**返回一个确切的值等价于Promise.resolve(value),**以供接下来的then方法使用，同理我们可以推导出**Promise.reject(err)来返回一个失败的值**，来供catch捕获，当然了也可以直接抛出异常

throw new Error();

~~~js
  let num = 0
    let run = function() {
        return new Promise(resolve => {
            resolve(`${num}`)})
    }

    run().then(val => {
        console.log(val)
        return val
    })
        .then(val =>{
            val++
            console.log(val)
            return val
        })
        .then(val =>{
            val++
            console.log(val)
        })

~~~



当一个请求的入参依赖于前一个请求的出参时，Promise就排上用场了，一个简单例子如下

~~~js
firstRequest().then(res=>{
 const { data } = res;
 return data; // 其实是return Promise.resolve(data)的简写
             //   return Promise.reject('err reason'); 返回一个失败的promise，可以被catch捕获
}).then(value => { //这里的value就是上一个then返回的值
    secondRequest(value).then(res=>{
        console.log(res);
    })
}).catch(err=>{ 
    console.log(err);
})
~~~

## 小知识点

1. js定义一个对象，可以直接 const obj = {},可以使用点 .  或[variable] 来向obj添加属性，如 obj.name='liu';obj[age]=18
2. js 中只有0, null, undefined,  空字符串, NaN返回 false，其余均返回true，空对象和空数组都是对象均返回true
3. 

## Promise.all

~~~js
  queryTodoList = () => {
    const { pageNum, pageSize } = this.state;
    return queryTodoList({
      pageNum,
      pageSize,
    }).then(res => {
      return (res);
    });
  }

  todoQueryList = () => {
    const { pageNum, pageSize } = this.state;
   return todoQueryList({
      pageNum,
      pageSize,
      processTypeList: ['1', '2', '3', '4', '5', '6'],
      isToDoPage: true,
      finishFlag: 'N',
    }).then(res => {
      return res;
    });
  }

  queryAllToDoTask = () => {
    const toDoTypeList = [];
    const manager = JSON.parse(sessionStorage.getItem('userInfo'));
    ['/handling/handleNoEnterList', '/IFlowApplyOrderQuery/queryTodoList', '/handling/warnTaskList', '/handling/checkList'].forEach(item => {
      if (checkAuth(item)) toDoTypeList.push(ToDoType[item]);
    });
    return queryAllToDoTask({ mangerId: manager.operatorId, toDoTypeList }).then(res => { return res; });
  };



~~~

~~~js

    Promise.all([this.queryTodoList(), this.todoQueryList(), this.queryAllToDoTask()]).then(array => {
      console.log('array', array);
    });
~~~

