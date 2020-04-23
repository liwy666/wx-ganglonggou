<template>
	<div class="mian">
		<p class="title">费用清单</p>
		<div class="order-list-body">
			<van-row>
				<van-col span="12"><p class="list-name">订单总金额：</p></van-col>
				<van-col span="12"><p class="list-price">￥{{this.goods_list_price}}</p></van-col>
			</van-row>
			<van-row>
				<van-col span="12"><p class="list-name">使用优惠券减免：</p></van-col>
				<van-col span="12"><p class="list-price">-￥{{this.coupon_price}}</p></van-col>
			</van-row>
			<van-row>
				<van-col span="12"><p class="list-name">使用积分减免：</p></van-col>
				<van-col span="12"><p class="list-price">-￥{{this.integral_price}}</p></van-col>
			</van-row>
			<van-row>
				<van-col span="12"><p class="list-name">支付方式减免：</p></van-col>
				<van-col span="12"><p class="list-price">-￥{{this.pay_price}}</p></van-col>
			</van-row>
			<van-row>
				<van-col span="12"><p class="list-name">结算金额：</p></van-col>
				<van-col span="12"><p class="list-price" style="color: red;font-weight: bold">￥{{this.order_price_}}</p>
				</van-col>
			</van-row>
		</div>
	
	</div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        computed: {
            goods_list_price: {
                get: function () {
                    return this.$store.getters.getCartsSelectedPrice
                }
            },
            coupon_price: {
                get: function () {
                    let reslut = 0;
                    if (this.$store.state.write_order_info.coupon_id !== -1) {
                        reslut = parseFloat(this.$store.state.write_order_info.coupon_info.cut_sum).toFixed(2);
                    }
                    return parseFloat(reslut).toFixed(2);
                }
            },
            integral_price: {
                get: function () {
                    return parseFloat(parseInt(this.$store.state.write_order_info.use_integral) / 100).toFixed(2);
                }
            },
            pay_price: {
                get: function () {
                    let bystages_fee = parseFloat(this.$store.state.write_order_info.pay_info.bystages_fee);
                    return ((parseFloat(this.goods_list_price) - (parseFloat(this.coupon_price) + parseFloat(this.integral_price))) - ((parseFloat(this.goods_list_price) - (parseFloat(this.coupon_price) + parseFloat(this.integral_price))) * bystages_fee)).toFixed(2)
                }
            },
            order_price_: {
                get: function () {
                    let val = parseFloat(parseFloat(this.goods_list_price) - (parseFloat(this.coupon_price) + parseFloat(this.integral_price) + parseFloat(this.pay_price))).toFixed(2);
                    this.$store.state.write_order_info.order_price = val;
                    return val;
                }
            },
        },
        width: {
            'order_price': function (newVal) {
                console.log(newVal);
            }
        },
        created() {

        },
        methods: {},
    };
</script>

<style lang="scss" scoped>
	.mian {
		margin-top: 20px;
		
		.title {
			padding-left: 10px;
			font-size: 14px;
			color: #323233;
		}
		
		.order-list-body {
			background-color: white;
			margin-top: 5px;
			
			p {
				font-size: 14px;
			}
			
			.list-price {
				padding-right: 50px;
				text-align: right;
			}
			
			.list-name {
				padding-left: 20px;
				text-align: left;
				font-weight: bold;
			}
		}
	}
</style>