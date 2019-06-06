<template>
	<div class="main">
		<div class="order-list-body">
			<p class="title">
				<van-icon name="bars" :color="$MyCommon.$main_color0"/>
				<span>费用详情</span>
			</p>
			<van-row>
				<van-col span="12"><p class="list-name">订单总金额：</p></van-col>
				<van-col span="12"><p class="list-price">￥{{this.order_info.original_order_price == null ?
					this.order_info.order_price : this.order_info.original_order_price}}</p></van-col>
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
				<van-col span="12"><p class="list-price" style="color: red;font-weight: bold">
					￥{{this.order_info.order_price}}</p>
				</van-col>
			</van-row>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: ["order_info"],
        computed: {
            coupon_price: {
                get: function () {
                    return parseFloat(this.order_info.original_order_price - this.order_info.after_using_coupon_price).toFixed(2);
                }
            },
            integral_price: {
                get: function () {
                    return parseFloat(this.order_info.after_using_coupon_price - this.order_info.after_using_integral_price).toFixed(2);
                }
            },
            pay_price: {
                get: function () {
                    return parseFloat(this.order_info.after_using_integral_price - this.order_info.after_using_pay_price).toFixed(2);
                }
            },
        },
        created() {

        },
        methods: {},
    };
</script>

<style lang="scss" scoped>
	.main {
		.order-list-body {
			background-color: white;
			padding-top: 20px;
			padding-bottom: 60px;
			.title {
				padding-left: 10px;
				font-size: 14px;
				height: 18px;
				line-height: 18px;
				margin-bottom: 10px;
				span {
					margin-left: 5px;
					color: rgb(50, 50, 50);
					font-weight: bolder;
				}
			}

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
			}
		}
	}
</style>