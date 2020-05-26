import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index.js'

//import './registerServiceWorker'

//引入功能函数和常量
import MyCommon from './common';

Vue.prototype.$MyCommon = MyCommon;

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
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper);

//lazyload
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload);

//animate
import animated from 'animate.css';

Vue.use(animated);

//mint
// import {CellSwipe} from 'mint-ui'
//
// Vue.component('mt-cell-swipe', CellSwipe);

//cookie
import VueCookies from 'vue-cookies'

Vue.use(VueCookies);

//Mand Mobile
import {Progress, Bill, ResultPage, Landscape} from 'mand-mobile'

Vue.component('md-progress', Progress);
Vue.component(Bill.name, Bill);
Vue.component(ResultPage.name, ResultPage);
Vue.component(Landscape.name, Landscape);
//ganglonggou-compents
import FirstPage from 'ganglonggou-firstpage/dist/ganglonggou-firstpage.common';
import 'ganglonggou-firstpage/dist/ganglonggou-firstpage.css';

Vue.use(FirstPage);
import ByPage from 'ganglonggou-by-page/dist/ganglonggou-by-page.common';
import 'ganglonggou-by-page/dist/ganglonggou-by-page.css'

Vue.use(ByPage);
import PromptGoodsPage from 'ganglonggou-prompt-goods-page/dist/ganglonggou-prompt-goods-page.common';
import 'ganglonggou-prompt-goods-page/dist/ganglonggou-prompt-goods-page.css'

Vue.use(PromptGoodsPage);
import RecommendPage from 'ganglonggou-recommend-page/dist/ganglonggou-recommend-page.common';
import 'ganglonggou-recommend-page/dist/ganglonggou-recommend-page.css'

Vue.use(RecommendPage);


Vue.config.productionTip = false;

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');

/*关闭加载图片*/
document.getElementById("my-load").style.display = 'none';


