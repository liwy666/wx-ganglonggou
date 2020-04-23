<template>
	<div class="main">
		<div class="recharge-head"><img src="../../../assets/evaluate-head.jpg" alt=""></div>
		<rechargeType></rechargeType>
		<rechargePayType v-if="this.pay_list.length >0" :pay_list="this.pay_list"></rechargePayType>
		<rechargePrice></rechargePrice>
		<div class="notice-bar">
			<p class="notice-bar-one" v-for="(item,i) in notice_bar_desc" :key="i">{{item}}</p>
		</div>
		<van-button size="large" type="danger" @click="pay">立即充值</van-button>
	</div>
</template>

<script>
    import rechargeType from './sub/my-recharge-type';
    import rechargePayType from './sub/my-recharge-pay-type';
    import rechargePrice from './sub/my-recharge-price';

    export default {
        data() {
            return {
                pay_list: [],
                balance_config: []
            };
        },
        computed: {
            notice_bar_desc: {
                get: function () {
                    let result = [];
                    if (this.balance_config.length > 0) {
                        this.balance_config.sort((this.compare('bystages_code')));
                        this.balance_config.forEach(item => {
                            if (item.bystages_code === 'wx_0_balance') {
                                result.push('全场余额充值满' + item.satisfy_price + '元，赠送' + item.give_recharge_price + '元')
                            } else if (item.bystages_code === 'wx_235_balance') {
                                result.push('文具类余额充值满' + item.satisfy_price + '元，赠送' + item.give_recharge_price + '元')
                            }
                        })
                    }
                    return result;
                }
            }
        },
        created() {
            this.getRechargeInfo();
        },
        methods: {
            getRechargeInfo() {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '获取充值信息',
                    duration: 0
                });
                this.$fetch('user_get_recharge_info', {login_type: this.$store.getters.getLoginType})
                    .then((msg) => {
                        this.$set(this, 'pay_list', msg.pay_list);
                        this.$set(this, 'balance_config', msg.balance_config);
                        toast1.clear();
                    })
            },
            compare(property) {
                return function (a, b) {
                    let value1 = a[property];
                    let value2 = b[property];
                    return value1.length - value2.length;
                }
            },
            pay() {
								if(this.pay_list.length >0){
                    let SuccessUrl = encodeURIComponent("https://" + window.location.host + "/#/home");
                    let BackUrl = encodeURIComponent(window.location.href);
                    window.location.href = this.$store.state.api_url + "/api/v1/payment/user_recharge?&success_url=" + SuccessUrl
                        + "&back_url=" + BackUrl
                        + "&pay_code=" + this.$store.state.recharge_info.pay_code
                        + "&bystages_id=" + this.$store.state.recharge_info.bystages_id
                        + "&recharge_price=" + this.$store.state.recharge_info.recharge_price
                        + "&recharge_type=" + this.$store.state.recharge_info.recharge_type
                        + "&user_token=" + this.$store.getters.getUserToken;
                }
            },
        },
        components: {
            rechargeType,//充值类型
            rechargePayType,//支付方式
            rechargePrice,//充值金额
        }
    };
</script>

<style lang="scss" scoped>
	.main {
		.recharge-head {
			width: 100%;
			height: 135px;
			background-color: #c1101c;
			img {
				width: 100%;
			}
		}
		
		.notice-bar {
			background-color: $main-color1;
			
			.notice-bar-one {
				padding: 5px;
				color: $main-color0;
				font-size: 14px;
			}
		}
	}

</style>