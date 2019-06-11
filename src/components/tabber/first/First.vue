<template>
	<div class="mian">
		<!--搜索框-->
		<mySearch></mySearch>
		<!--头部轮播图-->
		<van-swipe :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(item, index) in swipe_img" :key="index">
				<img v-lazy="item.ad_img" @click="toControl(item)"/>
			</van-swipe-item>
		</van-swipe>
		<div class="my-tab-box">
			<div class="my-tab" v-for="(item,i) in get_info.cat_list" :key="item.cat_id"
				 @click="cat_index = i"
				 :class="[i === cat_index ? 'xz':'']">
				{{item.cat_name}}
			</div>
		</div>
		<transition-group class="my-goods-box" name="flip-list">
			<oneGoods v-for="(item) in goods_list" :key="item.goods_id" :goods_info_="item"></oneGoods>
		</transition-group>
		<!--压屏广告-->
		<md-landscape v-model="showPic">
			<img :src="pop_img_url">
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
            /*头部轮播*/
            swipe_img: {
                get: function () {
                    let result = [];
                    if (JSON.stringify(this.get_info) !== '{}') {
                        this.get_info.ad_list.forEach(item => {
                            if (item.position_type === '顶部广告轮播图') {
                                result.push(item);
                            }
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
            pop_img_url: {
                get: function () {
                    let result = '';
                    if (JSON.stringify(this.get_info) !== '{}') {
                        this.get_info.ad_list.forEach(item => {
                            if (item.position_type === '压屏广告') {
                                result = item.ad_img;
                            }
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
                    if (ad_info.index_goods_id != null && ad_info.index_goods_id !== '' && ad_info.index_goods_id !== 0) {
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
                } else if (ad_info.ad_type === "内部文章") {
                    console.log(ad_info);
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

	.my-goods-box {
		display: flex;
		flex-wrap: wrap;
	}

	.flip-list-move {
		transition: transform 0.5s;
	}

	.lflip-list-enter-active, .flip-list-leave-active {
		transition: all 0.3s;
	}

	.flip-list-enter, .flip-list-leave-to {
		//opacity: 0;
		transform: translateY(60px);
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

	.my-tab-box {
		display: flex;
		margin-top: 5px;
		box-shadow: 0 0 1px 1px rgba(0, 0, 0, .3);
		background-color: $main-color0;

		.my-tab {
			background-color: $main-color0;
			color: white;
			height: 40px;
			line-height: 40px;
			width: 50%;
			text-align: center;
			transition: all ease 0.3s;
		}

		.xz {
			/*box-shadow: 0px -5px 1px 1px rgba(0,0,0,.3);*/
			color: $main-color0;
			background-color: white;
		}
	}


</style>
<style lang="scss">
	.md-landscape-content {
		width: 375px;
		text-align: center;
	}
</style>