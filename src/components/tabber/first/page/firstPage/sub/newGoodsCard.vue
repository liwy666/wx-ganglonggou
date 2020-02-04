<template>
	<div class="goods-card-type1">
		<div class="goods-img"><img :src="goods_info.ad_img" alt=""></div>
		<div class="goods-name">{{this.goods_name}}</div>
		<div class="new-goods-price">￥<span>{{this.goods_price}}</span></div>
		<div class="origin-goods-price">￥<span>{{this.origin_goods_price}}</span></div>
	</div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props: {
            goods_info: Object
        },
        computed: {
            goods_name: {
                get: function () {
                    let result = '';
                    if (this.goods_info) {
                        result = this.goods_info.goods_name.split('|');
                        result = result[0];
                    }
                    return result;
                }
            },
            goods_price: {
                get: function () {
                    let result = '';
                    if (this.goods_info) {
                        result = this.goods_info.goods_price;
                    }
                    return result;
                }
            },
            origin_goods_price: {
                get: function () {
                    let result = '';
                    if (this.goods_info) {
                        result = this.goods_info.origin_goods_price;
                    }
                    return result;
                }
            },
        },
        created() {

        },
        methods: {
        },
    };
</script>
<style lang="scss" scoped>
	.goods-card-type1 {
		background-color: white;
		height: 100%;
		width: 90%;
		overflow: hidden;
		padding: 10px 3px;
		box-sizing: border-box;
		border-radius: 5px;

		.goods-img {
			width: 90%;
			margin: 0 auto;
			padding-bottom: 90%;
			height: 0;
			overflow: hidden;

			img {
				width: 100%;
			}
		}

		.goods-name {
			border: 0px solid black;
			position: relative;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			flex-direction: column;
			align-content: flex-start;
			flex-shrink: 0;
			font-size: 11px;
			text-align: left;
			line-height: 12px;
			height: 23px;
			color: rgb(62, 62, 62);
			-webkit-line-clamp: 2;
			overflow: hidden;
		}

		.new-goods-price {
			padding-left: 5px;
			color: rgb(255, 68, 1);
			font-size: 10px;
			margin-top: 10px;

			span {
				font-size: 14px;
			}
		}

		.origin-goods-price {
			padding-left: 5px;
			color: rgb(200, 200, 200);
			font-size: 10px;
			text-decoration: line-through;

			span {
				font-size: 12px;
			}
		}
	}
</style>