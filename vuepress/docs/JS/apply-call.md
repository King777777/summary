# apply和call

JavaScript中的每一个Function对象都有一个apply和call方法

~~~js
/*apply()方法*/
function.apply(thisObj[, argArray])

/*call()方法*/
function.call(thisObj[, arg1[, arg2[, [,...argN]]]]);
~~~

它们的作用都是调用一个对象的一个方法，用另一个对象替代当前对象，

如B.apply(A, arguments)或B.call(A, param1,param2)都是A对象调用B对象的方法

## 基本示例

1.基本用法

~~~js
function add(a,b){
  return a+b;  
}
function sub(a,b){
  return a-b;  
}
var a1 = add.apply(sub,[4,2]);　　//sub对象替换为add对象，参数为[4,2]会被自动转化为，4，2
var a2 = sub.apply(add,[4,2]);   // add对象替换为sub
alert(a1);  //6     
alert(a2);  //2/*call的用法*/var a1 = add.call(sub,4,2);
~~~

2. 实现继承

   ~~~js
   function Animal(name){
     this.name = name;
     this.showName = function(){
           alert(this.name);    
       }    
   }
   
   function Cat(name){
     Animal.apply(this,[name]);    
   }
   
   var cat = new Cat("咕咕");
   cat.showName();
   
   /*call的用法*/
   Animal.call(this,name);
   ~~~

3. 多重继承

   ~~~js
   function Class10(){
     this.showSub = function(a,b){
           alert(a - b);
       }   
   }
   
   function Class11(){
     this.showAdd = function(a,b){
           alert(a + b);
       }  
   }
   
   function Class12(){
     Class10.apply(this);
     Class11.apply(this);   
     // Class10.call(this);
     //Class11.call(this);  
   }
   
   var c2 = new Class12();
   c2.showSub(3,1);    //2
   c2.showAdd(3,1);    //4
   ~~~

   

## 巧妙用法

`apply`有一个巧妙的用处,就是可以**将一个数组默认的转换为一个参数列表**(`[param1,param2,param3]`转换为`param1,param2,param3`)，借助`apply`的这点特性，所以就有了以下高效率的方法：

1.

**Math.max 可以实现得到数组中最大的一项**：

因为Math.max不支持Math.max([param1,param2])也就是数组，但是它支持Math.max(param1,param2...)，所以可以根据apply的特点来解决 var max=Math.max.apply(null,array)，这样就轻易的可以得到一个数组中的最大项（apply会将一个数组转换为一个参数接一个参

数的方式传递给方法）

这块在调用的时候第一个参数给了null，这是因为没有对象去调用这个方法，我只需要用这个方法帮我运算，得到返回的结果就行，所以直接传递了一个null过去。

**用这种方法也可以实现得到数组中的最小项：Math.min.apply(null,array)**

2.

Array.prototype.push可以实现两个数组的合并

同样push方法没有提供push一个数组，但是它提供了push(param1,param2...paramN)，同样也可以用apply来转换一下这个数组，即：

```
var arr1=new Array("1","2","3");
var arr2=new Array("4","5","6");
Array.prototype.push.apply(arr1,arr2);    //得到合并后数组的长度，因为push就是返回一个数组的长度
```

