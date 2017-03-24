# vue-toast
A mobile toast plugin for vue2.

## Usage
Install:

```
npm install vue-toast -S
```
Import:

```
import 'vue2-toast/lib/vue-toast.css';
import Toast from 'vue2-toast';
Vue.use(Toast);
```

Use in component:

```
<template>
    <div id="app">
        <button @click="openTop()">top</button>
        <button @click="openCenter()">center</button>
        <button @click="openBottom()">bottom</button>
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