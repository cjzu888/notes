# AST学习

#### AST三板斧：  
- 通过 esprima 把源码转化为AST
- 通过 estraverse 遍历并更新AST
- 通过 escodegen 将AST重新生成源码

#### 相关工具：
- esprima: http://esprima.org/demo/parse.html#(将代码转换为标准 ast)
- espree: https://github.com/eslint/espree
- escodegen: https://github.com/estools/escodegen(将ast生成为标准code)
- estraverse: https://github.com/estools/estraverse(遍历并且更新抽象语法树)

### 工作原理
- .vue 组件 => vue-template-compiler => ssrRender
- ssrRender => esprima => js-ast
- js-ast => estraverse(各种替换/解析处理) => result-js-ast
- result-js-ast => escodegen => result-ssrRender
- result-ssrRender => vue-server-rander => html-php-code
- 递归处理 html-php-code 中无法解析的 vnode(component) => html-php-code