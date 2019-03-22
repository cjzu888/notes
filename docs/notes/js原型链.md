# js原型链

创建一个函数就会为其创建一个prototype属性，指向这个函数的原型对象，原型对象会自动获得constructor属性，指向prototype属性所在函数。
```
Function.prototype.a = "a";    
Object.prototype.b = "b";    
function Person(){}    
console.log(Person);    //function Person()    
let p = new Person();    
console.log(p);         //Person {} 对象    
console.log(p.a);       //undefined    
console.log(p.b);       //b 
p.__proto__ === Person.prototype；Person.prototype.constructor === Person
```
当调用某种方法或查找某种属性时，首先会在自身调用和查找，如果自身并没有该属性或方法，则会去它的__proto__属性中调用查找，也就是它构造函数的prototype中调用查找，如果构造函数中也没有该属性方法，则会去构造函数的隐式原型中查找，一直到null，就这样形成原型链。

![image](https://user-images.githubusercontent.com/28501094/38719872-a6076836-3f26-11e8-907e-f040e8760c9b.png)

![image](/notes/images/js_prototype.png)


更多有关原型请看：[原型和原型链](https://github.com/hezizi/Blog/issues/1)