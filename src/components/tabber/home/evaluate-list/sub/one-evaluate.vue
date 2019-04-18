<template>
	<div class="main">
		<van-card
						:desc="goods_info.attr_desc"
						:title="goods_info.goods_name"
						:thumb="goods_info.goods_attribute_img ==null ? './img/goods-img-invalid.jpg' : goods_info.goods_attribute_img "
		>
			<div slot="footer">
				<van-button size="small" type="danger" plain round @click="goPutEvaluate">评价得优点</van-button>
			</div>
		</van-card>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props:["goods_info"],
        computed: {},
        created() {

        },
        methods: {
            goPutEvaluate(){
              this.$router.push({ path: '/putEvaluate', query:{goods_info:this.goods_info}})
            }
        },
    };
</script>

<style lang="scss" scoped>
	.van-card{
		background-color: white;
	}
</style>