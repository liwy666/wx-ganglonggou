<template>
	<div class="main">
		<myNarBar title="优惠券"></myNarBar>
		<oneCoupon v-for="(item) in coupon_list" :key="item.coupon_id" view_number allow_get :coupon_info="item"></oneCoupon>
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
</style>