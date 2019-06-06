<template>
	<div class="main">
		<van-cell title="我的订单" icon="notes-o" is-link value="查看全部订单" @click="toOrderList('全部')"/>
		<van-tabbar v-model="active" :fixed="false">
			<van-tabbar-item @click="toOrderList('待付款')" icon="after-sale" :info="wait_pay_count===0? '' : wait_pay_count">待付款</van-tabbar-item>
			<van-tabbar-item @click="toOrderList('待收货')" icon="logistics" :info="wait_SignFor_count===0? '' : wait_SignFor_count">待收货</van-tabbar-item>
			<van-tabbar-item @click="toEvaluateList" icon="comment-o" :info="wait_evaluate_count===0? '' : wait_evaluate_count">待评价</van-tabbar-item>
			<van-tabbar-item @click="toOrderList('售后')" icon="todo-list-o" :info="service_count===0? '' : service_count">退货/售后</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                active: -1,
            }
        },
        watch: {
            'active': function () {
                this.active = -1;
            },
        },
        computed: {
            order_list: {
                get: function () {
                    return this.$store.state.order_list;
                }
            },
            wait_pay_count: {
                get: function () {
                    let result = 0;
                    if (this.order_list.length > 0) {
                        this.$store.state.order_list.forEach(item => {
                            if (item.order_state === 1) {
                                result++;
                            }
                        })
                    }
                    return result;
                }
            },
            wait_SignFor_count: {
                get: function () {
                    let result = 0;
                    if (this.order_list.length > 0) {
                        this.$store.state.order_list.forEach(item => {
                            if (item.order_state >= 2 && item.order_state <= 3) {
                                result++;
                            }
                        })
                    }
                    return result;
                }
            },
            wait_evaluate_count: {
                get: function () {
                    let result = 0;
                    if (this.order_list.length > 0) {
                        this.$store.state.order_list.forEach(item => {
                            item.mid_order.forEach(item2 => {
                                if (item.order_state === 4 && item2.is_evaluate === 0) {
                                    result++;
                                }
                            })
                        })
                    }
                    return result;
                }
            },
            service_count: {
                get: function () {
                    let result = 0;
                    if (this.order_list.length > 0) {
                        this.$store.state.order_list.forEach(item => {
                            if (item.order_state === 5) {
                                result++;
                            }
                        })
                    }
                    return result;
                }
            },
        },
        created() {

        },
        methods: {
            toOrderList(type_name) {
                this.$router.push('/orderList/'+type_name);
            },
            toEvaluateList(){
                this.$router.push('/evaluateList');
            }
        },
    };
</script>

<style lang="scss" scoped>
	.main {
		margin-top: 25px;
		
		.van-cell:not(:last-child)::after {
			border: 0px !important;
		}
	}
</style>