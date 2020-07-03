<template>
  <div class="have-coupons-page">
    <myNarBar title="我的优惠券"></myNarBar>
    <div class="have-coupons-main">
      <one-coupon v-for="(item) in coupon_list"
                  :key="item.coupon_id"
                  :coupon-info="item"
                  :allow-get="false"
      />
    </div>

  </div>
</template>
<script>
    import oneCoupon from './sub/one-coupon';
    import myNarBar from '../sub/my-nav-bar';

    export default {
        data() {
            return {};
        },
        computed: {
            coupon_list: {
                get: function () {
                    return this.$store.state.coupon_list;
                }
            }
        },
        created() {
            this.$store.dispatch("getCouponList", this.$store.getters.getUserToken);
        },
        methods: {},
        components: {
            myNarBar,//导航栏
            'one-coupon': oneCoupon,//单个优惠券
        },
    };
</script>
<style lang="scss" scoped>
  .have-coupons-page {
    width: 100vw;

    .have-coupons-main {
      width: 389px;
      margin: 10px auto;
    }
  }
</style>