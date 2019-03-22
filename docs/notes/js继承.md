# js继承的几种方式

```javascript
// 基类
let Animal = (function () {
      function Animal (name) {
        this.name = name || 'Animal';
        this.sleep = function(){
          console.log(this.name + '正在睡觉！');
        }
      }
      Animal.prototype.eat = function(food) {
        console.log(this.name + '正在吃：' + food);
      }
      return Animal;
    })()

// 1、原型链继承。
// 仅是继承了原型链上的方法，没能继承父类的属性
let Cat = (function () {
      function Cat(){ }
      Cat.prototype = new Animal();
      Cat.prototype.name = 'cat';
      return Cat;
    })()

// 2、构造函数继承(对象冒充继承)
// 与原型链继承相反，仅是继承父类的属性，没能继承原型链上的方法--非共享(子类自有一份)
let Cat = (function () {
      function Cat(name){
        Animal.call(this,name);
      }
      return Cat;
    })()
    
// 3、组合继承
// 原型链继承和构造函数继承的结合，合理的利用了这两种组合的特点。
// 缺点就是调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）造成内存浪费
// 为了使子类拥有自己的实例属性，在子类的构造函数里调用了基类的构造函数，用于覆盖原型链继承的共享属性。
// 所以，组合式继承会两次调用基类的构造函数：第一次，子类的原型声明为基类的一个实例；第二次，子类的构造函数中调用基类的构造函数。
let Cat = (function () {
      function Cat(name){
        Animal.call(this, name);    // 第二次调用基类的构造函数
      }
      Cat.prototype = new Animal(); // 第一次调用基类的构造函数
      Cat.prototype.constructor = Cat;
      return Cat;
    })()
    
// 4、寄生组合继承
// 改进的组合继承内存浪费的问题
let Cat = (function () {
      function Cat(name){
        Animal.call(this, name);    // 继承属性
      }
      (function(sub, sup){
        var obj = Object.create(sup.prototype); 
        obj.constructor = sub;  // 正确的constructor指向
        sub.prototype = obj;    // 继承原型链
      })(Cat, Animal)
      return Cat;
    })()
```

