/**
 * Created by linxin on 2017/3/22.
 */
var Toast = {};
Toast.install = function (Vue, options) {
    let opt = {
        defaultType:'bottom',
        duration:'2500'
    }
    for(let property in options){
        opt[property] = options[property];
    }
    Vue.prototype.$toast = (tips,type) => {
        if(type){
            opt.defaultType = type;
        }
        if(document.getElementsByClassName('vue-toast').length){
            // 如果toast还在，则不再执行
            return;
        }
        let toastTpl = Vue.extend({
            template: '<div class="vue-toast toast-'+opt.defaultType+'">' + tips + '</div>'
        });
        let tpl = new toastTpl().$mount().$el;
        document.body.appendChild(tpl);
        setTimeout(function () {
            document.body.removeChild(tpl);
        }, 2500)
    }
    ['bottom', 'center', 'top'].forEach(type => {
        Vue.prototype.$toast[type] = (tips) => {
            return Vue.prototype.$toast(tips,type)
        }
    })
}
module.exports = Toast;