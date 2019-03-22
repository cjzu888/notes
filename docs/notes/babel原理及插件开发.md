# babel原理及插件开发

## babel转换代码的过程主要为三步：

### 解析
使用babelon这个解析器，它会根据输入的javascript代码字符串根据ESTree规范生成AST（抽象语法树）。
### 转换
根据一定的规则转换、修改AST。
### 生成
使用babel-generator将修改后的AST转换成普通代码。 

这就是babel工作的整个过程，就是纯粹的字符串输入输出而已，而babel插件或者预置的stage-0,1,2,3，jsx等，都是第二步转换的“规则”。

## 编写插件

### 简介
本文编写的插件为babel-plugin-webpack-async-module-name，用途是在webpack中为import()异步模块命名。  
具体转换是转换以下方法调用：

```javascript
importName('./a.js', 'name-a');
```

ES6是提供了一个import()方法用于动态导入模块，然而这个方法只有一个路径参数，没有能够为动态模块命名之类的参数，好在webpack社区提供了一种在webpack中的命名方式：

```javascript
import( /*webpackChunkName: 'name-a'*/'./a.js');
```

在使用的时候加入一行注释，根据注释中的webpackChunkName的值，结合webpack配置的output的chunkName为模块命名，具体可以查看webpack文档。

然而这样必须在每次调用的时候手动添加注释及注释中的名字，强迫症是无法忍受的，于是想了想发现babel可以实现一个自定义方法接收模块名生成带注释的import()方法，这个插件作用就是生成这个带注释的import()的方法。

### 编写
在babel-plugin-xxx.js中导出一个函数

```javascript
module.exports = function(babel) {
  var t = babel.types
  return {
    visitor: {

    }
  }
}
```
babel的插件系统基于访问者模式设计，我们编写的这个函数就是为访问者模式提供一个接口。  

babel.types包含里处理AST的一系列工具方法，具体可以查看[文档](https://github.com/babel/babel/tree/master/packages/babel-types#babel-types)，实际编写的时候，建议在[astexplorer.net/](astexplorer.net/)中输入编译前后的代码，对比AST的区别，然后通过babel.types提供的方法修改AST即可

编写babel插件首先需要知道要处理的哪种语法，具体到上面的这个插件中，需要处理的是函数调用，那么可以在visitor中添加CallExpression属性，代表处理的是函数调用，以下是具体代码。

```javascript
visitor: {
  CallExpression: function (path) {
    const {node} = path
    if (t.isIdentifier(node.callee, {name: 'importName'})) {
      const [module, name] = node.arguments
      if (name) {
        module.leadingComments = [{
          type: "CommentBlock",
          value: `webpackChunkName: '${name.value}'`
        }]
      }
      path.replaceWith(
        t.CallExpression(
          t.identifier('import'),
          [module]
        )
      )
    }
  }
}
```

## 生成
这一步就是根据babel配置中presets和plugin选项中定义的规则产生的新的AST去生成正常的代码。

## 总结
babel就是一个编译工具，根据输入字符串得到输出，解析 -> 转换 -> 生成就是大致原理，至于如何从正常代码解析成AST以及根据AST生成代码，我认为这是语言的编译原理相关，babel的解析器只是其中的一种实现，而babel的强大之处在于提供的丰富AST转换工具（好吧实际上是半路出家对于编译原理不甚了解就不好意思献丑了）。  

最后再次提一下这个插件babel-plugin-webpack-async-module-name，目前一定规模的前端应用采用代码异步加载是必然趋势，强迫症如果不想写一堆require.ensure()...一堆东西或者想使用import()作为异步模块导入并简单地自定义模块名，可以尝试下这个插件😎。 

本文来自[babel原理及插件开发](https://github.com/tgxhx/blog/issues/4)