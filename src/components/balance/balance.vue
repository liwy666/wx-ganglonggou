<template>
	<div class="main">
		<myNarBar title="我的余额"></myNarBar>
		<van-cell-group>
			<van-cell title="全场余额" value="明细" :label="'剩余：'+ user_info.wx_0_balance+'元'" to="/balanceList/wx_0_balance" is-link/>
			<van-cell title="文具分类余额" value="明细" :label="'剩余：'+ user_info.wx_235_balance+'元'" to="/balanceList/wx_235_balance" is-link/>
		</van-cell-group>
		<div class="recharge-box">
			<balanceRecharge></balanceRecharge>
		</div>
	</div>
</template>

<script>
    import myNarBar from '../sub/my-nav-bar';
    import balanceRecharge from './balance-recharge/balance-recharge';
    export default {
        data() {
            return {};
        },
        computed: {
            user_info: {
                get: function () {
                    return this.$store.state.user_info;
                }
            }
        },
        created() {
            /*获取用户信息*/
            if (JSON.stringify(this.$store.state.user_info) === '{}') {
                this.$store.dispatch("getUserInfo", this.$store.getters.getUserToken);
            }
        },
        methods: {},
        components: {
            myNarBar,//头部组件
            balanceRecharge,//充值组件
        },
    };
</script>

<style lang="scss" scoped>
	.main {
		.recharge-box {
			background-color: white;
		}
	}
</style>