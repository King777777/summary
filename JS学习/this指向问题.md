# JS的this指向问题

关于this，可以先牢记以下两点

1. **this永远指向一个对象**
2. **this的指向完全取决于函数调用的位置**

针对以上的第一点特别好理解，不管在什么地方使用this，它必然会指向某个对象；确定了第一点后，也引出了一个问题，就是this使用的地方到底在哪里，而第二点就解释了这个问题，但关键是在JavaScript语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象下运行，而this就是函数运行时所在的对象（环境）。这本来并不会让我们糊涂，但是JavaScript支持运行环境动态切换，也就是说，this的指向是动态的，很难事先确定到底指向哪个对象，这才是最让我们感到困惑的地方。

## 各个情况

1. 在全局作用域中，this指向window对象

2. 在普通函数中，谁调用我，this就指向谁

3. 箭头函数中的this，就是定义**该函数时所在的函数作用域指向的对象**，**箭头函数中this,首先到它的作用域找，如果作用域还是箭头函数，那么接着向上找，直到找到我们要的this指向。**
4. 在事件中，指向触发事件的元素对象
5. 在React生命周期中，this就是组件实例
   ~~~js
   //这是父作用域，this指向window
   let person1 = {
       name:'lisi',
       age:10,
       //注意这里并没有this
       say:() => {
           console.log(this);//输出window
       }
   }
   
   person1.say();
   ~~~



为什么会输出window，其实原因很简单，day方法中的this因为在箭头函数中，所以指向父作用域中，父作用域就是最外层作用域，父作用域中的this指向window，所以输出window。

有的同学可能会想say方法中的父作用域怎么不是对象person1 = {} 中我标记‘//注意这里并没有this’的位置，因为这里是个对象，对象中有属性，方法，但并没有this。

接下来我们把它改成定时器使用箭头函数的方式：

~~~js
let person1 = {
    name:'lisi',
    age:10,
    say:function(){
        //这里是外部作用域 ，this指向person1(因为person1调用的say）,即箭头函数中的this指向person1
        setTimeout(() => {
            console.log(this);  //this指向外部作用域中this
        });
    }
}
person1.say();  //输出person1对象

~~~

这个例子中，定时器箭头函数中的this指向外部作用域，即指向say方法中，say方法中this指向person1对象,所以输出person1对象。

那么如果我把say方法也改成箭头函数：

~~~js
//这里是外部作用域 this指向window，即最终console中的this指向window
let person1 = {
    name:'lisi',
    age:10,
    say:()=>{
        //这里是外部作用域,因为本身又是箭头函数，继续向上找
        setTimeout(() => {
            console.log(this);  //this指向外部作用域中this
        });
    }
}
person1.say();   //输出window
~~~

这个例子中定时器箭头函数中的this向上say方法中的this,但由于say方法中也是箭头函数，所以say方法中的this还要继续向上找，即找到了最外层，所以最后指向window。总结：**箭头函数中this,首先到它的父作用域找，如果父作用域还是箭头函数，那么接着向上找，直到找到我们要的this指向。**

```js
let myObj = {
    a: 1,
    arrow() {
        //这里是外部作用域，arrow函数的this，谁调用指向谁
        setTimeout(()=>console.log(this), 0);
    }
}
myObj.arrow.apply({name: 'wq'}); // this指向{name: 'wq'}这个对象
```

