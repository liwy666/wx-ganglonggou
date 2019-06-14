<template>
	<div class="main">
		<van-goods-action>
			<van-goods-action-icon
				icon="chat-o"
				:to="{path:'/myIframe',query:{src:'https://p.qiao.baidu.com/cps2/mobileChat?siteId=11040705&userId=24298402&type=1&reqParam=&appId=&referer='}}"
				text="在线客服"
			/>
			<van-goods-action-icon
				icon="phone-o"
				url="tel:400-828-2323"
				text="电话客服"
			/>
			<van-goods-action-icon
				:info="this.$store.getters.getCartsGoodsNumberCount"
				icon="cart-o"
				to="/cart"
				text="购物车"
			/>
			<van-goods-action-button
				type="warning"
				text="加入购物车"
				@click="showSku"
			/>
			<van-goods-action-button
				primary
				type="danger"
				text="立即购买"
				@click="showSku"
			/>
		</van-goods-action>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        created() {

        },
        methods: {
            showSku(){
                this.$emit('updShowSku',true)
						}
				},
    };
</script>

<style lang="scss" scoped>
		.van-icon{
			font-size: 20px;
		}
</style>