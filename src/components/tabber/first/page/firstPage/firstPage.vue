<template>
	<div class="first-page-main">
		<topSwiper :data="_index_ad_info.swiper_list" :to-control="toControl"></topSwiper>
		<!--		<mallNotice v-if="_index_ad_info.mall_notice" :data="_index_ad_info.mall_notice"></mallNotice>-->
		<navigation :classify_list="classify_list"></navigation>
		<div v-if="_index_ad_info.lonely_banner.length === 1" class="lonely-banner"
			@click="toControl(_index_ad_info.lonely_banner[0])">
			<img :src="_index_ad_info.lonely_banner[0].ad_img"
				alt=""></div>
		<div v-if="_index_ad_info.lonely_banner.length > 1" class="lonely-banner-2">
			<div v-for="(item,i) in _index_ad_info.lonely_banner" :key="i" @click="toControl(item)"><img :src="item.ad_img" ></div>
		</div>
		<p class="title"><i style="color: rgb(48,44,46)">现货</i><i
			style="color: rgb(255,82,9)">推荐</i></p>
		<newGoodsList :data="_index_ad_info.new_goods_list" :to-control="toControl"></newGoodsList>
		<p class="title"><i style="color: rgb(48,44,46)">品牌</i><i
			style="color: rgb(8,122,254)">惠聚</i></p>
		<brandAlign :data="_index_ad_info.brand_align" :to-control="toControl"></brandAlign>
		<p class="title"><i style="color: rgb(48,44,46)">平台</i><i
			style="color: rgb(8,177,158)">店铺</i></p>
		<otherShop :data="_index_ad_info.other_shop" :to-control="toControl"></otherShop>
		<p class="title"><i style="color: rgb(48,44,46)">推荐</i><i
			style="color: rgb(248,38,40)">榜单</i></p>
		<div class="goods-list-box">
			<goodsCard v-for="item in _goods_list" :key="item.goods_id" :goods_info_="item"></goodsCard>
		</div>
	</div>
</template>
<script>
    import topSwiper from './sub/topSwiper'
    import mallNotice from './sub/mallNotice'
    import navigation from './sub/navigation'
    import newGoodsList from './sub/nweGoodsList'
    import brandAlign from './sub/brandAlign'
    import otherShop from './sub/otherShop'
    import goodsCard from '../../../../sub/my-one-less-goods'

    export default {
        data() {
            return {};
        },
        props: {
            index_ad_info: Array,
            classify_list: Array,
        },
        computed: {
            _index_ad_info: {
                get: function () {
                    let result = {
                        swiper_list: [],
                        mall_notice: null,
                        lonely_banner: [],
                        new_goods_list: [],
                        brand_align: [],
                        other_shop: [],
                    };
                    if (this.index_ad_info) {
                        this.index_ad_info.forEach(item => {
                            switch (item.position_type) {
                                case "顶部轮播":
                                    result.swiper_list.push(item);
                                    break;
                                case "公告":
                                    result.mall_notice = item;
                                    break;
                                case "孤立通栏":
                                    result.lonely_banner.push(item);
                                    break;
                                case "新品尝鲜-商品":
                                    result.new_goods_list.push(item);
                                    break;
                                case "品牌惠聚-内容":
                                    result.brand_align.push(item);
                                    break;
                                case "平台店铺-内容":
                                    result.other_shop.push(item);
                                    break;
                            }
                        })
                    }
                    return result;
                }
            },
            _goods_list: {
                get: function () {
                    return this.$store.state.goods_list;
                }
            }
        },
        created() {

        },
        methods: {
            toControl(ad_info) {
                switch (ad_info.ad_type) {
                    case "商品ID":
                        if (ad_info.goods_id != null && ad_info.goods_id !== '' && ad_info.goods_id !== 0) {
                            this.$router.push({path: 'goods/' + ad_info.goods_id})
                        }
                        break;
                    case "分类ID":
                        if (ad_info.cat_id != null && ad_info.cat_id !== '' && ad_info.cat_id !== 0) {
                            this.$router.push({
                                path: 'goodsList',
                                query: {type: 'cat', cat_id: ad_info.cat_id, keyword: "", back_number: -1}
                            })
                        }
                        break;
                    case "搜索关键词":
                        if (ad_info.text != null && ad_info.text !== '') {
                            this.$router.push({
                                path: 'goodsList',
                                query: {type: 'search', cat_id: -1, keyword: ad_info.text, back_number: -1}
                            })
                        }
                        break;
                    case "优惠券板块":
                        this.$router.push('/allCoupon');
                        break;
                    case "外链接":
                        if (ad_info.url != null && ad_info.url !== '') {
                            window.location.href = ad_info.url;
                        }
                        break;
                    case "内部文章":
                        if (ad_info.article_id != null && ad_info.article_id !== '' && ad_info.article_id !== 0) {
                            this.$router.push('article/' + ad_info.article_id)
                        }
                        break;
                    default:
                        console.log(ad_info);
                        return false;
                }
            },
        },
        components: {
            topSwiper,//顶部轮播
            mallNotice,//公告
            navigation,//导航
            newGoodsList,//新品尝鲜
            brandAlign,//品牌惠聚
            otherShop,//其他店铺
            goodsCard,//商品卡片
        }
    };
</script>
<style lang="scss" scoped>
	.first-page-main {
		.lonely-banner {
			width: 95%;
			margin: 0 auto;
			//margin-top: 12px;
			img {
				border-radius: 10px;
				width: 100%;
			}
		}

		.lonely-banner-2 {
			width: 97%;
			margin:0 auto;
			margin-top: 12px;
			margin-bottom: -5px;
			display: flex;
			//justify-content: space-between;
			div{
				width: 48.5%;
				margin-left: 5px;
				img {
					width: 100%;
					border-radius: 10px;
				}
			}

		}

		.title {
			text-align: left;
			padding-left: 10px;
			margin-top: 8px;
			margin-bottom: 5px;

			i {
				font-weight: bolder;
				font-size: 18px;
				letter-spacing: 1px;
				font-style: normal;
			}
		}

		.goods-list-box {
			width: 95%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin: 0 auto;
		}
	}
</style>