<template>
  <goods-page-component
      :api-base-url="baseApiUrl"
      :show-right-button="false"
      :goods-name="goodsName"
      :goods-main-img="goodsMainImg"
      :sku-id="skuId"
      :is-open="false"
      :cart-number="cartNumber"
      :integral-name="$store.state.integral_name"
      :goods-id="goodsId"
      @coupon-click="couponClick"
      @get-more-evaluate="getMoreEvaluate"
      @goods-card-click="goodsCardClick"
      @online-customer-service="onlineCustomerService"
      @phone-service="phoneService"
      @shop-car-click="shopCarClick"
      @add-shop-cart="addShopCart"
      @immediate-buy="immediateBuy"
      @page-complete="pageComplete"
      @back-button-click="backButtonClick"
      @image-preview="showImagePreview"
  />
</template>

<script>
    import GoodsPageComponent from 'ganglonggou-goods-page-component/dist/ganglonggou-goods-page-component.common';
    import 'ganglonggou-goods-page-component/dist/ganglonggou-goods-page-component.css';
    import {commonShare} from "../../share";
    import {ImagePreview} from 'vant';

    export default {
        name: "GoodsPage",
        data() {
            return {
                baseApiUrl: process.env.VUE_APP_API_URL,
                goodsName: "",
                goodsMainImg: "",
                goodsId: "472",
                skuId: 0,
                cartNumber: 0,
            }
        },
        created() {
            const goodsId = this.$route.params.goods_id;
            this.initGoodsPage(goodsId);
        },
        beforeRouteUpdate(to) {
            const goodsId = to.params.goods_id;
            this.initGoodsPage(goodsId);
        },
        methods: {
            initGoodsPage(goodsId) {
                this.cartNumber = this.$store.getters.getCartsGoodsNumberCount;
                this.goodsId = goodsId;
            },
            /*传递事件*/
            //优惠券点击事件
            couponClick(couponId) {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '领取中...',
                    duration: 0
                });
                this.$post('user_get_coupon', {coupon_id: couponId, user_token: this.$store.getters.getUserToken})
                    .then((msg) => {
                        toast1.clear();
                        this.$toast(msg);
                    })
            },
            //获取更多评价
            getMoreEvaluate(data) {
                this.$router.push({path: '/goods_evaluate_list', query: data});
            },
            //商品卡片点击
            goodsCardClick(goodsId) {
                this.$router.push(`/goods/${goodsId}`);
            },
            //点击在线客服
            onlineCustomerService() {
                this.$router.push({
                    path: '/myIframe',
                    query: {src: 'https://p.qiao.baidu.com/cps2/mobileChat?siteId=11040705&userId=24298402&type=1&reqParam=&appId=&referer='}
                });
            },
            //点击电话客服
            phoneService() {
                window.location.href = 'tel:400-187-6188';
            },
            //点击购物车
            shopCarClick() {
                this.$router.push('/cart');
            },
            //加入购物车
            addShopCart(cartInfo) {
                this.$store.commit('addCart', cartInfo);
            },
            //立即购买
            immediateBuy(cartInfo) {
                //     清空已选中列表
                this.$set(this.$store.state, 'carts_selected', []);
                //    把选中开关全部关闭
                this.$store.state.carts.forEach(item => {
                    item.selected = false;
                });
                //    添加当前商品到购物车
                this.$store.commit('addCart', cartInfo);
                //更新购物车数量
                this.$store.commit("updCartNumber", cartInfo);
                //打开此件商品开关
                this.$store.commit("openCartSelected", cartInfo);
                //    跳转提交页面
                this.$router.push('/writeOrder');
            },
            //页面准备完成
            pageComplete(cartInfo) {
                let share_url = (this.$store.state.local_url + "?gl_goods_id=" + this.goodsId);
                commonShare(this,
                    cartInfo.goods_name,
                    share_url,
                    cartInfo.goods_attribute_img,
                    '江苏岗隆数码-您身边的数码产品服务商');
            },
            //返回按钮点击
            backButtonClick() {
                this.$router.go(-1);
            },
            showImagePreview(imgSrc) {
                ImagePreview([imgSrc]);
            }
        },
        components: {
            'goods-page-component': GoodsPageComponent
        }
    }
</script>

<style scoped lang="scss">

</style>