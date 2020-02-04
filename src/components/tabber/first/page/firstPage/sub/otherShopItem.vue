<template>
	<div class="other-shop-item-main">
		<div class="img-box"><img :src="goods_info.ad_img" alt=""></div>
		<div class="name">{{this.goods_info.text}}</div>
		<div class="goods-tag">了解更多></div>
	</div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props: {
            goods_info: Object,
        },
        computed: {},
        created() {

        },
        methods: {},
    };
</script>
<style lang="scss" scoped>
	.other-shop-item-main {
		background-color: white;
		margin-left: 5px;
		padding: 5px;
		border-radius: 10px;
		height: 190px;
		background-image: url("https://mate.ganglonggou.com/lib/images/ketlle_goods_b1.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;

		.img-box {
			width: 90%;
			border-radius: 5px;
			margin: 0 auto;
			margin-top: 3%;
			padding-bottom: 100%;
			height: 0;
			overflow: hidden;

			img {
				width: 100%;
			}
		}

		.name {
			padding-left: 5px;
			padding-right: 5px;
			margin-top: 30px;
			width: 100%;
			border: 0px solid black;
			position: relative;
			box-sizing: border-box;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			flex-direction: column;
			align-content: flex-start;
			flex-shrink: 0;
			font-size: 10px;
			text-align: center;
			line-height: 20px;
			height: 20px;
			color: white;
			font-weight: bolder;
			-webkit-line-clamp: 2;
			letter-spacing: 1px;
			overflow: hidden;
		}

		.goods-price {
			color: rgb(249, 88, 3);
			margin-top: 10px;
			text-align: left;
			padding-left: 5px;

			span {
				font-size: 13px;
				font-weight: bolder;
			}
		}

		.goods-tag {
			padding-left: 5px;
			padding-right: 5px;
			margin-top: 5px;
			width: 100%;
			border: 0px solid black;
			position: relative;
			box-sizing: border-box;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			flex-direction: column;
			align-content: flex-start;
			flex-shrink: 0;
			font-size: 10px;
			text-align: center;
			line-height: 14px;
			height: 14px;
			color: white;
			-webkit-line-clamp: 1;
			letter-spacing: 1px;
			overflow: hidden;
		}

		.goods-tag2 {
			text-align: center;
			padding: 5px;
			height: 15px;
			color: rgb(242, 106, 106);
			line-height: 15px;
			font-size: 10px;
			font-weight: bolder;
		}
	}
</style>