'use strict';
//1.变量名可以使用$或者 _开头 
var $availableName1;
var _availableName2;

//2 变量作用域例子
var value1 = "groble value";
function testMethod() {
	//局部变量
	var value1 = "local value";
	console.log("value1 = "+value1);
}
testMethod();
//全局变量
console.log("value1 = "+value1);

var value1 = "groble value";
function testMethod1() {
	//全局变量
	value1 = "local value";
	console.log("value1 = "+value1);
}
testMethod1();
//全局变量
console.log("value1 = "+value1);


//3.use strict例子
var str4 = "Hello Js";
console.log(str4);

//4.字符引号例子
var str1 = 'Hello "jimmy"';
console.log(str1);
var str2 = "Hello 'lucy'";
console.log(str2);
var str3 = `
hello jimmy
hello 'lucy'
`;
console.log(str3);

var name = "jimmy";
console.log(`Hello my name is ${name}`);

//5 for 例子
var person = {
    name:"jimmy",
    age:12
};

for(var key in person) {
    console.log("key = " + key + " : "+person[key]);

}

var array = [1,2,3,4,5];
array.name = "jimmy"
for (var key in array) {
	console.log("key = "+key+" value = "+array[key]);
}

for(var key of array) {
	console.log("key = "+key+" value = "+array[key]);
}

//6. 数组例子
var array2 = [1,2.5,null,undefined,NaN,'string',false];
console.log("length = "+ array2.length);
//修改数组大小
array2.length = 8;
for (var i = 0; i < array2.length; i++) {
	console.log(array2[i]);
}
console.log("length = "+ array2.length);

//不会越界
console.log("array 19 = "+ array2[19]);
console.log("length = "+ array2.length);

//7 匿名函数
var add = function(a,b) {
	return a+b;
}
var result = add(4,5);
console.log(result);

//8 arguments 用法
function testargument() {
	console.log("===============>");
	//这个是运行时的实际参数个数
	console.log(arguments.length);
	console.log("===============>");
}
testargument();
var a = 12;
var b = 34;
var c = 22;
//传入的参数可以多传也可以少传
testargument(a,b,c);

//9 rest用法
function testrest(a,...rest) {
	console.log("rest length = "+rest.length);
	for (var i = 0; i < rest.length; i++) {
		console.log(rest[i]+"---->");
	}
}
testrest(a,b,c);

//10 函数嵌套
function testNetCall() {
	var a = 10;
	function innerfunction() {
		console.log("a = " +a);
	}
	innerfunction();
}
testNetCall();

//11 参数提升
function test() {
	console.log("va = "+va);
	var va = 10;
}
test();

// 函数作为参数
function add(a,b) {
	return a+b;
}
function testfunctionAsParam(a,b,adds) {
	return adds(a,b);
} 
console.log("xxxxxxxxxx-->"+testfunctionAsParam(4,5,add))

//函数作为返回值
function addarry(array) {
	return function sum() {
		var sumvalue = 0;
		for(let i =0;i<array.length;i++) {
			sumvalue += array[i];
		}
		return sumvalue;
	};
}
//注意这里最后有一个（）
console.log("---------->>>>>>>"+ addarry([1,2,3,4,5])());

//总结函数可以作为参数，作为返回值

//闭包的用处：外部访问内部变量
function func1() {
	var value = 0;
    function f2() {
		value+=1;
		return value;
	}
	return f2;
}
var result1 = func1();
console.log("========"+result1());
var result2 = func1();
console.log("xxxxxxxxxx" +result2());

//箭头函数
var fun = () => {
	console.log("Hello world");
}
fun();

var func11 = (x) => {
	console.log("Hello world "+ x);
}

func11(12);


var func12 = (x,y,z) => {
	console.log(x+y+z);
}

func12(1,2,3);

var func12 =(firstName,lastName) => (
	{
		name1:firstName,
		name2:lastName
	}
)
console.log(func12("jimmy","lucy").name1);



//12 常量定义
const PI = 3.1415;
console.log("PI = "+PI);

//13 使用let定义局部区域变量

function testlet() {
	for(var i = 0;i<10;i++) {
	}
	console.log("i = "+i);
}
testlet();

function testlet1() {
	for(let loop = 0;loop<10;loop++) {
	}
	//console.log("loop = "+loop);
}
testlet1();

//14 名字空间

var namespacing = {};
namespacing.names = "js";
namespacing.showName = function() {
	console.log(namespacing.names);
}

namespacing.showName();

//15  对象
var myObject = {
	objectName : "jimmy",/*注意这里是逗号*/
	"object-Age" : 29, /*名字可以包含特殊字符，如果有特殊字符需要使用引号阔起来*/
	say:sayGoodby,
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
//删除某个属性
delete user.firstName;
console.log('firstName' in user);
console.log('lastName' in user);

for(var key in user) {
	console.log("key ===="+key);
}

console.log("hasOwnProperty ===" +user.hasOwnProperty("lastName"))
console.log("hasOwnProperty ===" +user.hasOwnProperty("firstName"))
//通过原型添加
User.prototype.getLastName = function() {
	return this.lastName;
}
console.log(user.getLastName()+"<----->");

//apply call用法
function sayGoodby() {
	return this.objectName + "goodby!";
}
//console.log(sayGoodby.apply(myObject,[]));
console.log(sayGoodby.call(myObject,null));


//异常处理
function testTrycatch() {
	try{
		var value = 2/0;
		console.log(value);
		if(value == Infinity) {
			throw "Oops Infinity";
		}
	} catch(err) {
		console.log(err);
	} finally {
		console.log("finally!!!!");
	}
}

testTrycatch();



