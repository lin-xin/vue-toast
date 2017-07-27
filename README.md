# vue2-toast
A mobile toast plugin for vue2.(can't work in Nuxt.js/SSR)

<p>
  <a href="https://www.npmjs.com/package/vue2-toast"><img src="https://img.shields.io/npm/dm/vue2-toast.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue2-toast"><img src="https://img.shields.io/npm/v/vue2-toast.svg" alt="Version"></a>
  <br>
</p>

## Usage
Install:

```
npm install vue2-toast -S
```
Import:

```javascript
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
Vue.use(Toast);
```

Use in component:

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
## work in Nuxt.js
config it in nuxt.config.js

```
build: {
	vendor: ['vue2-toast'],
	extend (config, ctx) {
	  if (ctx.isClient) {
	    config.resolve.alias['vue'] = 'vue/dist/vue.js';
	  }
	}
}
```

## options

    Vue.use(Toast, [options])

- defaultType : position of Toast. | default: 'bottom' | possible 'top, center,bottom'
- duration : default 2500ms

## source code
download in [Github](https://github.com/lin-xin/vue-toast).

## demo
![image](https://raw.githubusercontent.com/lin-xin/vue-toast/master/screenshots/1.gif)