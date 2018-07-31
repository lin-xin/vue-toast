# vue2-toast
基于vue2的移动端 toast 插件。 [English document](https://github.com/lin-xin/vue-toast/blob/master/README.md)

<p>
  <a href="https://www.npmjs.com/package/vue2-toast"><img src="https://img.shields.io/npm/dm/vue2-toast.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue2-toast"><img src="https://img.shields.io/npm/v/vue2-toast.svg" alt="Version"></a>
  <br>
</p>

[互动演示](http://blog.gdfengshuo.com/example/#/vue2-toast)

## 使用
安装:

```
npm install vue2-toast -S
```
引入:

```javascript
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
Vue.use(Toast);
```
或者使用配置

```javascript
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
Vue.use(Toast, {
    type: 'center',
    duration: 3000,
    wordWrap: true,
    width: '150px'
});
```

在组件中使用:

```javascript
<template>
    <div id="app">
        <button @click="openTop()">top</button>
        <button @click="openCenter()">center</button>
        <button @click="openBottom()">bottom</button>
		<button @click="openLoading()">loading</button>
    </div>
</template>
export default {
    methods:{
        openTop(){
            this.$toast.top('top');
        },
        openCenter(){
            this.$toast.center('center');
        },
        openBottom(){
            this.$toast('bottom');  // or this.$toast.bottom('bottom'); 
        },
        openLoading(){
            this.$loading('loading...');
			let self = this;
	        setTimeout(function () {
	          self.closeLoading()
	        }, 2000)
        },
        closeLoading(){
            this.$loading.close();
        }
    }
}
```
## 在 Nuxt.js 中使用
除了 nuxt.js 使用 vue 插件的配置之外，还需要再 nuxt.config.js 添加以下配置

```js
build: {
	vendor: ['vue2-toast'],
	extend (config, ctx) {
	  if (ctx.isClient) {
	    config.resolve.alias['vue'] = 'vue/dist/vue.js';
	  }
	}
}
```

## 配置

    Vue.use(Toast, [options])

- type : Toast 的位置. | String | 默认: 'bottom' | 可选值 'top, center,bottom'
- duration : Number | 默认 2500ms
- wordWrap : 是否自动换行. | Boolean | 默认: false
- width : Toast 的宽度. | String | 默认: 'auto'


## demo
![image](https://raw.githubusercontent.com/lin-xin/vue-toast/master/screenshots/1.gif)