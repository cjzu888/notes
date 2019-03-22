# vue全局组件的实践

##### LoginWxCode/index.js
```javascript
// LoginWxCode/index.js

import Vue from 'vue'
import LoginWxCodeVue from './index.vue'
// 使用Vue.extend基础一个Vue组件，获得一个独立的Vue组件
const LoginWxCodeConstructor = Vue.extend(LoginWxCodeVue)

// 定义服务的方法
const LoginWxCode = function (options) {
  // 如果实例存在则复用实例
  if (LoginWxCode.instance) {
    LoginWxCode.instance.visible = true
    return LoginWxCode.instance
  }
  // 处理传进来的参数
  if (options === undefined || options === null) {
    options = {
      content: ''
    }
  } else if (typeof options === 'string' || typeof options === 'number') {
    options = {
      content: options
    }
  }
  // new出一个Vue实例，该实例继承LoginWxCodeVue，
  // 且将上步骤处理好的参数传入
  // 此时还没有传入挂载点el，可以调用挂载方法$mount，返回实例
  let instance = new LoginWxCodeConstructor({
    data: options
  }).$mount()
  // 我们需要将实例产生的DOM加入到最外层的body中
  // 此时最外层的body就多出由上面Vue实例的DOM节点
  document.body.appendChild(instance.$el)
  // 将实例保存到当前的对象，再次调用可以复用
  LoginWxCode.instance = instance
  // 根据业务逻辑：在一次Vue循环后，可以修改实例的参数，让其显示
  Vue.nextTick(() => {
    instance.visible = true
  })
  // 可以将实例返回
  return instance
}

// 利用Vue插件，我们需要该文件导出后调用Vue.use()使用，必须得有个名为install的方法
// 该方法在Vue.use(xx)后会调用
const install = function(Vue) {
  // 将我们服务的方法挂载到外部Vue全局中去。
  Vue.prototype.$LoginWxCode = LoginWxCode;
};

// 如果外部有Vue是全局变量时，自动install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
// 将install导出即可被Vue.use()使用
export default install

```

##### main.js

```javascript
// main.js

import LoginWxCode from '@/components/LoginWxCode/index.js'
Vue.use(LoginWxCode)
```