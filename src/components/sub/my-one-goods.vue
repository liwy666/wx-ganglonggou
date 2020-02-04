<template>
	<div class="goods-card"
		@click="$router.push({ path: 'goods/'+goods_info.goods_id})">
		<!--<div class="goods" @click="showTxt">-->
		<div class="goods-img"><img v-lazy="goods_info.goods_img"></div>
		<div class="goods-name">
			<van-tag type="danger" v-if="goods_info.goods_head_name!==''&&goods_info.goods_head_name!==null"
				:color="$MyCommon.$main_color0">
				{{this.goods_info.goods_head_name}}
			</van-tag>
			{{goods_info.goods_name}}
		</div>
		<div class="supplier-name-box">
			<van-icon name="shop-collect-o"/>
			{{goods_info.supplier_name}}
		</div>
		<!--关键词-->
		<div class="goods-price-box">
			<div class="goods-price">￥<i>{{goods_info.shop_price}}</i></div>
<!--			<div class="origin-goods-price">￥{{goods_info.market_price}}</div>-->
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props: ["goods_info_"],
        computed: {
            goods_info: {
                get: function () {
                    let result = {};
                    result.goods_id = this.goods_info_.goods_id;
                    result.goods_name = this.goods_info_.goods_name;
                    result.supplier_name = this.goods_info_.supplier_name;
                    result.goods_head_name = this.goods_info_.goods_head_name;
                    result.goods_img = this.goods_info_.goods_img;
                    result.shop_price = this.goods_info_.shop_price;
                    result.market_price = this.goods_info_.market_price;
                    result.keywords = this.goods_info_.keywords;
                    result.goods_stages = (this.goods_info_.shop_price / 24).toFixed(2);
                    return result;
                }
            }
            /*商品关键词*/
            , goods_tag: {
                get: function () {
                    let result = [];
                    if (this.goods_info.keywords !== '') {
                        result = this.goods_info.keywords.split('|');
                    }
                    return result
                }
            }
        },
        created() {

        },
        methods: {
            showTxt() {
                this.$dialog.alert({
                    message: '系统维护中'
                }).then(() => {
                    // on close
                })
            }
        },
    };
</script>
<style lang="scss" scoped>
	.goods-card {
		width: 45%;
		margin-left: 3.33%;
		box-sizing: border-box;
		background-color: white;
		margin-top: 8px;
		margin-bottom: 8px;
		border-radius: 5px;
		padding: 10px 5px;
		.goods-img {
			margin-top: 5px;
			width: 100%;

			img {
				width: 100%;
			}
		}

		.goods-name {
			//white-space: pre-wrap;
			border: 0px solid black;
			position: relative;
			box-sizing: border-box;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			flex-direction: column;
			align-content: flex-start;
			flex-shrink: 0;
			font-size: 12px;
			text-align: left;
			line-height: 19.872px;
			height: 39.744px;
			margin-top: 2.208px;
			margin-bottom: 2.208px;
			color: rgb(62, 62, 62);
			-webkit-line-clamp: 2;
			overflow: hidden;
		}

		.goods-tag-box {
			.van-tag {
				margin-left: 5px;
			}
		}

		.supplier-name-box {
			padding-left: 10px;
			height: 25px;
			font-size: 12px;
			line-height: 25px;
			color: #7d7e80;

			.van-icon {
				height: 25px !important;
				font-size: 12px !important;
				line-height: 28px !important;
			}
		}

		.goods-price-box {
			display: flex;
			align-items: flex-end;
			margin-top: 10px;
			.origin-goods-price {
				white-space: pre-wrap;
				border: 0 solid black;
				position: relative;
				box-sizing: border-box;
				display: block;
				-webkit-box-orient: vertical;
				flex-direction: column;
				align-content: flex-start;
				flex-shrink: 0;
				font-size: 12px;
				text-align: left;
				color: #7d7e80;
				margin-left: 10px;
				text-decoration: line-through
			}

			.goods-price {
				background-size: 100% 100%;
				font-weight: bold;
				color: red;
				font-size: 10px;
				padding-left: 8px;

				i {
					font-style: normal;
					font-size: 16px;
				}
			}
		}

	}
</style>