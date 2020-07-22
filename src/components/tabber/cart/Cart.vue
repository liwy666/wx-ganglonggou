<template>
  <shop-carts-components :api-base-url="apiBaseUrl"
                         :head-open="false"
                         :show-back-button="false"
                         :carts-preview="cartsPreview"
                         @add-cart="addCart"
                         @delete-cart="deleteCart"
                         @update-cart-number="updateCartNumber"
                         @switch-cart-choice-state="switchCartChoiceState"
                         @goods-click="goodsClick"
                         @buy-goods="buyGoods"
                         @settle="goSettleAccounts"
  />

</template>

<script>
    import ShopCartsComponent from 'ganglonggou-shop-carts/dist/ganglonggou-shop-carts.common';
    import 'ganglonggou-shop-carts/dist/ganglonggou-shop-carts.css'

    export default {
        name: "ShopCarts",
        data() {
            return {
                count: 0,
                apiBaseUrl: process.env.VUE_APP_API_URL + '/',
                cartsPreview: [],
            };
        },
        created() {
            const carts = this.$store.state.carts;
            if (carts && carts.length > 0) {
                carts.forEach(cart => {
                    this.cartsPreview.push({
                        goodsId: cart.goods_id,
                        goodsNumber: cart.goods_number,
                        skuId: cart.sku_id,
                        selected: cart.selected,
                    });
                })
            }
        },
        methods: {
            //去结算
            goSettleAccounts() {
                if (this.$store.getters.getCartsSelectedCount > 0) {
                    this.$router.push({path: '/writeOrder', query: {is_init: true}});
                } else {
                    this.$toast("还未选中商品哦~~")
                }
            },
            //去选购
            buyGoods() {
                this.$router.push('/first');
            },
            //商品点击
            goodsClick(goodsId) {
                this.$router.push(`/goods/${goodsId}`);
            },
            //添加购物车
            addCart(cartInfo) {
                console.log(cartInfo);
                this.$store.commit('addCart', cartInfo);
            },
            //删除购物车
            deleteCart(cartInfo) {
                this.$store.commit('delCart', cartInfo);
            },
            //更新购物车数量
            updateCartNumber(cartInfo) {
                this.$store.commit('updCartNumber', cartInfo);
            },
            //切换选中状态
            switchCartChoiceState(cartInfo) {
                this.$store.commit('updCartSelected', cartInfo);
            },

        },
        components: {
            'shop-carts-components': ShopCartsComponent,
        },
    };
</script>

<style lang="scss" scoped>
</style>