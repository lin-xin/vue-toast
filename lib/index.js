/**
 * Updated by linxin on 2017/7/5.
 */
var Toast = {};
var showToast = false,      // 存储toast显示状态
    showLoad = false,       // 存储loading显示状态
    loadNode = null;        // 存储loading节点元素

Toast.install = function (Vue, options) {
    var opt = {
        defaultType:'bottom',
        duration:'2500'
    };
    for(var property in options){
        opt[property] = options[property];
    }
    Vue.prototype.$toast = function(tips,type){

        var curType = type ? type : opt.defaultType;

        if(showToast){
            // 如果toast还在，则不再执行
            return;
        }
        var toastTpl = Vue.extend({
            data(){
                return {
                    show: showToast
                }
            },
            template: '<div v-show="show" class="lx-toast lx-toast-'+ curType +'">' + tips + '</div>'
        });
        var vm = new toastTpl()
        var tpl = vm.$mount().$el;

        document.body.appendChild(tpl);
        vm.show = showToast = true;

        setTimeout(function () {
            vm.show = showToast = false;
        }, opt.duration)
    };
    ['bottom', 'center', 'top'].forEach(function(type) {
        Vue.prototype.$toast[type] = function(tips) {
            return Vue.prototype.$toast(tips,type)
        }
    });

    Vue.prototype.$loading = function(tips,type) {
        if(type == 'close'){
            loadNode.show = showLoad = false;
        }else{
            if(showLoad){
                // 如果loading还在，则不再执行
                return;
            }
            var loadTpl = Vue.extend({
                data(){
                    return {
                        show: showLoad
                    }
                },
                template: '<div v-show="show" class="lx-load-mark"><div class="lx-load-box"><div class="lx-loading"><div class="loading_leaf loading_leaf_0"></div><div class="loading_leaf loading_leaf_1"></div><div class="loading_leaf loading_leaf_2"></div><div class="loading_leaf loading_leaf_3"></div><div class="loading_leaf loading_leaf_4"></div><div class="loading_leaf loading_leaf_5"></div><div class="loading_leaf loading_leaf_6"></div><div class="loading_leaf loading_leaf_7"></div><div class="loading_leaf loading_leaf_8"></div><div class="loading_leaf loading_leaf_9"></div><div class="loading_leaf loading_leaf_10"></div><div class="loading_leaf loading_leaf_11"></div></div><div class="lx-load-content">'+tips+'</div></div></div>'
            });
            loadNode = new loadTpl();
            var tpl = loadNode.$mount().$el;

            document.body.appendChild(tpl);
            loadNode.show = showLoad = true;
        }
    };

    ['open', 'close'].forEach(function(type) {
        Vue.prototype.$loading[type] = function(tips) {
            return Vue.prototype.$loading(tips,type)
        }
    });
}
module.exports = Toast;