<template>
	<div class="main">
		<div class="d"></div>
		<div class="order-operation-body">
			<van-button round v-if="order_info.order_state === 1" type="default" @click="callOrder">取消订单</van-button>
			<van-button round v-if="order_info.order_state === 0" type="default" @click="delOrder">删除订单</van-button>
			<van-button round v-if="order_info.order_state === 1" type="danger" @click="goPay">立即支付</van-button>
			<van-button round v-if="order_info.order_state === 3" type="default" @click="takeOrder">确认收货</van-button>
<!--			<van-button round v-if="order_info.order_state === 4 && order_info.evaluate_is === 0" type="default">前去评价</van-button>-->
			<van-button round v-if="order_info.order_state === 5" type="default" @click="callService">取消申请</van-button>
			<van-button round v-if="order_info.order_state === 4 ||order_info.order_state === 2" type="default"
      @click="$router.push('/afterSale/'+order_info.order_sn)">申请售后
			</van-button>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: ["order_info"],
        computed: {},
        created() {

        },
        methods: {
            /*立即支付*/
            goPay() {
                let success_url = encodeURIComponent("https://" + window.location.host + "/#/home");
                let back_url = encodeURIComponent(window.location.href);
                window.location.href = this.$store.state.api_url + "/api/v1/payment/user_order_payment?success_url=" + success_url
                    + "&back_url=" + back_url
                    + "&order_sn=" + this.order_info.order_sn
                    + "&user_token=" + this.$store.getters.getUserToken;
            },
            /*取消售后*/
            callService() {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '正在为您取消售后申请',
                    duration: 0
                });
                this.$post('usercallservice', {
                    user_token: this.$store.getters.getUserToken,
                    order_sn: this.order_info.order_sn
                })
                    .then((msg) => {
                        toast1.clear();
                        if (msg) {
                            this.$router.push('/home');
                        } else {
                            this.$toast('取消售后申请失败')
                        }

                    })
            },
            /*取消订单*/
            callOrder() {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '正在为您取消订单',
                    duration: 0
                });
                this.$post('usercallorder', {
                    user_token: this.$store.getters.getUserToken,
                    order_sn: this.order_info.order_sn
                })
                    .then((msg) => {
                        toast1.clear();
                        if (msg) {
                            this.$router.push('/home');
                        } else {
                            this.$toast('取消订单失败')
                        }

                    })
            },
            /*删除订单*/
            delOrder(){
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '正在为您删除订单',
                    duration: 0
                });
                this.$post('userdelorder', {
                    user_token: this.$store.getters.getUserToken,
                    order_sn: this.order_info.order_sn
                })
                    .then((msg) => {
                        toast1.clear();
                        if (msg) {
                            this.$router.push('/home');
                        } else {
                            this.$toast('删除订单失败')
                        }

                    })
            },
            /*签收订单*/
            takeOrder(){
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '正在为您签收订单',
                    duration: 0
                });
                this.$post('usertakeorder', {
                    user_token: this.$store.getters.getUserToken,
                    order_sn: this.order_info.order_sn
                })
                    .then((msg) => {
                        toast1.clear();
                        if (msg) {
                            this.$router.push('/home');
                        } else {
                            this.$toast('签收订单失败')
                        }

                    })
            }
        },
    };
</script>

<style lang="scss" scoped>
	.main {
		.d {
			margin-top: 20px;
			width: 100%;
			height: 50px;
		}
		
		.order-operation-body {
			width: 100%;
			height: 50px;
			position: fixed;
			bottom: 0;
			background-color: white;
			box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.1);
			display: flex;
			justify-content: flex-end;
			align-items: center;
			
			button {
				display: block;
				height: 80%;
				margin-left: 5px;
			}
		}
	}
</style>