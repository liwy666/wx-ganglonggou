<template>
	<div class="main">
		<div class="goods-sku-box">
			<div class="goods-sku-top">
				<div class="goods-attribute-img"><img @click="oneImgPreview(goods_info.goods_attribute_img)"
				                                      :src="goods_info.goods_attribute_img" alt=""></div>
				<div class="goods_price_sn">
					<p class="goods_price"><span>￥</span>{{this.goods_info.goods_price}}
					<p/>
					<p class="goods_sn">商品编号：{{this.goods_info.goods_sn}}
					<p class="goods_sn">库存：{{this.goods_info.goods_stock}}
					<p/>
				</div>
			</div>
			<div class="goods-sku-body">
				<div class="goods-sku-row" v-for="(item,i) in goods_sku" :key="i">
					<p class="goods-sku-row-title">{{item.attribute_name}}</p>
					<div class="goods-sku-row-item-box">
						<span :class="['goods-sku-row-item',item2.xz_flag ? 'xz':'']"
							  v-for="(item2,i2) in item.attribute_value"
							  :key="i2" @click="replAttr(i,i2)">{{item2.name}}</span>
					</div>
				</div>
			</div>
			<div class="goods-number">
				<van-row>
					<van-col span="12">数量</van-col>
					<van-col span="12">
						<van-stepper v-model="goods_number" integer :max="goods_info.goods_stock" @change="updGoodsNumber"/>
					</van-col>
				</van-row>
			</div>
			<div class="button-box" v-show="goods_info.goods_stock > 0">
				<van-button block type="warning" @click="addCart(goods_info)">加入购物车</van-button>
				<van-button block type="danger" @click="nowPay(goods_info)">立即购买</van-button>
			</div>
			<div class="button-box">
				<van-button block type="danger" disabled v-show="goods_info.goods_stock === 0">已售罄</van-button>
			</div>
		</div>
	</div>
</template>

<script>
    import {ImagePreview} from 'vant';

    export default {
        data() {
            return {
                goods_number: 1
            };
        },
        computed: {
            goods_sku: {
                get: function () {
                    return this.$store.getters.getGoodsSku
                }
            },
            goods_info: {
                get: function () {
                    return this.$store.getters.getGoodsInfo

                }
            }
        },
        created() {

        },
        methods: {
            replAttr(key1, key2) {
                let key = {key1: key1, key2: key2};
                this.$store.commit("updGoodsSkuAttr", key);
            },
            updGoodsNumber(number) {
                this.$store.commit("updGoodsSkuNumber", number);
            }
            , oneImgPreview(img_url) {
                ImagePreview({
                    images: [img_url],
                    lazyLoad: true,
                });
            }
            , addCart(goods_info) {
                this.$store.commit('addCart', goods_info);
                this.showSku();
            }
            , nowPay(goods_info) {
                //     清空已选中列表
                this.$set(this.$store.state, 'carts_selected', []);
                //    把选中开关全部关闭
                this.$store.state.carts.forEach(item => {
                    item.selected = false;
                });
                //    添加当前商品到购物车
                this.$store.commit('addCart', goods_info);
                //更新购物车数量
                this.$store.commit("updCartNumber", goods_info);
                //打开此件商品开关
                this.$store.commit("openCartSelected", goods_info);
                //    跳转提交页面
                this.$router.push('/writeOrder');
            }
            , showSku() {
                this.$emit('updShowSku', false);
            }
            
        },
    };
</script>

<style lang="scss" scoped>
	.goods-sku-box {
		.goods-sku-top {
			width: 96%;
			margin-left: 2%;
			display: flex;
			align-items: flex-end;
			
			.goods-attribute-img {
				flex: 1;
				
				img {
					width: 100%;
				}
			}
			
			.goods_price_sn {
				margin-left: 30px;
				margin-bottom: 10px;
				flex: 2;
				
				.goods_price {
					color: red;
					font-size: 24px;
					font-weight: bold;
					
					span {
						font-size: 16px;
					}
				}
				
				.goods_sn {
					font-size: 10px;
				}
			}
		}
		
		.goods-sku-body {
			width: 96%;
			margin-left: 2%;
			height: 300px;
			overflow-y: auto;
			
			.goods-sku-row-title {
				font-size: 14px;
				margin-top: 20px;
			}
			
			.goods-sku-row-item-box {
				display: flex;
				flex-wrap: wrap;
				margin-bottom: 20px;
				
				.goods-sku-row-item {
					height: 28px;
					line-height: 28px;
					font-size: 14px;
					margin-top: 5px;
					border-radius: 50px;
					margin-left: 20px;
					justify-content: flex-start;
					background-color: rgba(0, 0, 0, .1);
					padding-left: 20px;
					padding-right: 20px;
					box-sizing: border-box;
					border: 1PX solid rgba(0, 0, 0, 0);
					transition: all ease 0.3s;
				}
				
				.xz {
					border: 1PX solid $main-color0;
					background-color: $main-color1;
					color: $main-color0;
				}
			}
			
		}
		
		.goods-number {
			margin-bottom: 20px;
		}
		
		.button-box {
			display: flex;
		}
	}
</style>