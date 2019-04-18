<template>
	<div class="mian">
		<!--搜索框-->
		<mySearch></mySearch>
		<!--头部轮播图-->
		<van-swipe :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(item) in head_swipe" :key="item.index_id" @click="toControl(item)"><img
							:src="item.index_img" alt=""></van-swipe-item>
		</van-swipe>
		<!--商城申明-->
		<div class="declare-box">
			<div><img v-lazy="this.declare.index_img" alt=""></div>
		</div>
		<!--通告-->
		<div class="my-panel">
			<van-notice-bar
							text="热烈祝贺岗隆优选第三家线下实体店在江苏宜兴成立!"
							left-icon="volume-o"
							color="#cc0001"
			/>
		</div>
		<!--领券轮播-->
		<div class="my-panel">
			<swiper class="coupon_swiper" :options="coupon_swiper" ref="mySwiperLeft">
				<swiper-slide v-for="(item) in coupon_swipe" :key="item.index_id">
					<img :src="item.index_img" @click="toControl(item)">
				</swiper-slide>
			</swiper>
		</div>
		<!--分类-->
		<div class="my-panel">
			<div class="classify-box">
				<div class="classify" v-for="(item) in classify" :key="item.index_id" @click="toControl(item)"><img
								v-lazy="item.index_img" alt=""></div>
			</div>
		</div>
		<!--合作伙伴-->
		<van-panel title="合作伙伴" desc="在全球构建开放，合作，共赢的华为云生态，助力合作伙伴快速融入当地生态圈。">
			<div class="cooperation-box">
				<div class="cooperation" v-for="(item) in cooperation" :key="item.index_id" @click="toControl(item)"><img
								v-lazy="item.index_img" alt=""></div>
			</div>
		</van-panel>
		<!--通栏1-->
		<div class="banner" @click="toControl(banner)"><img v-lazy="this.banner.index_img" alt=""></div>
		<!--品牌入口-->
		<div class="my-panel">
			<div class="brand-box">
				<div class="brand" v-for="(item) in brand" :key="item.index_id" @click="toControl(item)"><img
								v-lazy="item.index_img" alt=""></div>
			</div>
		</div>
		<!--产品分类-->
		<div class="" v-for="(item) in goods_classify" :key="item.index_id">
			<div class="goods-classify-box">
				<div class="banner" @click="toControl(item)"><img v-lazy="item.index_img" alt=""></div>
				<div class="goods-box">
					<oneGoods v-for="(item2) in item.goods_list" :key="item2.goods_id" :goods_info_="item2"></oneGoods>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
    import mySearch from "./sub/my-sub-search.vue";//搜索组件
    import oneGoods from "../../sub/my-one-goods";//搜索组件
    export default {
        data() {
            return {
                msg: "",
                coupon_swiper: {
                    slidesPerView: 2.5,
                    spaceBetween: 10,
                },
                radio: "1"
            };
        },
        created() {
            this.getIndexAd();
        },
        activated() {
            /*获取Url参数信息*/
           let goods_id = this.GetQueryString('gl_goods_id');
           if(goods_id!= null && goods_id.length>1){
               if ((/(^[1-9]\d*$)/.test( parseInt(goods_id)))) {//验证正整数
									this.$router.push('/goods/' + goods_id);
               }
           }
          
        },
        computed: {
            /*头部轮播*/
            head_swipe: {
                get: function () {
                    var result = [];
                    if (this.msg !== "") {
                        this.msg.ad_list.forEach(item => {
                            if (item.position_type === "顶部广告轮播图") {
                                result.push(item);
                            }
                        });
                    }
                    return result;
                }
            },
            /*商城申明*/
            declare: {
                get: function () {
                    var result = "";
                    if (this.msg !== "") {
                        this.msg.ad_list.forEach(item => {
                            if (item.position_type === "商城申明") {
                                result = item;
                            }
                        });
                    }
                    return result;
                }
            }
            /*领券轮播*/
            , coupon_swipe: {
                get: function () {
                    var result = [];
                    if (this.msg !== "") {
                        this.msg.ad_list.forEach(item => {
                            if (item.position_type === "领券区域") {
                                result.push(item);
                            }
                        });
                    }
                    return result;
                }
            }
            /*分类入口*/
            , classify: {
                get: function () {
                    var result = [];
                    if (this.msg !== "") {
                        this.msg.ad_list.forEach(item => {
                            if (item.position_type === "分类入口") {
                                result.push(item);
                            }
                        });
                    }
                    return result;
                }
            }
            /*合作伙伴*/
            , cooperation: {
                get: function () {
                    var result = [];
                    if (this.msg !== "") {
                        this.msg.ad_list.forEach(item => {
                            if (item.position_type === "合作伙伴") {
                                result.push(item);
                            }
                        });
                    }
                    return result;
                }
            }
            /*通栏1*/
            , banner: {
                get: function () {
                    var result = "";
                    if (this.msg !== "") {
                        this.msg.ad_list.forEach(item => {
                            if (item.position_type === "通栏位置1") {
                                result = item;
                            }
                        });
                    }
                    return result;
                }
            }
            /*品牌*/
            , brand: {
                get: function () {
                    var result = [];
                    if (this.msg !== "") {
                        this.msg.ad_list.forEach(item => {
                            if (item.position_type === "品牌入口") {
                                result.push(item);
                            }
                        });
                    }
                    return result;
                }
            }
            /*分类详情列表*/
            , goods_classify: {
                get: function () {
                    var result = [];
                    if (this.msg !== "") {
                        this.msg.ad_list.forEach(item => {
                            if (item.position_type === "品牌分类上方通栏") {
                                result.push(item);
                            }
                        });
                        result.forEach((item, i) => {
                            result[i]["goods_list"] = [];
                            this.msg.goods_list.forEach(item2 => {
                                if (item.cat_name === item2.cat_name) {
                                    result[i]["goods_list"].push(item2);
                                }
                            })
                        })
                    }
                    return result;
                }
            }
        },
        components: {
            mySearch,//搜索组件
            oneGoods,//单个商品
        },
        methods: {
            getIndexAd() {
                this.$fetch("index_ad", {index_type: this.$store.getters.getLoginType}).then((msg) => {
                    this.msg = msg;
                    this.$set(this.$store.state, 'goods_list', msg.goods_list);//赋值商品列表
                })
            },
            toControl(ad_info) {
                if (ad_info.ad_type === "商品ID") {
                    if (ad_info.index_goods_id != null && ad_info.index_goods_id !== ''&& ad_info.index_goods_id !== 0) {
                        this.$router.push('goods/' + ad_info.index_goods_id)
                    }
                } else if (ad_info.ad_type === "分类ID") {
                    if (ad_info.index_cat_id != null && ad_info.index_cat_id !== '' && ad_info.index_cat_id !== 0) {
                        this.$router.push({
                            path: 'goodsList',
                            query: {type: 'cat', cat_id: ad_info.index_cat_id, keyword: ""}
                        })
                    }
                } else if (ad_info.ad_type === "优惠券ID") {
                    if (ad_info.index_coupon_id != null && ad_info.index_coupon_id !== '' && ad_info.index_coupon_id !== 0) {
                        let toast1 = this.$toast.loading({
                            mask: true,
                            message: '领取中...',
                            duration: 0
                        });
                        this.$post('user_get_coupon', {
                            coupon_id: ad_info.index_coupon_id,
                            user_token: this.$store.getters.getUserToken
                        })
                            .then((msg) => {
                                toast1.clear();
                                this.$toast(msg);
                            })
                    }
                } else if (ad_info.ad_type === "外部链接") {
                    if (ad_info.index_url != null && ad_info.index_url !== '') {
                        this.$router.push({
                            path: 'myIframe',
                            query: {src: ad_info.index_url}
                        })
                    }
                }else if (ad_info.ad_type === "内部文章") {
                    console.log(ad_info);
                    if (ad_info.index_article_id != null && ad_info.index_article_id !== ''&& ad_info.index_article_id !== 0) {
                        this.$router.push('article/' + ad_info.index_article_id)
                    }
                }
                else {
                    console.log(ad_info.ad_type);
                    return false;
                }
            },
            GetQueryString(name) {
                let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                let r = window.location.search.substr(1).match(reg);
                if(r!=null)return  unescape(r[2]); return null;
            }
        },
    };
</script>

<style lang="scss" scoped>
	.van-swipe {
		img {
			width: 100%;
		}
	}
	
	.declare-box {
		background-color: white;
		//height: 50px;
		//position: relative;
		//z-index: 99;
		//margin-top: -25px;
		//border-radius: 80%;
		img {
			width: 100%;
		}
	}
	
	.coupon_swiper {
		img {
			width: 100%;
		}
	}
	
	.van-panel {
		margin-top: 20px;
	}
	
	.my-panel {
		width: 95%;
		margin-left: 1.5%;
		background-color: white;
		border-radius: 5px;
		overflow: hidden;
		padding: 1%;
		margin-top: 5px;
	}
	
	.classify-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		
		.classify {
			width: 170px;
			
			img {
				width: 100%;
			}
		}
		
	}
	
	.cooperation-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		
		.cooperation {
			width: 70px;
			margin-left: 4px;
			
			img {
				width: 100%;
			}
		}
	}
	
	.banner {
		width: 100%;
		
		img {
			width: 100%;
		}
	}
	
	.brand-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		
		.brand {
			width: 110px;
			margin-left: 7px;
			
			img {
				width: 100%;
			}
		}
	}
	
	.goods-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		
		.goods {
			width: 45%;
			margin-left: 3.33%;
			background-color: white;
			margin-top: 8px;
			margin-bottom: 8px;
			border-radius: 5px;
			overflow: hidden;
			
			.goods-img {
				margin-top: 5px;
				width: 100%;
				
				img {
					width: 100%;
				}
			}
			
			.goods-name {
				white-space: pre-wrap;
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
			
			.goods-price {
				white-space: pre-wrap;
				border: 0px solid black;
				position: relative;
				box-sizing: border-box;
				display: block;
				-webkit-box-orient: vertical;
				flex-direction: column;
				align-content: flex-start;
				flex-shrink: 0;
				font-size: 12px;
				text-align: left;
				font-weight: 600;
				color: rgb(255, 0, 0);
				line-height: 30.912px;
				margin-left: 11.04px;
			}
			
			.goods-stages {
				background: url("../../../assets/goods-stages.jpg") no-repeat;
				background-size: 100% 100%;
				height: 40px;
				line-height: 40px;
				font-weight: bold;
				color: white;
				font-size: 10px;
				padding-left: 8px;
				
				i {
					font-style: normal;
					font-size: 24px;
				}
			}
		}
	}

</style>