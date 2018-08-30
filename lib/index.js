/*
 * @Author: linxin 
 * @Date: 2017-07-27 
 * @Last Modified time: 2018-07-31 11:46:52 
 */

var Toast = {};
var toastTimer = false, // 存储toast定时器id
    toastVM = null, // 存储toast vm
    showLoad = false, // 存储loading显示状态
    loadNode = null; // 存储loading节点元素

Toast.install = function (Vue, options) {

    var opt = {
        type: 'bottom',
        duration: '2500',
        wordWrap: false,
        width: 'auto'
    };
    for (var property in options) {
        opt[property] = options[property];
    }
    Vue.prototype.$toast = function (tip, config) {
        var options = JSON.parse(JSON.stringify(opt));
        if(typeof config === 'object'){
            for (var property in config) {
                options[property] = config[property];
            }
        }else if(config){
            options['type'] = config
        }
        if (toastTimer) {
            // 如果toast还在，则取消上次消失时间
            clearTimeout(toastTimer);
            toastVM.show = false;
        }
        if (!toastVM) {
            var toastTpl = Vue.extend({
                data: function () {
                    return {
                        show: false,
                        tip: tip,
                        wordWrap: options.wordWrap,
                        type: options.type,
                        extStyle: {
                            width: options.width
                        },
                    }
                },
                render: function(h) {
                    if(!this.show) return
                    return h(
                        'div',
                        {
                            class: ['lx-toast', 'lx-toast-' + this.type, this.wordWrap?'lx-word-wrap':''],
                            style: this.extStyle,
                            show: this.show,
                            domProps: {
                                innerHTML: this.tip
                            }
                        }
                    )
                }
            });
            toastVM = new toastTpl()
            var tpl = toastVM.$mount().$el;
            document.body.appendChild(tpl);
        }

        toastVM.tip  = tip;
        toastVM.wordWrap = options.wordWrap;
        toastVM.type = options.type;
        toastVM.extStyle.width = options.width;
        toastVM.show = true;

        toastTimer = setTimeout(function () {
            toastVM.show = toastTimer = false;
        }, options.duration)
    };
    ['bottom', 'center', 'top'].forEach(function (type) {
        Vue.prototype.$toast[type] = function (tip, config) {
            if(!config){
                config = {};
            }
            config.type = type
            return Vue.prototype.$toast(tip, config)
        }
    });

    Vue.prototype.$loading = function (tip, type) {
        if (type == 'close') {
            if(loadNode) loadNode.show = showLoad = false;
        } else {
            if (showLoad && loadNode) {
                loadNode.tip = tip
                return;
            }
            var loadTpl = Vue.extend({
                data: function () {
                    return {
                        show: false,
                        tip: tip
                    }
                },
                render: function(h) {
                    if(!this.show) return
                    return h(
                        'div',
                        {
                            attrs: {
                                'class': 'lx-load-mark'
                            },
                            show: this.show
                        },
                        [
                            h(
                            'div',
                            {
                                attrs: {
                                    'class': 'lx-load-box'
                                }
                            },[
                                h(
                                    'div',
                                    {
                                        attrs: {
                                            'class': 'lx-loading'
                                        }
                                    }, Array.apply(null, {length: 12}).map(function(value, index){
                                        return h('div', {attrs: {'class': 'loading_leaf loading_leaf_' + index}})
                                    })
                                ),
                                h(
                                    'div',
                                    {
                                        attrs: {
                                            'class': 'lx-load-content'
                                        },
                                        domProps: {
                                            innerHTML: this.tip
                                        }
                                    }
                                )
                            ]
                            )
                        ]
                    );
                }
            });
            loadNode = new loadTpl();
            var tpl = loadNode.$mount().$el;

            document.body.appendChild(tpl);
            loadNode.show = showLoad = true;
        }
    };

    ['open', 'close'].forEach(function (type) {
        Vue.prototype.$loading[type] = function (tips) {
            return Vue.prototype.$loading(tips, type)
        }
    });
}
module.exports = Toast;