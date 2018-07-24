import Vue from 'vue'
import App from './App'
import router from './router'
import HttpClient from './core/http-client';
import ElementUI from 'element-ui';
import 'bootstrap/dist/css/bootstrap.css';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.less';
import Pipes from './pipes';
import Plugins from './plugins';
import Components from './components';
import Es6Promise from 'es6-promise'
Es6Promise.polyfill();
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n)

Vue.use(ElementUI,{i18n:(key,value) =>i18n.t(key,value)});
Vue.use(HttpClient);
initPlugins(Plugins);
initPipe(Pipes);
initComponent(Components);
import Language from "./utils/language"
const language = Language.getLanguage() || 'zh';
const i18n = new VueI18n({
    locale: language,
    messages: {
        'en': Object.assign(require('./language/en-us.json'), enLocale),
        'zh': Object.assign(require('./language/zh-cn.json'), zhLocale)
    }
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
    i18n,
  router,
  components: { App },
  template: '<App/>'
});

function initPlugins(plugins) {
  plugins.forEach(plugin => {
    Vue.use(plugin);
  })
}
function initComponent(components) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
function initPipe(pipes) {
  Object.keys(pipes).forEach(key => {
    Vue.filter(key, pipes[key]);
  })
}
