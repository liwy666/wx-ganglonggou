<template>
  <div class="write-order-main">
    <nav-bar title="填写订单"/>
    <write-order-component :api-base-url="apiBaseUrl"
                           :carts-preview="cartsPreview"
                           :user-token="userToken"
                           :integral-name="integralName"
                           @page-load-fail="pageLoadFail"
                           @write-order-success="writeOrderSuccess"
                           @write-order-fail="writeOrderFail"
                           @add-address="addAddress"
                           @switch-address="switchAddress"

    />
  </div>
</template>

<script>
    import WriteOrder from 'ganglonggou-write-order/dist/ganglonggou-write-order.common';
    import 'ganglonggou-write-order/dist/ganglonggou-write-order.css'
    import MyNavBar from '../sub/my-nav-bar'

    export default {
        name: "write-order",
        data() {
            return {
                apiBaseUrl: process.env.VUE_APP_API_URL + '/',
                userToken: this.$store.getters.getUserToken,
                cartsPreview: [],
                integralName: this.$store.state.integral_name,
            }
        },
        created() {
            const cartsSelected = this.$store.getters.getCartsSelected;
            cartsSelected.forEach((item) => {
                this.cartsPreview.push({
                    goodsId: item.goods_id,
                    skuId: item.sku_id,
                    goodsNumber: item.goods_number,
                })
            });
        },
        methods: {
            pageLoadFail(errorMsg) {
                console.log(`页面加载失败:${errorMsg}`);
            },
            writeOrderSuccess(resultObject) {
                //删除购物车
                const cartsSelected = this.$store.getters.getCartsSelected;
                cartsSelected.forEach(item => {
                    this.$store.commit('delCart', item);
                });
                //刷新用户信息
                this.$store.dispatch("getUserInfo", this.$store.getters.getUserToken);
                //刷新订单表
                this.$store.dispatch("getOrderList", this.$store.getters.getUserToken);
                //导航到订单查看
                this.$router.replace('/seeOrder/' + resultObject.orderSn);
            },
            writeOrderFail(errorMsg) {
                this.$toast(`提交订单失败:${errorMsg}`);
            },
            //添加收货地址
            addAddress() {
                this.$router.push({path: '/addressEdit', query: {address_edit: JSON.stringify({is_add: true,})}})
            },
            //切换收货地址
            switchAddress() {
                this.$router.push({path: '/addressList', query: {go_back: true}});
            },
        },
        components: {
            "write-order-component": WriteOrder,
            "nav-bar": MyNavBar,
        }
    }
</script>

<style scoped lang="scss">

</style>