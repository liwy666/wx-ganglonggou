<template>
	<div class="main">
		<p class="title">订单详情</p>
		<div class="order-info-body">
			<p>订单编号：{{this.order_info.order_sn}}</p>
			<p>订单状态：{{this.order_info.order_state_name}}</p>
			<p>支付方式：{{this.order_info.pay_name + this.order_info.bystages_val}}</p>
			<p>下单时间：{{this.order_info.order_time}}</p>
			<p v-if="order_info.pay_ok_tim != null">支付时间：{{this.order_info.pay_ok_time}}</p>
			<p>最后操作时间：{{this.order_info.order_time_new}}</p>
			<p v-if="this.order_info.order_admin_remarks2 !=null">商家提醒：{{this.order_info.order_admin_remarks2}}</p>
			<p>发票类型：{{this.order_info.invoice_type}}</p>
			<p v-if="order_info.invoice_head !== ''">发票抬头：{{this.order_info.invoice_head}}</p>
			<p v-if="order_info.invoice_phone !== ''">手机号：{{this.order_info.invoice_phone}}</p>
			<p v-if="order_info.invoice_nsrsbh !== ''">税号：{{this.order_info.invoice_nsrsbh}}</p>
			<p v-if="order_info.invoice_qymc !== ''">企业名称：{{this.order_info.invoice_qymc}}</p>
			<p v-if="order_info.invoice_kpdz !== ''">开票地址：{{this.order_info.invoice_kpdz}}</p>
			<p v-if="order_info.invoice_khh !== ''">开户行：{{this.order_info.invoice_khh}}</p>
			<p v-if="order_info.invoice_yhzh !== ''">银行账号：{{this.order_info.invoice_yhzh}}</p>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props:["order_info"],
        computed: {},
        created() {

        },
        methods: {},
    };
</script>

<style lang="scss" scoped>
	.main{
		margin-top: 20px;
		box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.1);
		.title{
			padding-left: 10px;
			font-size: 14px;
			color: #323233;
		}
		.order-info-body{
			background-color: white;
			margin-top: 10px;
			p{
				padding: 5px;
				padding-left: 20px;
				font-size: 12px;
				font-weight: bold;
				color: #7d7e80;
			}
		}
	}
</style>