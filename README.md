# JavaScript 学习查缺补漏清单：
1. 变量名可以使用$或者 _开头 
2. javascript 有七种数据类型:Number , String ,Boolean, Object,null,undefined,symbol.
由于JavaScript的变量作用域实际上是函数内部，我们在for循环等语句块中是无法定义具有局部作用域的变量的：
```
'use strict';
function foo() {
    for (var i=0; i<100; i++) {
        //
    }
    i += 100; // 仍然可以引用变量i
}
```
为了解决块级作用域，ES6引入了新的关键字let，用let替代var可以申明一个块级作用域的变量：
```
'use strict';
function foo() {
    var sum = 0;
    for (let i=0; i<100; i++) {
        sum += i;
    }
    i += 1; // SyntaxError
}
```
由于var和let申明的是变量，如果要申明一个常量，在ES6之前是不行的，我们通常用全部大写的变量来表示“这是一个常量，不要修改它的值”：
```
var PI = 3.14;
```
ES6标准引入了新的关键字const来定义常量，const与let都具有块级作用域：
```
'use strict';
const PI = 3.14;
PI = 3; // 某些浏览器不报错，但是无效果！
PI; // 3.14
```

3. 使用var申明的变量则不是全局变量，它的范围被限制在该变量被申明的函数体内，同名变量在不同的函数体内互不冲突。
为了修补JavaScript这一严重设计缺陷，ECMA在后续规范中推出了strict模式，在strict模式下运行的JavaScript代码，强制通过var申明变量，未使用var申明变量就使用的，将导致运行错误。启用strict模式的方法是在JavaScript代码的第一行写上：
```
'use strict';
```
这是一个字符串，不支持strict模式的浏览器会把它当做一个字符串语句执行，支持strict模式的浏览器将开启strict模式运行JavaScript。
JavaScript在设计之初，为了方便初学者学习，并不强制要求用var申明变量。这个设计错误带来了严重的后果：如果一个变量没有通过var申明就被使用，那么该变量就自动被申明为全局变量：
i = 10; // i现在是全局变量
定义值的标志有三种 var  let const：

4. null 和undefined的区别：
JavaScript的设计者希望用null表示一个空的值，而undefined表示值未定义。事实证明，这并没有什么卵用，区分两者的意义不大。大多数情况下，我们都应该用null。undefined仅仅在判断函数参数是否传递的情况下有用。实际上也可以记住，对象类型用null。基本数据类型用undefined。
5. 关于字符串
‘’单引号可以包含双引号，双引号内部可以包含单引号，· · 内部可以包含很多包括换行在内的符号由于多行字符串用\n写起来比较费事，所以最新的ES6标准新增了一种多行字符串的表示方法，用` ... `表示：
`这是一个
多行
字符串`;
要把多个字符串连接起来，可以用+号连接：
```
var name = '小明';
var age = 20;
var message = '你好, ' + name + ', 你今年' + age + '岁了!';
alert(message);
```
如果有很多变量需要连接，用+号就比较麻烦。ES6新增了一种模板字符串，表示方法和上面的多行字符串一样，但是它会自动替换字符串中的变量：
```
var name = '小明';
var age = 20;
var message = `你好, ${name}, 你今年${age}岁了!`;
alert(message);
```
6. 要特别注意相等运算符==。JavaScript在设计时，有两种比较运算符：
第一种是==比较，它会自动转换数据类型再比较，很多时候，会得到非常诡异的结果；
第二种是===比较，它不会自动转换数据类型，如果数据类型不一致，返回false，如果一致，再比较。
由于JavaScript这个设计缺陷，不要使用==比较，始终坚持使用===比较。
还有一个特殊的对比符号为全不等，表示数值和类型都不相等。
7.&& 和|| 返回的是第一个可以判断结果的那个值
8.for in 
for循环的一个变体是for ... in循环，它可以把一个对象的所有属性依次循环出来：
```
var o = {
    name: 'Jack',
    age: 20,
    city: 'Beijing'
};
for (var key in o) {
    alert(key); // 'name', 'age', 'city'
}
```
由于Array也是对象，而它的每个元素的索引被视为对象的属性，因此，for ... in循环可以直接循环出Array的索引：
```
var a = ['A', 'B', 'C'];
for (var i in a) {
    alert(i); // '0', '1', '2'
    alert(a[i]); // 'A', 'B', 'C'
}
```
for of 与for in的区别

for ... in循环由于历史遗留问题，它遍历的实际上是对象的属性名称。一个Array数组实际上也是一个对象，它的每个元素的索引被视为一个属性。当我们手动给Array对象添加了额外的属性后，for ... in循环将带来意想不到的意外效果：

```
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x in a) {
    alert(x); // '0', '1', '2', 'name'
}
```
for ... in循环将把name包括在内，但Array的length属性却不包括在内。
for ... of循环则完全修复了这些问题，它只循环集合本身的元素：
```
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x of a) {
    alert(x); // 'A', 'B', 'C'
}
```
这就是为什么要引入新的for ... of循环。

9.JavaScript把null、undefined、0、NaN和空字符串''视为false，其他值一概视为true

NaN这个特殊的Number与所有其他值都不相等，包括它自己：
```
NaN === NaN; // false
```
唯一能判断NaN的方法是通过isNaN()函数：
```
isNaN(NaN); // true  
```
10 数组：
```
[1, 2, 3.14, 'Hello', null, true];
new Array(1, 2, 3); // 创建了数组[1, 2, 3]
```
可以是任意元素
可以读和修改某个元素
要取得Array的长度，直接访问length属性：
```
var arr = [1, 2, 3.14, 'Hello', null, true];
arr.length; // 6
```
请注意，直接给Array的length赋一个新的值会导致Array大小的变化：
```
var arr = [1, 2, 3];
arr.length; // 3
arr.length = 6;
arr; // arr变为[1, 2, 3, undefined, undefined, undefined]
arr.length = 2;
arr; // arr变为[1, 2]
```
Array可以通过索引把对应的元素修改为新的值，因此，对Array的索引进行赋值会直接修改这个Array：
```
var arr = ['A', 'B', 'C'];
arr[1] = 99;
arr; // arr现在变为['A', 99, 'C']
```
请注意，如果通过索引赋值时，索引超过了范围，同样会引起Array大小的变化：
```
var arr = [1, 2, 3];
arr[5] = 'x';
arr; // arr变为[1, 2, 3, undefined, undefined, 'x']
```
大多数其他编程语言不允许直接改变数组的大小，越界访问索引会报错。然而，JavaScript的Array却不会有任何错误。在编写代码时，不建议直接修改Array的大小，访问索引时要确保索引不会越界。

11. 函数

参数类
JavaScript的函数在查找变量时从自身函数定义开始，从“内”向“外”查找。如果内部函数定义了与外部函数重名的变量，则内部函数的变量将“屏蔽”外部函数的变量。
参数个数判断
如果没有return语句，函数执行完毕后也会返回结果，只是结果为undefined。
由于JavaScript允许传入任意个参数而不影响调用，因此传入的参数比定义的参数多也没有问题，虽然函数内部并不需要这些参数：
传入的参数比定义的少也没有问题。

arguments

JavaScript还有一个免费赠送的关键字arguments，它只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数。arguments类似Array但它不是一个Array：

```
function foo(x) {
    alert(x); // 10for (var i=0; i<arguments.length; i++) {
        alert(arguments[i]); // 10, 20, 30
    }
}
foo(10, 20, 30);
```
利用arguments，你可以获得调用者传入的所有参数。也就是说，即使函数不定义任何参数，还是可以拿到参数的值：
```
function abs() {if (arguments.length === 0) {
        return 0;
    }
    var x = arguments[0];
    return x >= 0 ? x : -x;
}
abs(); // 0
abs(10); // 10
abs(-9); // 9
```
实际上arguments最常用于判断传入参数的个数。你可能会看到这样的写法：
```
// foo(a[, b], c)// 接收2~3个参数，b是可选参数，如果只传2个参数，b默认为null：function foo(a, b, c) {if (arguments.length === 2) {
        // 实际拿到的参数是a和b，c为undefined
        c = b; // 把b赋给c
        b = null; // b变为默认值
    }
    // ...
}
```
要把中间的参数b变为“可选”参数，就只能通过arguments判断，然后重新调整参数并赋值。

rest参数

由于JavaScript函数允许接收任意个参数，于是我们就不得不用arguments来获取所有参数：
```
function foo(a, b) {var i, rest = [];
    if (arguments.length > 2) {
        for (i = 2; i<arguments.length; i++) {
            rest.push(arguments[i]);
        }
    }
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}
```
为了获取除了已定义参数a、b之外的参数，我们不得不用arguments，并且循环要从索引2开始以便排除前两个参数，这种写法很别扭，只是为了获得额外的rest参数，有没有更好的方法？

ES6标准引入了rest参数，上面的函数可以改写为：
```
function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

foo(1, 2, 3, 4, 5);
// 结果:// a = 1// b = 2// Array [ 3, 4, 5 ]

foo(1);
// 结果:// a = 1// b = undefined// Array []
```
rest参数只能写在最后，前面用...标识，从运行结果可知，传入的参数先绑定a、b，多余的参数以数组形式交给变量rest，所以，不再需要arguments我们就获取了全部参数。

如果传入的参数连正常定义的参数都没填满，也不要紧，rest参数会接收一个空数组（注意不是undefined


由于JavaScript的函数可以嵌套，此时，内部函数可以访问外部函数定义的变量，反过来则不行：
```
'use strict';

function foo() {var x = 1;
    function bar() {var y = x + 1; // bar可以访问foo的变量x!
    }
    var z = y + 1; // ReferenceError! foo不可以访问bar的变量y!
}
```
名字空间

全局变量会绑定到window上，不同的JavaScript文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，都会造成命名冲突，并且很难被发现。

减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中。例如：
```
// 唯一的全局变量MYAPP:var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {return 'foo';
};

```
把自己的代码全部放入唯一的名字空间MYAPP中，会大大减少全局变量冲突的可能。

全局作用域


不在任何函数内定义的变量就具有全局作用域。实际上，JavaScript默认有一个全局对象window，全局作用域的变量实际上被绑定到window的一个属性：
```
'use strict';

var course = 'Learn JavaScript';
alert(course); // 'Learn JavaScript'
alert(window.course); // 'Learn JavaScript'
```
因此，直接访问全局变量course和访问window.course是完全一样的。

你可能猜到了，由于函数定义有两种方式，以变量方式var foo = function () {}定义的函数实际上也是一个全局变量，因此，顶层函数的定义也被视为一个全局变量，并绑定到window对象：
```
'use strict';

function foo() {
    alert('foo');
}

foo(); // 直接调用foo()
window.foo(); // 通过window.foo()调用
```

名称空间
全局作用域
局部作用域
参数作用域

对象
访问属性是通过.操作符完成的，但这要求属性名必须是一个有效的变量名。如果属性名包含特殊字符，就必须用''括起来：
访问这个属性也无法使用.操作符，必须用['xxx']来访问：

如果我们要检测xiaoming是否拥有某一属性，可以用in操作符：
要判断一个属性是否是xiaoming自身拥有的，而不是继承得到的，可以用hasOwnProperty()方法：

```
'name' in xiaoming; // true
'grade' in xiaoming; // false
xiaoming.hasOwnProperty('name'); // true
xiaoming.hasOwnProperty('toString'); // false
```
JavaScript对每个创建的对象都会设置一个原型，指向它的原型对象。

当我们用obj.xxx访问一个对象的属性时，JavaScript引擎先在当前对象上查找该属性，如果没有找到，就到其原型对象上找，如果还没有找到，就一直上溯到Object.prototype对象，最后，如果还没有找到，就只能返回undefined。

```
var myObject = {
	objectName : "jimmy",/*注意这里是逗号*/
	"object-Age" : 29, /*名字可以包含特殊字符，如果有特殊字符需要使用引号阔起来*/
	getAge : function() {
		return this["object-Age"];
	}/*注意这里没有分号*/
}
console.log(myObject.getAge());
console.log(myObject["object-Age"]);

function User(firstName,lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.sayHello = function() {
		console.log(firstName + " : " +lastName);
	};
}
var user = new User("jimmy","lin");
user.sayHello();
//删除某个熟悉
delete user.firstName;
for(var key in user) {
	console.log("key ===="+key);
}
```
使用apply和call来绑定this的指向
虽然在一个独立的函数调用中，根据是否是strict模式，this指向undefined或window，不过，我们还是可以控制this的指向的！

要指定函数的this指向哪个对象，可以用函数本身的apply方法，它接收两个参数，第一个参数就是需要绑定的this变量，第二个参数是Array，表示函数本身的参数。

用apply修复getAge()调用：
```
function getAge() {var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25
getAge.apply(xiaoming, []); // 25, this指向xiaoming, 参数为空
另一个与apply()类似的方法是call()，唯一区别是：
```
apply()把参数打包成Array再传入；

call()把参数按顺序传入。

比如调用Math.max(3, 5, 4)，分别用apply()和call()实现如下：
```
Math.max.apply(null, [3, 5, 4]); // 5
Math.max.call(null, 3, 5, 4); // 5
```
对普通函数调用，我们通常把this绑定为null。

装饰器：

利用apply()，我们还可以动态改变函数的行为。

JavaScript的所有对象都是动态的，即使内置的函数，我们也可以重新指向新的函数。

现在假定我们想统计一下代码一共调用了多少次parseInt()，可以把所有的调用都找出来，然后手动加上count += 1，不过这样做太傻了。最佳方案是用我们自己的函数替换掉默认的parseInt()：
```
var count = 0;
var oldParseInt = parseInt; // 保存原函数

window.parseInt = function () {
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用原函数
};

// 测试:
parseInt('10');
parseInt('20');
parseInt('30');
count; // 3
```
另一个需要注意的问题是，返回的函数并没有立刻执行，而是直到调用了f()才执行。我们来看一个例子：

返回闭包时牢记的一点就是：返回函数不要引用任何循环变量，或者后续会发生变化的变量。

```
闭包（closure）是Javascript语言的一个难点，也是它的特色，很多高级应用都要依靠闭包实现。
下面就是我的学习笔记，对于Javascript初学者应该是很有用的。
一、变量的作用域
要理解闭包，首先必须理解Javascript特殊的变量作用域。
变量的作用域无非就是两种：全局变量和局部变量。
Javascript语言的特殊之处，就在于函数内部可以直接读取全局变量。
　　var n=999;
　　function f1(){
　　　　alert(n);
　　}
　　f1(); // 999
另一方面，在函数外部自然无法读取函数内的局部变量。
　　function f1(){
　　　　var n=999;
　　}
　　alert(n); // error
这里有一个地方需要注意，函数内部声明变量的时候，一定要使用var命令。如果不用的话，你实际上声明了一个全局变量！
　　function f1(){
　　　　n=999;
　　}
　　f1();
　　alert(n); // 999
二、如何从外部读取局部变量？
出于种种原因，我们有时候需要得到函数内的局部变量。但是，前面已经说过了，正常情况下，这是办不到的，只有通过变通方法才能实现。
那就是在函数的内部，再定义一个函数。
　　function f1(){
　　　　var n=999;
　　　　function f2(){
　　　　　　alert(n); // 999
　　　　}
　　}
在上面的代码中，函数f2就被包括在函数f1内部，这时f1内部的所有局部变量，对f2都是可见的。但是反过来就不行，f2内部的局部变量，
对f1就是不可见的。这就是Javascript语言特有的"链式作用域"结构（chain scope），子对象会 "一级一级" 地向上寻找所有父对象的变量。
所以，父对象的所有变量，对子对象都是可见的，反之则不成立。
既然f2可以读取f1中的局部变量，那么只要把f2作为返回值，我们不就可以在f1外部读取它的内部变量了吗！
　　function f1(){
　　　　var n=999;
　　　　function f2(){
　　　　　　alert(n); 
　　　　}
　　　　return f2;
　　}
　　var result=f1();
　　result(); // 999
三、闭包的概念
上一节代码中的f2函数，就是闭包。
各种专业文献上的"闭包"（closure）定义非常抽象，很难看懂。我的理解是，闭包就是能够读取其他函数内部变量的函数。
由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。
所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
四、闭包的用途
闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。
怎么来理解这句话呢？请看下面的代码。
　　function f1(){
　　　　var n=999;
　　　　nAdd=function(){n+=1}
　　　　function f2(){
　　　　　　alert(n);
　　　　}
　　　　return f2;
　　}
　　var result=f1();
　　result(); // 999
　　nAdd();
　　result(); // 1000
在这段代码中，result实际上就是闭包f2函数。它一共运行了两次，第一次的值是999，第二次的值是1000。
这证明了，函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。
为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，
因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。
这段代码中另一个值得注意的地方，就是"nAdd=function(){n+=1}"这一行，首先在nAdd前面没有使用var关键字，因此nAdd是一个全局变量，而不是局部变量。
其次，nAdd的值是一个匿名函数（anonymous function），而这个匿名函数本身也是一个闭包，
所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。
五、使用闭包的注意点
1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。
解决方法是，在退出函数之前，将不使用的局部变量全部删除。
2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），
把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。
六、思考题
如果你能理解下面两段代码的运行结果，应该就算理解闭包的运行机制了。
代码片段一。
　　var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){//alert(this.name);//My Object
　　　　　　return function(){
　　　　　　　　return this.name;// 空
　　　　　　};
　　　　}
　　};
        alert(this.name);// The Window
　　alert(object.getNameFunc()()); // 空
 
代码片段二。
　　var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()()); // My Object
 

一层访问一层，不能跨层访问
```
箭头函数： 用箭头定义函数........
```
var fun = x=>x*x
alert(fun(2))            //单参数
var fun1 = ()=>2
alert(fun1())        //无参数
var fun2 = (x,y)=>x+y
alert(fun2(1,2))        //双参数
var fun3 = ()=>({a:12})
alert(fun3().a)          //返回值是对象（要加括号）
``` 
箭头函数有两种格式，一种像上面的，只包含一个表达式，连{ ... }和return都省略掉了。还有一种可以包含多条语句，这时候就不能省略{ ... }和return： 
箭头函数和匿名函数一个明显的区别是this指针。箭头函数中的this指针由上下文决定。

在函数中定义函数
将函数作为参数
将函数作为返回值