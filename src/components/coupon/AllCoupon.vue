<template>
  <div class="all-coupon-page">
    <myNarBar title="领券中心"/>
    <div class="all-coupon-main">
      <oneCoupon v-for="(item) in coupon_list"
                 :key="item.coupon_id"
                 :coupon-info="item"/>
    </div>

  </div>
</template>
<script>
    import myNarBar from '../sub/my-nav-bar'
    import oneCoupon from './sub/one-coupon'

    export default {
        data() {
            return {
                coupon_list: []
            };
        },
        computed: {},
        created() {
            this.getCouponList();
        },
        methods: {
            getCouponList() {
                /*user_get_all_coupon_list*/
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '加载中',
                    duration: 0
                });
                this.$fetch('user_get_all_coupon_list', {
                    into_type: this.$store.state.into_type,
                })
                    .then((msg) => {
                        if (msg) {
                            this.coupon_list = msg;
                        }
                        toast1.clear();
                    })
            }
        },
        components: {
            myNarBar,
            oneCoupon
        }
    };
</script>
<style lang="scss" scoped>
  .all-coupon-page {
    width: 100vw;
    .all-coupon-main {
      width: 389px;
      margin: 10px auto;
      overflow: hidden;
    }
  }

</style>