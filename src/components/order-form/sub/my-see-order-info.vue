<template>
	<div class="main">
		<div class="order-list-body">
			<p class="title"><van-icon name="bars"  :color="$MyCommon.$main_color0"/><span>订单详情</span></p>
			<van-row>
				<van-col span="12"><p class="list-name">订单编号：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.order_info.order_sn}}</p></van-col>
			</van-row>
			<van-row>
				<van-col span="12"><p class="list-name">订单状态：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.order_info.order_state_name}}</p></van-col>
			</van-row>
			<van-row>
				<van-col span="12"><p class="list-name">支付方式：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.order_info.pay_name + this.order_info.bystages_val}}</p>
				</van-col>
			</van-row>
			<van-row>
				<van-col span="12"><p class="list-name">下单时间：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.order_info.create_time}}</p></van-col>
			</van-row>
			<van-row v-if="order_info.pay_time != null">
				<van-col span="12"><p class="list-name">支付时间：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.order_info.pay_time}}</p></van-col>
			</van-row>
			<van-row>
				<van-col span="12"><p class="list-name">最后操作时间：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.order_info.upd_time}}</p></van-col>
			</van-row>
			<van-row v-if="this.order_info.order_visible_note !=null">
				<van-col span="6"><p class="list-name">商家提醒：</p></van-col>
				<van-col span="18"><p class="list-price">{{this.order_info.order_visible_note}}</p></van-col>
			</van-row>
			<van-row>
				<van-col span="12"><p class="list-name">发票类型：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.order_info.invoice.invoice_type}}</p></van-col>
			</van-row>
			<van-row v-if="order_info.invoice.invoice_head != null">
				<van-col span="12"><p class="list-name">发票抬头：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.order_info.invoice.invoice_head}}</p></van-col>
			</van-row>
			<van-row v-if="order_info.invoice.invoice_phone != null">
				<van-col span="12"><p class="list-name">手机号：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.order_info.invoice.invoice_phone}}</p></van-col>
			</van-row>
			<van-row v-if="order_info.invoice.invoice_nsrsbh != null">
				<van-col span="12"><p class="list-name">税号：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.order_info.invoice.invoice_nsrsbh}}</p></van-col>
			</van-row>
			<van-row v-if="order_info.invoice.invoice_qymc != null">
				<van-col span="12"><p class="list-name">企业名称：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.order_info.invoice.invoice_qymc}}</p></van-col>
			</van-row>
			<van-row v-if="order_info.invoice.invoice_kpdz != null">
				<van-col span="12"><p class="list-name">开票地址：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.order_info.invoice.invoice_kpdz}}</p></van-col>
			</van-row>
			<van-row v-if="order_info.invoice.invoice_khh != null">
				<van-col span="12"><p class="list-name">开户行：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.order_info.invoice.invoice_khh}}</p></van-col>
			</van-row>
			<van-row v-if="order_info.invoice.invoice_yhzh != null">
				<van-col span="12"><p class="list-name">银行账号：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.order_info.invoice.invoice_yhzh}}</p></van-col>
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
        computed: {},
        created() {

        },
        methods: {},
    };
</script>

<style lang="scss" scoped>
	.main {
		margin-top: 20px;
		.order-list-body {
			margin-top: 10px;
			background-color: white;
			padding-top: 20px;
			padding-bottom: 20px;
			.title {
				padding-left: 10px;
				font-size: 14px;
				height: 18px;
				line-height: 18px;
				margin-bottom: 10px;
				span{
					margin-left: 5px;
					color: rgb(50,50,50);
					font-weight: bolder;
				}
			}

			p {
				font-size: 14px;
			}

			.list-price {
				padding-right: 50px;
				text-align: right;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.list-name {
				padding-left: 20px;
				text-align: left;
			}
		}
	}
</style>