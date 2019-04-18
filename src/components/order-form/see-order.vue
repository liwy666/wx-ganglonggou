<template>
	<div class="main">
		<myNarBar title="订单查看"></myNarBar>
		<!--订单状态-->
		<van-steps v-if="order_info.order_state >=1 && order_info.order_state <=4" :active="active">
			<van-step>提交订单</van-step>
			<van-step>支付订单</van-step>
			<van-step>商家发货</van-step>
			<van-step>交易完成</van-step>
		</van-steps>
		<!--收货地址-->
		<van-contact-card
						v-if="JSON.stringify(order_info) !== '{}'"
						type="edit"
						:name="order_info.logistics.logistics_address_name +'（'+order_info.logistics.logistics_desc+'）'"
						:tel="order_info.logistics.logistics_address_phone"
						:editable="false"
		/>
		<!--支付选项,因为农行支付不可切换问题，关闭-->
	<!--	<payOption
						v-if="$store.state.pay_list.length > 0 && JSON.stringify(order_info) !== '{}' && order_info.order_state === 1"
						:order_info="order_info" :pay_lsit="$store.state.pay_list"></payOption>-->
		<!--商品列表-->
		<goodsList v-if="JSON.stringify(order_info) !== '{}'" :goods_list="order_info.midorder"></goodsList>
		<!--订单详情-->
		<orderInfo v-if="JSON.stringify(order_info) !== '{}'" :order_info="order_info"></orderInfo>
		<!--物流详情-->
		<logisticsInfo v-if="JSON.stringify(order_info) !== '{}' &&  parseInt(order_info.order_state) >= 3"  :logistics="order_info.logistics"></logisticsInfo>
		<!--费用详情-->
		<payInfo v-if="JSON.stringify(order_info) !== '{}'" :order_info="order_info"></payInfo>
		<!--下方操作按钮-->
		<orderOperation v-if="JSON.stringify(order_info) !== '{}'" :order_info="order_info"></orderOperation>
	</div>
</template>

<script>
    import myNarBar from '../sub/my-nav-bar';
    import goodsList from './sub/my-see-order-goods-list';
    import orderInfo from './sub/my-see-order-info';
    import payInfo from './sub/my-see-order-pay-info';
    import logisticsInfo from './sub/my-see-order-logistics-info';
    import payOption from './sub/my-see-order-pay-option';
    import orderOperation from './sub/my-see-order-operation';

    export default {
        data() {
            return {
                order_sn: "",
                order_info: {}
            };
        },
        computed: {
            active: {
                get: function () {
                    let result = 0;
                    if (this.order_info.order_state >= 1 && this.order_info.order_state <= 4) {
                        result = this.order_info.order_state - 1;
                    }
                    return result;
                }
            }
        },
        created() {
            this.order_sn = this.$route.params.order_sn;
            this.getOrderInfo();
            this.getPayList();
        },
        methods: {
            getOrderInfo() {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '正在查询',
                    duration: 0
                });
                this.$fetch('user_get_one_order_info', {
                    user_token: this.$store.getters.getUserToken,
                    order_sn: this.order_sn
                })
                    .then((msg) => {
                        this.order_info = msg;
                        toast1.clear();
                    })
            },
            getPayList() {
                if (this.$store.state.pay_list.length < 1) {
                    this.$store.dispatch("getPayList", this.$store.state.login_type);
                }
            },
        },
        components: {
            myNarBar,//头部组件
            goodsList,//商品列表
            orderInfo,//订单详情
            payInfo,//费用详情
            logisticsInfo,//物流信息
            payOption,//支付选项
            orderOperation//订单操作
        },
    };
</script>

<style lang="scss" scoped>

</style>