import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'

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
import Activity01 from './components/activity/activity01/index' //现货专区活动页


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
        {path: '/activity01', component: Activity01,meta: {keepAlive: true}},
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
        // return 期望滚动到哪个的位置
    }
});

router.beforeEach((to, from, next) => {
    localStorage.setItem('beforeUrl', from.path);// 保存来源路由
    let user_token = VueCookies.get("gl_wx_user_token_20200205");
    if (user_token === null && to.path !== '/login') {
        // 第一次进入项目
        localStorage.setItem('beforeLoginUrl', to.fullPath);// 保存用户进入的url
        next('/login');
        return false
    }
    next()
});


// 把路由对象暴露出去
export default router