<template>
	<div class="main">
		<!--搜索框-->
		<mySearch></mySearch>
		<!--头部轮播图-->
		<div class="my-van-swipe-box">
			<van-swipe :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="(item, index) in index_ad_list.swipe_img" :key="index">
					<img :src="item.ad_img" @click="toControl(item)"/>
				</van-swipe-item>
			</van-swipe>
		</div>
		<!--公告-->
		<van-notice-bar
			:text="index_ad_list.notice_text.text"
			:color="$MyCommon.$main_color4"
			:speed="200"
			:background="$MyCommon.$main_color1"
			left-icon="volume-o"
		/>
		<div class="banner-box">
			<img :src="index_ad_list.coupon.ad_img" alt="" @click="toControl(index_ad_list.coupon)">
		</div>
		<!--4件商品区-->
		<div class="four-goods-box" v-for="(item) in index_ad_list.four_goods" :key="item.id">
			<div class="banner-box">
				<img :src="item.banner.ad_img" alt="" @click="toControl(item.banner)">
			</div>
			<div class="four-goods-base">
				<div v-for="(item2 ,i2) in item.goods" :key="i2"><img :src="item2.ad_img" alt=""
					@click="toControl(item2)"></div>
			</div>
		</div>
		<!--8件商品区-->
		<div class="eight-goods-box" v-for="(item) in index_ad_list.eight_goods" :key="item.id">
			<div class="banner-box">
				<img :src="item.banner.ad_img" alt="" @click="toControl(item.banner)">
			</div>
			<div class="eight-goods-base">
				<div v-for="(item2 ,i2) in item.goods" :key="i2"><img :src="item2.ad_img" alt=""
					@click="toControl(item2)"></div>
			</div>
		</div>
		<!--6件商品区-->
		<div class="six-goods-box" v-for="(item) in index_ad_list.six_goods" :key="item.id">
			<div class="banner-box">
				<img :src="item.banner.ad_img" alt="" @click="toControl(item.banner)">
			</div>
			<div class="six-goods-base">
				<div v-for="(item2 ,i2) in item.goods" :key="i2"><img :src="item2.ad_img" alt=""
					@click="toControl(item2)"></div>
			</div>
		</div>
		<!--压屏广告-->
		<md-landscape v-model="showPic">
			<img :src="index_ad_list.pop_img_url">
		</md-landscape>
	</div>
</template>
<script>
    import mySearch from "./sub/my-sub-search.vue";//搜索组件
    import oneGoods from "../../sub/my-one-goods";//搜索组件
    export default {
        data() {
            return {
                get_info: {},
                coupon_swiper: {
                    slidesPerView: 2.5,
                    spaceBetween: 10,
                },
                radio: "1",
                cat_index: 0,
                showPic: false,
                swipe_img: [],
                notice_text: '',
            };
        },
        created() {
            this.getIndexAd();
        },
        activated() {
            /*获取Url参数信息*/
            let goods_id = this.GetQueryString('gl_goods_id');
            if (goods_id != null && goods_id.length > 1) {
                if ((/(^[1-9]\d*$)/.test(parseInt(goods_id)))) {//验证正整数
                    this.$router.push('/goods/' + goods_id);
                }
            }
        },
        computed: {
            index_ad_list: {
                get: function () {
                    let result = {
                        swipe_img: [],
                        notice_text: {},
                        pop_img_url: '',
                        coupon: {},
                        four_goods_banner: [],
                        four_goods_base: [],
                        four_goods: [],
                        eight_goods_banner: [],
                        eight_goods_base: [],
                        eight_goods: [],
                        six_goods_banner: [],
                        six_goods_base: [],
                        six_goods: [],
                    };
                    if (JSON.stringify(this.get_info) !== '{}') {
                        this.get_info.ad_list.forEach(item => {
                            if (item.position_type === '顶部轮播') {
                                result.swipe_img.push(item);
                            } else if (item.position_type === '压屏广告') {
                                result.pop_img_url = item.ad_img;
                            } else if (item.position_type === '公告') {
                                result.notice_text = item;
                            } else if (item.position_type === '优惠券区域') {
                                result.coupon = item;
                            } else if (item.position_type === '4件商品通栏') {
                                result.four_goods_banner.push(item);
                            } else if (item.position_type === '4件商品内容') {
                                result.four_goods_base.push(item);
                            } else if (item.position_type === '8件商品通栏') {
                                result.eight_goods_banner.push(item);
                            } else if (item.position_type === '8件商品内容') {
                                result.eight_goods_base.push(item);
                            } else if (item.position_type === '6件商品通栏') {
                                result.six_goods_banner.push(item);
                            } else if (item.position_type === '6件商品内容') {
                                result.six_goods_base.push(item);
                            }
                        });
                        result.four_goods_banner.forEach(item => {
                            let goods = [];
                            result.four_goods_base.forEach(item2 => {
                                if (item.position_type_name === item2.position_type_name) {
                                    goods.push(item2);
                                }
                            });
                            result.four_goods.push({banner: item, goods: goods})
                        });
                        result.eight_goods_banner.forEach(item => {
                            let goods = [];
                            result.eight_goods_base.forEach(item2 => {
                                if (item.position_type_name === item2.position_type_name) {
                                    goods.push(item2);
                                }
                            });
                            result.eight_goods.push({banner: item, goods: goods})
                        });
                        result.six_goods_banner.forEach(item => {
                            let goods = [];
                            result.six_goods_base.forEach(item2 => {
                                if (item.position_type_name === item2.position_type_name) {
                                    goods.push(item2);
                                }
                            });
                            result.six_goods.push({banner: item, goods: goods})
                        })
                    }
                    return result;
                }
            },
            goods_list: {
                get: function () {
                    let result = [];
                    if (JSON.stringify(this.get_info) !== '{}') {
                        if (this.get_info.cat_list.length > 0 && this.get_info.goods_list.length > 0) {
                            let cat_id = this.get_info.cat_list[this.cat_index].cat_id;
                            this.get_info.goods_list.forEach(item => {
                                if (item.cat_id === cat_id) {
                                    result.push(item);
                                }
                            })
                        }
                    }
                    return result;
                }
            },

        },
        components: {
            mySearch,//搜索组件
            oneGoods,//单个商品
        },
        methods: {
            getIndexAd() {
                this.$fetch("get_index_info", {into_type: this.$store.getters.getIntoType}).then((msg) => {
                    if (msg) {
                        this.get_info = msg;
                        this.$set(this.$store.state, 'goods_list', msg.goods_list);//赋值商品列表
                        this.showPic = true;
                    }

                })
            },
            toControl(ad_info) {
                if (ad_info.ad_type === "商品ID") {
                    if (ad_info.goods_id != null && ad_info.goods_id !== '' && ad_info.goods_id !== 0) {
                        this.$router.push('goods/' + ad_info.goods_id)
                    }
                } else if (ad_info.ad_type === "分类ID") {
                    if (ad_info.cat_id != null && ad_info.cat_id !== '' && ad_info.cat_id !== 0) {
                        this.$router.push({
                            path: 'goodsList',
                            query: {type: 'cat', cat_id: ad_info.cat_id, keyword: "", back_number: -1}
                        })
                    }
                } else if (ad_info.ad_type === "搜索关键词") {
                    if (ad_info.text != null && ad_info.text !== '') {
                        this.$router.push({
                            path: 'goodsList',
                            query: {type: 'search', cat_id: -1, keyword: ad_info.text, back_number: -1}
                        })
                    }
                } else if (ad_info.ad_type === "优惠券板块") {
                    this.$router.push('/allCoupon');
                } else if (ad_info.ad_type === "外链接") {
                    if (ad_info.text != null && ad_info.text !== '') {
                        this.$router.push({
                            path: 'myIframe',
                            query: {src: ad_info.index_url}
                        })
                    }
                } else if (ad_info.ad_type === "内部文章") {
                    if (ad_info.index_article_id != null && ad_info.index_article_id !== '' && ad_info.index_article_id !== 0) {
                        this.$router.push('article/' + ad_info.index_article_id)
                    }
                } else {
                    console.log(ad_info.ad_type);
                    return false;
                }
            },
            toTestControl() {
                return false;
            },
            GetQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
        },
    };
</script>
<style lang="scss" scoped>
	.main {
		/*顶部轮播*/
		.my-van-swipe-box {
			height: 180px;
			overflow: hidden;

			.van-swipe {
				img {
					width: 100%;
				}
			}
		}

		.banner-box {
			width: 100%;

			img {
				width: 100%;
			}
		}

		.four-goods-box {
			.four-goods-base {
				display: flex;
				flex-wrap: wrap;

				div {
					width: 50%;

					img {
						width: 100%;
					}
				}
			}
		}

		.eight-goods-box {
			.eight-goods-base {
				display: flex;
				flex-wrap: wrap;

				div {
					width: 25%;

					img {
						width: 100%;
					}
				}
			}
		}

		.six-goods-box {
			.six-goods-base {
				display: flex;
				flex-wrap: wrap;

				div {
					width: 33%;

					img {
						width: 100%;
					}
				}
			}
		}
	}
</style>
<style lang="scss">
	.md-landscape-content {
		width: 375px;
		text-align: center;

		img {
			width: 70%;
		}
	}
</style>