<template>
	<div class="main">
		<van-card
						:desc="goods_info.sku_desc"
						:title="goods_info.goods_name"
						:thumb="goods_info.img_url ==null ? './img/goods-img-invalid.jpg' : goods_info.img_url "
		>
			<div slot="footer">
				<van-tag type="primary" v-if="goods_info.give_integral > 0">评价可得{{goods_info.give_integral}}{{this.$store.state.integral_name}}</van-tag>
				<van-button type="danger" size="small" round @click="goPutEvaluate">前往评价</van-button>
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
            console.log(this.goods_info);
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