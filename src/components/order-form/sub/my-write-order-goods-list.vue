<template>
	<div class="main">
		<p class="title">商品列表</p>
		<van-card
			v-for="(item,i) in goods_list" :key="i"
			:num="item.goods_number"
			:price="item.goods_price"
			:desc="item.attr_desc"
			:title="item.goods_name"
			:thumb="item.goods_attribute_img"
		/>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        computed:{
            goods_list:{
                get:function () {
                   return this.$store.getters.getCartsSelected;
                }
            }
        },
        created() {

        },
        methods: {

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