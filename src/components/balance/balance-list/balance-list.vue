<template>
	<div class="main">
		<myNarBar title="余额明细"></myNarBar>
		<van-tabs v-model="active">
			<van-tab title="充值明细">
				<rechargeOrder v-for="(item) in recharge_order" :key="item.recharge_id"
				               :recharge_order_info="item"></rechargeOrder>
			</van-tab>
			<van-tab title="使用明细">
				<useOrder  v-for="(item) in balance_use" :key="item.balance_use_id" :use_info="item"></useOrder>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
    import myNarBar from '../../sub/my-nav-bar';
    import rechargeOrder from './sub/recharge-order'
    import useOrder from './sub/use-order'
    export default {
        data() {
            return {
                active: 0,
                bystages_code: ''
            };
        },
        computed: {
            recharge_order: {
                get: function () {
                    let result = [];
                    if (this.$store.state.balance_list.length !== 0) {
                        if (this.$store.state.balance_list.recharge_order.length > 0) {
                            this.$store.state.balance_list.recharge_order.forEach(item => {
                                if (item.bystages_code === this.bystages_code) {
                                    result.push(item);
                                }
                            })
                        }
                    }

                    if (result.length > 0) {
                        for (let i = 0; i < result.length - 1; i++) {
                            for (let j = 0; j < result.length - i - 1; j++) {
                                if (this.dateStringConvert(result[j].recharge_time) < this.dateStringConvert(result[j + 1].recharge_time)) {
                                    let max = result[j];
                                    result[j] = result[j + 1];
                                    result[j + 1] = max;
                                }
                            }
                        }
                    }

                    return result;
                }
            },
            balance_use: {
                get: function () {
                    let result = [];
                    if (this.$store.state.balance_list.length !== 0) {
                        if (this.$store.state.balance_list.balance_use.length > 0) {
                            this.$store.state.balance_list.balance_use.forEach(item => {
                                if (item.bystages_code === this.bystages_code) {
                                    result.push(item);
                                }
                            })
                        }
                    }

                    if (result.length > 0) {
                        for (let i = 0; i < result.length - 1; i++) {
                            for (let j = 0; j < result.length - i - 1; j++) {
                                if (this.dateStringConvert(result[j].balance_use_time) < this.dateStringConvert(result[j + 1].balance_use_time)) {
                                    let max = result[j];
                                    result[j] = result[j + 1];
                                    result[j + 1] = max;
                                }
                            }
                        }
                    }
                    return result;
                }
            }
        },
        created() {
            /*获取余额列表*/
            if (this.$store.state.balance_list.length < 1) {
                this.$store.dispatch("getBalanceList", this.$store.getters.getUserToken);
            }
            this.bystages_code = this.$route.params.bystages_code;
        },
        methods: {
            /**
             * 时间字符串转时间戳
             * @param date_str
             * @returns {number}
             */
            dateStringConvert(date_str) {
                date_str = date_str.substring(0, 19);
                date_str = date_str.replace(/-/g, '/');
                return parseInt(new Date(date_str).getTime());
            }
        },
        components: {
            myNarBar,
            rechargeOrder,
            useOrder,
        }
    };
</script>

<style lang="scss" scoped>
	.main {
		.van-tabs--line {
			padding-top: 0;
		}
	}
</style>