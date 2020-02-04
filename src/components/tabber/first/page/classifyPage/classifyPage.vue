<template>
	<div class="classify-page-main">
		<div class="children-classify-box">
			<div class="children-classify-item" v-for="item in children_classify" :key="item.id"
				@click="goSearch(item)">
				<div class="img-box"><img :src="item.logo_img" alt=""></div>
				<div class="name">{{item.classify_name}}</div>
			</div>
		</div>
		<div class="lonely-banner" v-if="this.parent_classify.bar_img" @click="goSearch(parent_classify)">
			<img :src="this.parent_classify.bar_img" alt="">
		</div>
		<div class="goods-list-box">
			<goodsCard v-for="item in screen_after_goods_list" :key="item.goods_id" :goods_info_="item"></goodsCard>
		</div>
	</div>
</template>
<script>
    import goodsCard from '../../../../sub/my-one-less-goods'

    export default {
        data() {
            return {
                keyword: '',
                goods_list: [],
                screen_after_goods_list: [],
            };
        },
        props: {
            parent_classify: Object,
        },
        computed: {
            children_classify: {
                get: function () {
                    let result = [];
                    if (this.parent_classify.children) {
                        result = this.parent_classify.children;
                    }
                    return result;
                }
            },
        },
        watch: {
            '$store.state.goods_list': function (newVal) {
                if (newVal.length > 0) {
                    this.$set(this, 'goods_list', newVal);
                    this.screen_after_goods_list = this.screenGoodsByKeyword();
                }
            }
        },
        created() {
            this.keyword = this.parent_classify.classify_name;
            /*获取商品列表*/
            if (this.$store.state.goods_list.length < 1) {
                this.$store.dispatch("getGoodsList", this.$store.getters.getIntoType);
            } else {
                this.$set(this, 'goods_list', this.$store.state.goods_list);
                this.screen_after_goods_list = this.screenGoodsByKeyword();
            }

        },
        methods: {
            screenGoodsByKeyword() {
                let result = [];
                let goods_id_array = [];
                this.goods_list.forEach(item => {
                    /*名称*/
                    let goods_name = item.goods_name.toUpperCase();
                    goods_name = goods_name.replace(/\s*/g, "");
                    if (goods_name.indexOf(this.keyword) !== -1) {
                        goods_id_array.push(item.goods_id)
                    }
                    /*分类名称*/
                    let cat_name = item.cat_name.toUpperCase();
                    cat_name = cat_name.replace(/\s*/g, "");
                    if (cat_name.indexOf(this.keyword) !== -1) {
                        goods_id_array.push(item.goods_id)
                    }
                    /*关键词*/
                    let keywords = item.keywords.toUpperCase();
                    keywords = keywords.replace(/\s*/g, "");
                    if (keywords.indexOf(this.keyword) !== -1) {
                        goods_id_array.push(item.goods_id)
                    }
                });
                if (goods_id_array.length > 0) {
                    goods_id_array = this.$MyCommon.unique1(goods_id_array);
                    goods_id_array.forEach(item => {
                        this.goods_list.forEach(item2 => {
                            if (item === item2.goods_id) {
                                result.push(item2)
                            }
                        })
                    })
                }
                return result;
            },
            goSearch(item) {
                if (item.click_type === '搜索关键词' && item.key_word !== "无响应") {
                    this.keyword = item.key_word ? item.key_word : item.classify_name;
                    // let screen_goods_list = this.screenGoodsByKeyword();
                    // console.log(item.click_type);
                    // this.$set(this, 'screen_after_goods_list', screen_goods_list);
                    console.log(this.keyword);
                    this.$router.push({
                        path: 'goodsList',
                        query: {type: 'search', cat_id: -1, keyword: this.keyword, back_number: -1}
                    })
                } else if (item.click_type === '商品ID') {
                    this.$router.push('goods/' + item.goods_id)
                }

            }
        },
        components: {
            goodsCard
        }
    };
</script>
<style lang="scss" scoped>
	.classify-page-main {
		.children-classify-box {
			background-color: white;
			display: flex;
			flex-wrap: wrap;
			//padding: 10px 5px;
			box-sizing: border-box;
			.children-classify-item {
				margin: 5px 0;
				width: 25%;
				text-align: center;

				.img-box {
					width: 50%;
					border-radius: 50%;
					overflow: hidden;
					margin: 0 auto;
					img {
						width: 100%;
					}
				}

				.name {
					font-size: 10px;
					color: #7d7e80;
				}
			}
		}

		.lonely-banner {
			width: 95%;
			margin: 10px auto;

			img {
				border-radius: 10px;
				width: 100%;
			}
		}

		.goods-list-box {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>