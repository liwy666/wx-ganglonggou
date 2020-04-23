<template>
	<div class="one-order-box" @click="toSeeOrder(order_info.order_sn)">
			<p class="order-sn">订单号：{{this.order_info.order_sn}}</p>
			<p class="order-state">{{this.order_info.order_state_name}}</p>
		<van-card
						v-for="(item,i) in order_info.mid_order" :key="i"
						:num="item.goods_number"
						:price="item.mid_order_price"
						:desc="item.sku_desc"
						:title="item.goods_name"
						:thumb="item.img_url ==null ? './img/goods-img-invalid.jpg' : item.img_url"
		/>
		<p class="order-bottom"></p>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props:["order_info"],
        computed: {
        
        },
        created() {
        },
        methods: {
            toSeeOrder(order_sn){
                this.$router.push('/seeOrder/'+order_sn);
            }
        },
    };
</script>

<style lang="scss" scoped>
	.one-order-box{
		margin-top: 20px;
		background-color: white;
		width: 96%;
		margin-left: 2%;
		border-radius: 5px;
		overflow: hidden;
		box-shadow: 0px 0px 1px 0px rgba(0,0,0,.1);
		.order-sn{
			padding-left: 20px;
			height: 30px;
			line-height: 30px;
			font-size: 10px;
			color: rgb(100,100,100);
		/*	font-weight: bold;*/
		}
		.order-state{
			padding-left: 5px;
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			font-weight: bold;
			text-align: center;
			background-color: $main-color0;
			color: white;
		}
		.van-card{
			background-color: white;
		}
		.order-bottom{
			height: 30px;
			width: 100%;
			background-color: white;
		}
	}
</style>