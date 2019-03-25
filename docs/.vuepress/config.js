module.exports = {
  base: '/notes/',
  title: '个人笔记',
  description: '个人笔记',
  themeConfig: {
    docsDir: "docs",
    nav: [
      { text: 'Home', link: '/' },
      { text: '笔记', link: '/notes/' },
      { text: 'github', link: 'https://github.com/cjzu888' },
    ],
    sidebar: {
      '/notes/': [
        {
          title: "记录",
          // collapsable: false,//侧边栏自动收缩展开
          children: [
            // '',
            ["tc39/DOM和事件.md", "DOM和事件"],
            ["tc39/ES6.md", "ES6"],
            ["tc39/JavaScript.md", "JavaScript"],
            ["tc39/JS概念.md", "JS概念"],
            ["tc39/js设计模式.md", "js设计模式"],
            ["tc39/js深入浅出.md", "js深入浅出"],
            ["tc39/Promise.md", "Promise"],
            ["tc39/typescript.md", "typescript"],
            ['w3c/flex布局.md', 'flex布局'],
            ['w3c/HTML5_CSS3.md', 'HTML5_CSS3'],
            ["w3c/svg.md", "svg"],
            ["w3c/WEB_API.md", "WEB_API"],
            ['other/ajax.md', 'ajax'],
            ["other/git笔记.md", "git笔记"],
            ["other/浏览器兼容问题.md", "浏览器兼容问题"],
            ["other/实用代码段.md", "实用代码段"],
            ["section/Nodejs.md", "Nodejs"],
            ["section/vue.md", "vue"],
            ["section/编程概念.md", "编程概念"],
            ["section/打包工具.md", "打包工具"],
            ["section/造轮子思路.md", "造轮子思路"],
            ["section/前端单元测试.md", "前端单元测试"],
            ["section/虚拟DOM.md", "虚拟DOM"],
            ["section/自定义组件.md", "自定义组件"],
            ["section/Angularjs","Angularjs"],
            ["section/Angular6","Angular6"],
          ]
        },
        {
          title: "资源",
          children: [
            // '',
            ["section/前端资源.md", "前端资源"],
            ["section/书籍.md", "书籍"],
            ["section/开发环境.md", "插件"]
          ]
        },
        'js原型链',
        '资源'
      ],
    }
  },

}
