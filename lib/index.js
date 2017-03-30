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

        let curType = type ? type : opt.defaultType;

        if(document.querySelector('.lx-toast')){
            // 如果toast还在，则不再执行
            return;
        }
        let toastTpl = Vue.extend({
            template: '<div class="lx-toast lx-toast-'+ curType +'">' + tips + '</div>'
        });
        let tpl = new toastTpl().$mount().$el;
        document.body.appendChild(tpl);
        setTimeout(function () {
            document.body.removeChild(tpl);
        }, opt.duration)
    }
    ['bottom', 'center', 'top'].forEach(type => {
        Vue.prototype.$toast[type] = (tips) => {
            return Vue.prototype.$toast(tips,type)
        }
    })

    Vue.prototype.$loading = (tips,type) => {
        let load = document.querySelector('.lx-load-mark');
        
        if(type == 'close'){
            load && document.body.removeChild(load);
        }else{
            if(load){
                // 如果loading还在，则不再执行
                return;
            }
            let loadTpl = Vue.extend({
                template: `
                <div class="lx-load-mark">
                    <div class="lx-load-box">
                        <div class="lx-loading">
                            <div class="loading_leaf loading_leaf_0"></div>
                            <div class="loading_leaf loading_leaf_1"></div>
                            <div class="loading_leaf loading_leaf_2"></div>
                            <div class="loading_leaf loading_leaf_3"></div>
                            <div class="loading_leaf loading_leaf_4"></div>
                            <div class="loading_leaf loading_leaf_5"></div>
                            <div class="loading_leaf loading_leaf_6"></div>
                            <div class="loading_leaf loading_leaf_7"></div>
                            <div class="loading_leaf loading_leaf_8"></div>
                            <div class="loading_leaf loading_leaf_9"></div>
                            <div class="loading_leaf loading_leaf_10"></div>
                            <div class="loading_leaf loading_leaf_11"></div>
                        </div>
                        <div class="lx-load-content">`+tips+`</div>
                    </div>
                </div>
                `
            });
            let tpl = new loadTpl().$mount().$el;
            document.body.appendChild(tpl);
        }
    }

    ['open', 'close'].forEach(type => {
        Vue.prototype.$loading[type] = (tips) => {
            return Vue.prototype.$loading(tips,type)
        }
    })
}
module.exports = Toast;