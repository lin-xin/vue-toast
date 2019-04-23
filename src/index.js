const Toast = {};
// toastTimer:存储toast定时器id; toastVM:存储toast vm; showLoad:存储loading显示状态; loadNode:存储loading节点元素;
let [toastTimer, toastVM, showLoad, loadNode] = [false, null, false, null];

// 默认配置
const defaultOption = {
    type: 'bottom',
    duration: '2500',
    wordWrap: false,
    width: 'auto'
};

Toast.install = (Vue, options) => {
    /**
     * toast方法
     * @param {string} tip 提示文本
     * @param {object|string} config 配置参数
     */
    Vue.prototype.$toast = (tip, config) => {
        let option = {};
        Object.assign(option, defaultOption, options);

        if(typeof config === 'object'){
            Object.assign(option, config);
        }else if(config){
            option['type'] = config
        }

        if (toastTimer) {
            // 如果toast还在，则取消上次消失时间
            clearTimeout(toastTimer);
            toastVM.show = false;
        }

        if(!toastVM){
            const toastTpl = Vue.extend({
                data(){
                    return {
                        show: false,
                        tip,
                        wordWrap: option.wordWrap,
                        type: option.type,
                        extStyle: {
                            width: option.width
                        },
                    }
                },
                render(h){
                    if(!this.show){
                        return false;
                    }
                    return h(
                        'div',
                        {
                            class: ['lx-toast', `lx-toast-${this.type}`, this.wordWrap?'lx-word-wrap':''],
                            style: this.extStyle,
                            show: this.show,
                            domProps: {
                                innerHTML: this.tip
                            }
                        }
                    )
                }
            });
            toastVM = new toastTpl();
            const tpl = toastVM.$mount().$el;
            document.body.appendChild(tpl);
        }

        toastVM.tip  = tip;
        toastVM.wordWrap = option.wordWrap;
        toastVM.type = option.type;
        toastVM.extStyle.width = option.width;
        toastVM.show = true;

        toastTimer = setTimeout(() => {
            toastVM.show = toastTimer = false;
        }, option.duration);
    };

    ['bottom', 'center', 'top'].forEach(type => {
        Vue.prototype.$toast[type] = (tip, config = {type}) => {
            return Vue.prototype.$toast(tip, config);
        }
    });

    /**
     * loading方法
     * @param {*string} tip 提示文本
     * @param {*string} type loading类型，可选open/close
     */
    Vue.prototype.$loading = (tip, type) => {
        if(type === 'close'){
            if(loadNode){
                loadNode.show = showLoad = false;
            }
        }else{
            if(showLoad && loadNode){
                showLoad.tip = tip;
                return false;
            }
            const loadTpl = Vue.extend({
                data(){
                    return {
                        show: false,
                        tip
                    }
                },
                render(h){
                    if(!this.show){
                        return ;
                    }
                    return h('div', {
                        class: 'lx-load-mark',
                        show: this.show
                    },[
                        h('div', {
                            class: 'lx-load-box'
                        }, [
                            h('div', {
                                class: this.tip?'lx-loading':'lx-loading-nocontent'
                            }, Array.apply(null, {length: 12}).map((value, index) => {
                                return h('div', {
                                    class: ['loading_leaf',`loading_leaf_${index}`]
                                })
                            })),
                            h('div', {
                                class: 'lx-load-content',
                                domProps: {
                                    innerHTML: this.tip
                                }
                            })
                        ])
                    ])
                }
            });
            loadNode = new loadTpl();
            const tpl = loadNode.$mount().$el;

            document.body.appendChild(tpl);
            loadNode.show = showLoad = true;
        }
    };

    ['open', 'close'].forEach(type => {
        Vue.prototype.$loading[type] = tip => {
            return Vue.prototype.$loading(tip, type);
        }
    })
}
export default Toast;