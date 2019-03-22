module.exports = {
  base: '/notes/',
  title: '个人笔记',
  description: '个人笔记',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '笔记', link: '/notes/' },
      { text: 'github', link: 'https://github.com/cjzu888' },
    ],
    sidebar: {
      '/notes/': [
        'js原型链',
        '资源'
      ],
    }
  },

}
