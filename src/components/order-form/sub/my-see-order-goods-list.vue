<template>
	<div class="main">
		<p class="title">订单清单</p>
		<van-card
			v-for="(item,i) in goods_list" :key="i"
			:num="item.goods_number"
			:price="item.mid_order_price"
			:desc="item.sku_desc"
			:title="item.goods_name"
			:thumb="item.img_url ==null ? './img/goods-img-invalid.jpg' : item.img_url "
			@click="toGoods(item.goods_id)"
		/>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: ["goods_list"],
        computed: {},
        created() {

        },
        methods: {
            toGoods(goods_id) {
                this.$router.push('/goods/' + goods_id)
            }
        },
    };
</script>

<style lang="scss" scoped>
	.main {
		margin-top: 20px;

		p {
			padding-left: 10px;
			font-size: 14px;
			color: #323233;
		}
	}
</style>