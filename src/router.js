import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import {fetch} from './http.js'
import glToolFunction from 'ganglong-tool-function';
import {Toast} from 'vant';

Vue.use(Router);


// 导入对应的路由组件
import Index from './components/tabber/Index.vue'
import Login from './components/Login'
import First from './components/tabber/first/First'//首页
import AboutMall from './components/tabber/aboutMall/AboutMall'//关于商城
import Classify from './components/tabber/classify/Classify'//分类
import Spike from './components/tabber/spike/Spike'//秒杀
import Cart from './components/tabber/cart/Cart'//购物车
import Home from './components/tabber/home/Home'//个人中心
import AllCoupon from './components/coupon/AllCoupon' //优惠券列表
import Goods from './components/goods/Index'//商品详情
import supplier from './components/supplier/Supplier'//商品详情
import myIframe from './components/sub/my-iframe'//页中页
import writeOrder from './components/order-form/write-order'//填写订单
import addressList from './components/address/address'//地址列表
import couponList from './components/coupon/coupon'//地址列表
import AddressEdit from './components/address/sub/my-address-edit'//地址列表
import SeeOrder from './components/order-form/see-order'//查看订单
import orderList from './components/tabber/home/order_list/order_list'//订单列表
import goodsList from './components/goods-list/goods-list'//商品列表
import evaluateList from './components/tabber/home/evaluate-list/evaluate-list'//评价列表
import putEvaluate from './components/tabber/home/evaluate-list/put-evaluate/put-evaluate'//提交评价
import Search from './components/search/my-search'//搜索商品
import afterSale from './components/tabber/home/after-sale/after-sale' //申请售后
import updateUserInfo from './components/tabber/home/update-user-info/update-user-info' //修改用户信息
import balance from './components/balance/balance' //用户余额
import balanceList from './components/balance/balance-list/balance-list' //用户余额明细
import Article from './components/article/article' //内部文章
import PcLogin from './components/PcLogin/PcLogin' //pc登录
import Activity01 from './components/activity/activity01/index'
import ActivityStationery from "./components/activity/activity_stationery/ActivityStationery"; //现货专区活动页
import ActivityByPage from "./components/activity/ActivityByPage";//包邮专区
import ActivityPromptGoodsPage from "./components/activity/ActivityPromptGoodsPage";//现货专区
import ActivityRecommendPage from "./components/activity/ActivityRecommendPage";//推荐商品
import ActivityClassPage from "./components/activity/ActivityClassPage";//分类详情
import BindingPhone from "./components/BindingPhone";//绑定手机号
/*积分*/
import IntegralCenter from "./components/integral/IntegralCenter";//积分中心
import LoginGetIntegral from "./components/integral/LoginGetIntegral";//积分签到

// 3. 创建路由对象
var router = new Router({
    routes: [
        // 配置路由规则
        {path: '/', redirect: '/index'},
        {
            path: '/index', component: Index,
            meta: {
                keepAlive: true, //此组件需要被缓存
            }, children: [
                {path: '/', redirect: '/first', meta: {keepAlive: true}},
                {path: '/first', component: First, meta: {keepAlive: true}},
                {path: '/aboutMall', component: AboutMall, meta: {keepAlive: true}},
                {path: '/classify', component: Classify, meta: {keepAlive: true}},
                {path: '/spike', component: Spike, meta: {keepAlive: true}},
                {path: '/cart', component: Cart, meta: {keepAlive: false}},
                {path: '/home', component: Home, meta: {keepAlive: true}}
            ]
        },
        {path: '/login', component: Login},
        {path: '/goods/:goods_id', component: Goods},
        {path: '/allCoupon/', component: AllCoupon},
        {path: '/supplier', component: supplier, meta: {keepAlive: true}},
        {path: '/article/:article_id', component: Article},
        {path: '/myIframe', component: myIframe},
        {path: '/writeOrder', component: writeOrder},
        {path: '/seeOrder/:order_sn', component: SeeOrder},
        {path: '/addressList', component: addressList},
        {path: '/couponList', component: couponList},
        {path: '/addressEdit', component: AddressEdit},
        {path: '/orderList/:type_name', component: orderList},
        {path: '/evaluateList', component: evaluateList},
        {path: '/putEvaluate', component: putEvaluate},
        {path: '/search', component: Search},
        {path: '/balance', component: balance},
        {path: '/balanceList/:bystages_code', component: balanceList},
        {path: '/updateUserInfo', component: updateUserInfo},
        {path: '/afterSale/:order_sn', component: afterSale},
        {path: '/goodsList', component: goodsList, meta: {keepAlive: true}},
        {path: '/pcLogin', component: PcLogin},
        {path: '/binding_phone', component: BindingPhone},
        {path: '/activity01', component: Activity01, meta: {keepAlive: true}},
        {path: '/activity_stationery', component: ActivityStationery, meta: {keepAlive: true}},
        {path: '/activity_by', component: ActivityByPage, meta: {keepAlive: true}},
        {path: '/activity_prompt_goods', component: ActivityPromptGoodsPage, meta: {keepAlive: true}},
        {path: '/activity_recommend', component: ActivityRecommendPage, meta: {keepAlive: true}},
        {path: '/activity_classify_page', component: ActivityClassPage, meta: {keepAlive: false}},
        {path: '/integral_center', component: IntegralCenter},
        {path: '/login_get_integral', component: LoginGetIntegral},

    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
        // return 期望滚动到哪个的位置
    }
});

/**
 * 检查用户是否登陆
 * @param to
 * @param from
 * @param next
 * @returns {boolean}
 */
function checkUserIsLogin(to, from, next) {
    localStorage.setItem('beforeUrl', from.path);// 保存来源路由
    const userTokenName = process.env.VUE_APP_USER_TOKEN_NAME;
    let user_token = VueCookies.get(userTokenName);
    if (user_token === null && to.path !== '/login') {
        // 第一次进入项目
        localStorage.setItem('beforeLoginUrl', to.fullPath);// 保存用户进入的url
        return false
    }
    return true;
}


/**
 * 检查用户是否绑定手机号
 * @param to
 * @param from
 * @param next
 * @returns {boolean}
 */
async function checkUserBindingPhone(to, from, next) {
    const needPath = ['/writeOrder', '/card_activation'];
    if (!needPath.includes(to.path)) return true;
    const userTokenName = process.env.VUE_APP_USER_TOKEN_NAME;
    let userToken = VueCookies.get(userTokenName);
    let checkFlag = false;
    Toast.loading({
        mask: true,
        message: '检查用户状态',
        duration: 0
    });
    await fetch('user_get_user_info', {user_token: userToken}).then((userInfo) => {

        if (glToolFunction.verificationPhoneNumber(userInfo['phone'])) {
            checkFlag = true;
        } else {
            //未绑定手机号
            localStorage.setItem('beforeBindingPhoneUrl', to.fullPath);// 保存用户进入的url
        }
        Toast.clear();
    });
    return checkFlag;
}

router.beforeEach(async (to, from, next) => {

    //检查用户登陆
    if (!checkUserIsLogin(to, from, next)) {
        next('/login');
        return false;
    }
    //检查用户是否绑定手机号
    if (!await checkUserBindingPhone(to, from, next)) {
        next('/binding_phone');
        return false;
    }

    next();
});


// 把路由对象暴露出去
export default router