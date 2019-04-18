<template>
	<div class="main">
		<p class="title">订单详情</p>
		<div class="order-info-body">
			<p>快递类型：{{this.logistics.logistics_name}}</p>
			<p>快递单号：{{this.logistics.logistics_sn}}</p>
			<p>发货时间：{{this.logistics.delivery_time}}</p>
			<p v-if="this.logistics.take_time !=null">签收时间：{{this.logistics.take_time}}</p>
			<p v-if="this.logistics.logistics_remarks !=null">物流备注：{{this.logistics.logistics_remarks}}</p>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props:["logistics"],
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