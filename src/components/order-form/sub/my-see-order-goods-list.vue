<template>
	<div class="main">
		<p class="title">商品列表</p>
		<van-card
						v-for="(item,i) in goods_list" :key="i"
						:num="item.goods_number"
						:price="item.goods_price"
						:desc="item.attr_desc"
						:title="item.goods_name"
						:thumb="item.goods_attribute_img ==null ? './img/goods-img-invalid.jpg' : item.goods_attribute_img "
						@click="toGoods(item.goods_id)"
		/>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props:["goods_list"],
        computed: {},
        created() {

        },
        methods: {
            toGoods(goods_id){
                this.$router.push('/goods/'+goods_id)
            }
        },
    };
</script>

<style lang="scss" scoped>
	.main{
		margin-top: 20px;
		p{
			padding-left: 10px;
			font-size: 14px;
			color: #323233;
		}
	}
</style>