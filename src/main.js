import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//import './registerServiceWorker'


//引入lib-flexible
import 'lib-flexible';

//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/tabbar/style/less';

Vue.use(Vant);

//引入axios
import axios from 'axios';
import VueAxios from 'vue-axios';
import {post, fetch, patch, put, imgUpload} from './http'
import qs from 'qs'

Vue.use(qs);
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$imgUpload = imgUpload;
Vue.use(VueAxios, axios);

//主题颜色
import './my-scss.scss'

//引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper);

//lazyload
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload);

//animate
import animated from 'animate.css'

Vue.use(animated);

//mint
import {CellSwipe} from 'mint-ui'

Vue.component('mt-cell-swipe', CellSwipe);

//cookie
import VueCookies from 'vue-cookies'

Vue.use(VueCookies);

//Mand Mobile
import {Progress, Bill} from 'mand-mobile'

Vue.component('md-progress', Progress);
Vue.component(Bill.name, Bill);

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');

/*关闭加载图片*/
document.getElementById("my-load").style.display = 'none';


