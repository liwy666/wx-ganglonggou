<template>
	<div class="main">
		<myNarBar title="我的优惠券"></myNarBar>
		<oneCoupon v-for="(item) in coupon_list" :key="item.coupon_id" :coupon_info="item" :allow_get="false" :view_number="false"></oneCoupon>
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
            oneCoupon,//单个优惠券
        },
    };
</script>
<style lang="scss" scoped>
</style>