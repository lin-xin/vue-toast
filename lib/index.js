"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Toast = {}; // toastTimer:存储toast定时器id; toastVM:存储toast vm; showLoad:存储loading显示状态; loadNode:存储loading节点元素;

var toastTimer = false,
    toastVM = null,
    showLoad = false,
    loadNode = null; // 默认配置

var defaultOption = {
  type: 'bottom',
  duration: '2500',
  wordWrap: false,
  width: 'auto'
};

Toast.install = function (Vue, options) {
  /**
   * toast方法
   * @param {string} tip 提示文本
   * @param {object|string} config 配置参数
   */
  Vue.prototype.$toast = function (tip, config) {
    var option = {};
    Object.assign(option, defaultOption, options);

    if (_typeof(config) === 'object') {
      Object.assign(option, config);
    } else if (config) {
      option['type'] = config;
    }

    if (toastTimer) {
      // 如果toast还在，则取消上次消失时间
      clearTimeout(toastTimer);
      toastVM.show = false;
    }

    if (!toastVM) {
      var toastTpl = Vue.extend({
        data: function data() {
          return {
            show: false,
            tip: tip,
            wordWrap: option.wordWrap,
            type: option.type,
            extStyle: {
              width: option.width
            }
          };
        },
        render: function render(h) {
          if (!this.show) {
            return false;
          }

          return h('div', {
            class: ['lx-toast', "lx-toast-".concat(this.type), this.wordWrap ? 'lx-word-wrap' : ''],
            style: this.extStyle,
            show: this.show,
            domProps: {
              innerHTML: this.tip
            }
          });
        }
      });
      toastVM = new toastTpl();
      var tpl = toastVM.$mount().$el;
      document.body.appendChild(tpl);
    }

    toastVM.tip = tip;
    toastVM.wordWrap = option.wordWrap;
    toastVM.type = option.type;
    toastVM.extStyle.width = option.width;
    toastVM.show = true;
    toastTimer = setTimeout(function () {
      toastVM.show = toastTimer = false;
    }, option.duration);
  };

  ['bottom', 'center', 'top'].forEach(function (type) {
    Vue.prototype.$toast[type] = function (tip) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        type: type
      };
      return Vue.prototype.$toast(tip, config);
    };
  });
  /**
   * loading方法
   * @param {*string} tip 提示文本
   * @param {*string} type loading类型，可选open/close
   */

  Vue.prototype.$loading = function (tip, type) {
    if (type === 'close') {
      if (loadNode) {
        loadNode.show = showLoad = false;
      }
    } else {
      if (showLoad && loadNode) {
        showLoad.tip = tip;
        return false;
      }

      var loadTpl = Vue.extend({
        data: function data() {
          return {
            show: false,
            tip: tip
          };
        },
        render: function render(h) {
          if (!this.show) {
            return;
          }

          return h('div', {
            class: 'lx-load-mark',
            show: this.show
          }, [h('div', {
            class: 'lx-load-box'
          }, [h('div', {
            class: this.tip ? 'lx-loading' : 'lx-loading-nocontent'
          }, Array.apply(null, {
            length: 12
          }).map(function (value, index) {
            return h('div', {
              class: ['loading_leaf', "loading_leaf_".concat(index)]
            });
          })), h('div', {
            class: 'lx-load-content',
            domProps: {
              innerHTML: this.tip
            }
          })])]);
        }
      });
      loadNode = new loadTpl();
      var tpl = loadNode.$mount().$el;
      document.body.appendChild(tpl);
      loadNode.show = showLoad = true;
    }
  };

  ['open', 'close'].forEach(function (type) {
    Vue.prototype.$loading[type] = function (tip) {
      return Vue.prototype.$loading(tip, type);
    };
  });
};

var _default = Toast;
exports.default = _default;