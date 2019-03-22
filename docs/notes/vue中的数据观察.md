# vue中的数据观察



- initData方法初始化数据，在内部调用observe方法。
- 在observe中，该函数接受2个参数，一个是数据，一个布尔值，代表是否是顶层根数据；各种边界判断后，new Observer()，然后return该实例
- 在Observer构造函数中给实例绑定了3个属性，分别为data对象的value，计数用的vmCount、依赖dep。接着根据数据类型调用不同的遍历方法进行依赖收集。
    + Dep对象比较简单，包含2个属性和4个对应的原型方法。4个方法分别对应增、删、添加依赖、广播
    + 接着，用自定义的def方法把__ob__属性绑到了生成的observe实例上，该属性引用了自身。
    + 通过Object.defineProperty定义__ob__属性 this指向Observer实例　
    + 最后，根据value是类型是数组还是对象，调用不同的方法进行处理。案例中传进来的value是一个object，所以会跳到walk方法中。
- ![image](https://images2015.cnblogs.com/blog/858904/201705/858904-20170523155822820-256333304.png)

---