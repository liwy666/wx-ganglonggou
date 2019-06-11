<template>
	<div class="main">
		<myNarBar title="商品详情"></myNarBar>
		<!--头部商品轮播-->
		<van-swipe :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(item,i) in head_imgPreview" :key="i" @click="imgPreview(head_imgPreview,i)">
				<img v-lazy="item"/>
			</van-swipe-item>
		</van-swipe>
		<!--价格-->
		<div class="goods-price"
			 v-if="parseInt(goods_info.promote_start_date * 1000) > parseInt( new Date().getTime()) || parseInt(goods_info.promote_end_date * 1000) < parseInt( new Date().getTime())||goods_info.is_promote===0">
			￥{{goods_info.goods_price}}
		</div>
		<!--秒杀倒计时-->
		<div class="promote-price-box"
			 v-if="parseInt(goods_info.promote_start_date * 1000) < parseInt( new Date().getTime()) && parseInt(goods_info.promote_end_date * 1000) > parseInt( new Date().getTime())&&goods_info.is_promote===1">
			<!--价格-->
			<div class="goods-price">
				<div class="shop_price">{{goods_info.goods_price}}<span>元</span></div>
			</div>
			<!--倒计时-->
			<countDown :end_time="goods_info.promote_end_date" title="距结束还剩:"></countDown>
		</div>
		<!--商品名称-->
		<div class="goods-name">
			<van-tag type="danger" v-if="goods_info.goods_head_name!==''&&goods_info.goods_head_name!==null" :color="$MyCommon.$main_color0">
				{{this.goods_info.goods_head_name}}
			</van-tag>
			{{msg.goods_name}}
		</div>
		<!--积分信息-->
		<div class="integral-box" v-if="goods_info.give_integral > 0&&load_extra_goods">
			<van-tag plain type="danger" :color="$MyCommon.$main_color0">{{this.$store.state.integral_name}}</van-tag>
			{{goods_info.integral_desc}}
		</div>
		<!--库存、销量信息-->
		<van-row>
			<van-col span="8">快递:免运费</van-col>
			<van-col span="8">库存:{{this.goods_info.goods_stock}}</van-col>
			<van-col span="8">销量:{{this.goods_info.goods_sales_volume}}</van-col>
		</van-row>
		<myPayInfo :pay_list="pay_list" v-if="pay_list.length >0"></myPayInfo>
		<!--领券选择-->
		<myCouponOption :coupon_list="coupon_list" v-if="coupon_list.length>0 &&load_extra_goods"></myCouponOption>
		<!--规格选择-->
		<van-cell title="已选" :value="goods_info.attr_desc + ',' +goods_info.goods_number +'件'" is-link
				  @click="show_sku = !show_sku" v-if="load_extra_goods"/>
		<!--服务选择-->
		<myServiceOption></myServiceOption>
		<!--商品详情and用户评价-->
		<van-tabs>
			<van-tab title="商品详情">
				<myGoodsInfo :goods_desc="goods_desc"></myGoodsInfo>
			</van-tab>
			<van-tab :title="'用户评价(' + this.evaluate_count+')'" v-if="this.load_extra_goods">
				<myEvaluateList :goods_id="goods_id" :evaluate_count="this.evaluate_count"></myEvaluateList>
			</van-tab>
		</van-tabs>
		<div class="d"></div>
		<!--商品导航栏-->
		<myGoodsAction @updShowSku="updShowSku" v-if="load_extra_goods"></myGoodsAction>
		<!--商品Sku展开栏-->
		<van-popup v-model="show_sku" position="bottom" overlay>
			<van-nav-bar
				title="商品规格"
				right-text="关闭"
				@click-right="show_sku = !show_sku"
			/>
			<myGoodsSku @updShowSku="updShowSku"></myGoodsSku>
		</van-popup>
	</div>
</template>

<script>
    import {ImagePreview} from 'vant';
    import myNarBar from '../sub/my-nav-bar';
    import myServiceOption from './sub/my-service-option'
    import myCouponOption from './sub/my-coupon-option'
    import myGoodsInfo from './sub/my-goods-info'
    import myEvaluateList from './sub/my-evaluate-list'
    import myGoodsSku from './sub/my-goods-sku'
    import myGoodsAction from './sub/my-goods-action'
    import myPayInfo from './sub/my-pay-info'
    import countDown from '../sub/my-count-down'
    import {commonShare} from "../../share";

    export default {
        data() {
            return {
                msg: "",
                goods_id: "",
                show_sku: false,
                load_extra_goods: false,
            };
        },
        computed: {
            /*商品详情*/
            goods_info: {
                get: function () {
                    if (this.msg !== "") {
                        return this.$store.getters.getGoodsInfo;
                    } else {
                        return {};
                    }
                }
            },
            /*预览图片*/
            head_imgPreview: {
                get: function () {
                    var result = [];
                    if (typeof (this.goods_info.goods_gallery) !== 'undefined') {
                        if (this.goods_info.goods_gallery.length > 0) {
                            this.goods_info.goods_gallery.forEach(item => {
                                result.push(item)
                            });
                        }
                    }
                    return result;
                }
            }
            /*商品销量*/
            , sales_volume: {
                get: function () {
                    let result = 0;
                    if (this.msg !== "") {
                        result = this.msg.goods_sales_volume
                    }
                    return result;
                }
            }
            /*商品销量*/
            , evaluate_count: {
                get: function () {
                    let result = 0;
                    if (this.msg !== "") {
                        result = this.msg.evaluate_count
                    }
                    return result;
                }
            }
            /*优惠券列表*/
            , coupon_list: {
                get: function () {
                    let result = [];
                    if (typeof (this.msg.coupon_list) !== "undefined") {
                        result = this.msg.coupon_list;
                    }
                    return result;
                }
            }
            /*商品详情图*/
            , goods_desc: {
                get: function () {
                    let reslut = [];
                    if (this.msg !== "" && this.msg.goods_desc !== "") {
                        var imgReg = /<img.*?(?:>|\/>)/gi;
                        //匹配src属性
                        var srcReg = /src=['"]?([^'"]*)['"]?/i;
                        var arr = this.msg.goods_desc.match(imgReg);
                        for (var i = 0; i < arr.length; i++) {
                            var src = arr[i].match(srcReg);
                            //获取图片地址
                            if (src[1]) {
                                reslut.push(src[1])
                            }
                        }
                    }
                    return reslut;
                }


            }
            , pay_list: {
                get:function () {
                    return this.$store.state.pay_list;
                }
			}
        },
        created() {
            this.goods_id = this.$route.params.goods_id;

            if(this.$store.state.pay_list.length <1){
                this.$store.dispatch('getPayList',this.$store.getters.getUserToken)
			}

            if (typeof (this.$route.query.goods_info) != 'undefined') {
                this.msg = JSON.parse(this.$route.query.goods_info);
                //初始化商品信息
                this.$store.commit("initGoodsInfo", this.msg);
                //初始化商品sku
                this.$store.commit("initGoodsSkuOptions", this.msg);
                //获取额外商品信息
                this.getExtraGoodsInfo();
            } else {
                this.getGoodsInfo();
            }

        },
        components: {
            myNarBar,//头部组件
            myServiceOption,//服务选择组件
            myCouponOption,//优惠券选择组件
            myGoodsInfo,//商品详情
            myEvaluateList,//商品评价
            myGoodsSku,//商品规格选择
            myGoodsAction,//商品导航栏
            myPayInfo,//支付列表
            countDown,//倒计时组件
        },
        methods: {
            getGoodsInfo() {
                //先判断有米有商品列表
                if (this.$store.state.goods_list.length < 1) {
                    this.$toast.loading({
                        mask: true,
                        message: '马上就来...',
                        duration: 0
                    });
                    this.$fetch('get_goods_info', {goods_id: this.goods_id})
                        .then((msg) => {
                            this.msg = msg;
                            //初始化商品信息
                            this.$store.commit("initGoodsInfo", this.msg);
                            //初始化商品sku
                            this.$store.commit("initGoodsSkuOptions", this.msg);
                            this.$toast.clear();
                            //获取额外商品信息
                            this.getExtraGoodsInfo();
                        })
                } else {
                    //就去商品列表里面找这个商品
                    this.$store.state.goods_list.some(item => {
                        if (item.goods_id === parseInt(this.goods_id)) {
                            this.msg = item;
                            //初始化商品信息
                            this.$store.commit("initGoodsInfo", this.msg);
                            //初始化商品sku
                            this.$store.commit("initGoodsSkuOptions", this.msg);
                            //获取额外商品信息
                            this.getExtraGoodsInfo();
                            return true;
                        }
                    })
                }
            }
            /*获取额外商品信息*/
            , getExtraGoodsInfo() {
                this.$fetch('get_extra_goods_info', {
                    goods_id: this.goods_id,
                    into_type: this.$store.state.into_type
                })
                    .then((msg) => {
                        msg.goods_gallery.forEach(item => {
                            this.$store.state.goods_info.goods_gallery.push(item.img_url);
                        });
                        this.$set(this.$store.state.goods_info, 'goods_sku_list', msg.goods_sku);
                        this.$set(this.msg, 'coupon_list', msg.coupon_list);
                        this.$store.dispatch("updGoodsInfo");
                        //let share_url = (this.$store.state.location_url + "?gl_goods_id="+this.goods_id);
                        //commonShare(this, this.goods_info.goods_name,share_url,this.$store.state.goods_info.goods_attribute_img, '江苏岗隆数码-您身边的数码产品服务商');
                        this.load_extra_goods = true;
                    })
            }
            , imgPreview(img_url, i) {
                ImagePreview({
                    images: img_url,
                    lazyLoad: true,
                    startPosition: i
                });
            }
            , updShowSku(flag) {
                this.show_sku = flag;
            }
            /*获取支付方式列表*/
            , getPayList() {

            }
        },
    };
</script>

<style lang="scss">
	.van-swipe {
		background-color: white;

		img {
			width: 100%;
		}
	}

	.goods-price {
		color: #FF0036;
		height: 36px;
		line-height: 36px;
		background-color: white;
		font-size: 18px;
		padding-left: 15px;
	}

	.promote-price-box {
		display: flex;

		.goods-price {
			width: 90%;
			background-image: linear-gradient(45deg, $main-color0, $main-color5);
			height: 50px;

			.shop_price {
				color: white;
				line-height: 50px;
				font-size: 26px;
				font-weight: bold;
				padding-left: 10px;

				span {
					font-size: 12px;
				}
			}
		}
	}

	.goods-name {
		padding-top: 5px;
		background-color: white;
		font-size: 14px;
		color: #051B28;
		line-height: 20px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		max-height: 63px;
		-webkit-box-orient: vertical;
		-webkit-box-pack: center;
		overflow: hidden;
		word-break: break-all;
		padding-left: 10px;
		padding-right: 10px;
	}

	.van-row {
		background-color: white;

		.van-col {
			text-align: center;
			height: 30px;
			line-height: 30px;
			color: #7d7e80;
			font-size: 12px;
		}
	}

	.integral-box {
		background-color: white;
		height: 30px;
		padding: 10px;
		color: $main-color0;
	}

	.d {
		width: 100%;
		height: 50px;
	}

	.van-goods-action {
		z-index: 3;
	}
</style>