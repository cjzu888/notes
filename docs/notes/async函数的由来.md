# async 函数的由来

### Thunk函数
Thunk函数早在上个世纪60年代就诞生了。

那时，编程语言刚刚起步，计算机学家还在研究，编译器怎么写比较好。**一个争论的焦点是"求值策略"，即函数的参数到底应该何时求值。**

```javascript
var x = 1;

function f(m){
  return m * 2;     
}

f(x + 5)
```
上面代码先定义函数 f，然后向它传入表达式 x + 5 。请问，这个表达式应该何时求值？
- 一种意见是"传值调用"（call by value），即在进入函数体之前，就计算 x + 5 的值（等于6），再将这个值传入函数 f 。C语言就采用这种策略。

```javascript
f(x + 5)
// 传值调用时，等同于
f(6)
```

- 另一种意见是"传名调用"（call by name），即直接将表达式 x + 5 传入函数体，只在用到它的时候求值。Hskell语言采用这种策略。

```javascript
f(x + 5)
// 传名调用时，等同于
(x + 5) * 2
```


> 参考 [深入掌握 ECMAScript 6 异步编程》系列文章](http://www.ruanyifeng.com/blog/2015/05/thunk.html)