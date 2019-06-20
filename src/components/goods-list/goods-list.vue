<template>
	<div class="main">
		<div class="van-search-main">
			<van-search
				v-model="keyword"
				placeholder="请输入搜索关键词"
				showAction
				shape="round"
			>
				<div slot="label" @click="$router.go(back_number)">返回</div>
				<div slot="action" @click="onSearch">搜索</div>
			</van-search>
			<div class="van-search-support"></div>
		</div>
		<van-tabs v-model="active" sticky @click="updGoodsList">
			<van-tab title="综合">
				<div class="goods-box">
					<oneGoods v-for="(item) in default_goods_list" :key="item.goods_id" :goods_info_="item"></oneGoods>
				</div>
			</van-tab>
			<van-tab title="价格排序">
				<transition-group class="goods-box" name="flip-list">
					<oneGoods v-for="(item) in price_goods_list" :key="item.goods_id" :goods_info_="item"></oneGoods>
				</transition-group>
			</van-tab>
			<van-tab title="销量排序">
				<div class="goods-box">
					<oneGoods v-for="(item) in sales_volume_goods_list" :key="item.goods_id"
						:goods_info_="item"></oneGoods>
				</div>
			</van-tab>
			<van-tab title="新品">
				<div class="goods-box">
					<oneGoods v-for="(item) in new_goods_list" :key="item.goods_id" :goods_info_="item"></oneGoods>
				</div>
			</van-tab>
		</van-tabs>
		<transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
			<div v-show="!yz_flag" class="suspension-button-box">
				<i class="suspension-button">
					<van-icon name="arrow-up" @click="scrollToTop"/>
				</i>
			</div>
		</transition>
	</div>
</template>
<script>
    import myNarBar from '../sub/my-nav-bar';
    import oneGoods from '../sub/my-one-goods';

    export default {
        data() {
            return {
                active: 0,
                scrollTop: 0,//滚动距离
                t1: '',//是否隐藏按钮计时器
                yz_flag: false,//是否隐藏按钮
                type: '',
                cat_id: -1,
                keyword: "",
                price_flag: true,
                goods_list_: [],
                back_number: -2,
            };
        },
        computed: {
            goods_list: {
                get: function () {
                    let result = [];
                    if (this.type === 'cat') {
                        if (this.goods_list_.length > 0) {
                            this.goods_list_.forEach(item => {
                                if (parseInt(item.cat_id) === parseInt(this.cat_id)) {
                                    result.push(item)
                                }
                            })
                        }
                    } else if (this.type === 'search') {
                        let goods_id_array = [];
                        this.goods_list_.forEach(item => {
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
                                this.goods_list_.forEach(item2 => {
                                    if (item === item2.goods_id) {
                                        result.push(item2)
                                    }
                                })
                            })
                        }
                        if (result.length < 1) {
                            result = this.goods_list_
                        }
                    } else {
                        result = this.goods_list_
                    }
                    return result;
                }
            },
            default_goods_list: {
                get: function () {
                    let result = JSON.parse(JSON.stringify(this.goods_list));
                    if (result.length > 0) {
                        //冒泡排序
                        for (let i = 0; i < result.length - 1; i++) {
                            for (let j = 0; j < result.length - i - 1; j++) {
                                if ((result[j].goods_sales_volume + result[j].evaluate_count) < (result[j + 1].goods_sales_volume + result[j + 1].evaluate_count)) {
                                    let max = result[j];
                                    result[j] = result[j + 1];
                                    result[j + 1] = max;
                                }
                            }
                        }
                    }
                    return result;
                }
            },
            price_goods_list: {
                get: function () {
                    let result = JSON.parse(JSON.stringify(this.goods_list));
                    if (result.length > 0) {
                        //冒泡排序
                        if (this.price_flag) {
                            for (let i = 0; i < result.length - 1; i++) {
                                for (let j = 0; j < result.length - i - 1; j++) {
                                    if (parseFloat(result[j].shop_price) < parseFloat(result[j + 1].shop_price)) {
                                        let max = result[j];
                                        result[j] = result[j + 1];
                                        result[j + 1] = max;
                                    }
                                }
                            }
                        } else {
                            for (let i = 0; i < result.length - 1; i++) {
                                for (let j = 0; j < result.length - i - 1; j++) {
                                    if (parseFloat(result[j].shop_price) > parseFloat(result[j + 1].shop_price)) {
                                        let max = result[j];
                                        result[j] = result[j + 1];
                                        result[j + 1] = max;
                                    }
                                }
                            }
                        }

                    }
                    return result;
                }
            },
            sales_volume_goods_list: {
                get: function () {
                    let result = JSON.parse(JSON.stringify(this.goods_list));
                    if (result.length > 0) {
                        //冒泡排序
                        for (let i = 0; i < result.length - 1; i++) {
                            for (let j = 0; j < result.length - i - 1; j++) {
                                if (parseInt(result[j].goods_sales_volume) < parseInt(result[j + 1].goods_sales_volume)) {
                                    let max = result[j];
                                    result[j] = result[j + 1];
                                    result[j + 1] = max;
                                }
                            }
                        }
                    }
                    return result;
                }
            },
            new_goods_list: {
                get: function () {
                    let result2 = JSON.parse(JSON.stringify(this.goods_list));
                    let result = [];
                    if (result2.length > 0) {
                        //先筛选
                        result2.forEach(item => {
                            if (item.is_new === 1) {
                                result.push(item);
                            }
                        });
                        if (result.length > 0) {
                            //冒泡排序
                            for (let i = 0; i < result.length - 1; i++) {
                                for (let j = 0; j < result.length - i - 1; j++) {
                                    if ((result[j].goods_sales_volume + result[j].evaluate_count) < (result[j + 1].goods_sales_volume + result[j + 1].evaluate_count)) {
                                        let max = result[j];
                                        result[j] = result[j + 1];
                                        result[j + 1] = max;
                                    }
                                }
                            }
                        }

                    }
                    return result;
                }
            }
        },
        watch: {
            'scrollTop': function (newVal) {
                this.yz_flag = false;
                if (this.t1 !== '') {
                    clearTimeout(this.t1);
                }
                this.t1 = setTimeout(() => {
                    let now_top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                    if (now_top === newVal && now_top !== 0) {
                        this.yz_flag = true;
                    }
                }, 3000);
            },
            '$store.state.goods_list': function (newVal) {
                this.$set(this, 'goods_list_', newVal);
            }
        },
        created() {

        },
        activated() {
            window.addEventListener('scroll', this.handleScroll);
            /*获取url参数*/
            this.type = this.$route.query.type;
            this.cat_id = this.$route.query.cat_id;
            this.keyword = this.$route.query.keyword;
            this.back_number = typeof (this.$route.query.back_number) === 'undefined' ? -2 : this.$route.query.back_number;
            this.yz_flag = false;//是否隐藏按钮
            /*获取商品列表*/
            if (this.$store.state.goods_list.length < 1) {
                this.$store.dispatch("getGoodsList", this.$store.getters.getIntoType);
            } else {
                this.$set(this, 'goods_list_', this.$store.state.goods_list);
            }
        },
        methods: {
            handleScroll() {
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            },
            /*返回顶部*/
            scrollToTop() {
                (function smoothscroll() {
                    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                    if (currentScroll > 0) {
                        window.requestAnimationFrame(smoothscroll);
                        window.scrollTo(0, currentScroll - (currentScroll / 5));
                    }
                })();
            },
            updGoodsList() {
                if (this.active === 1) {
                    this.$set(this, 'price_flag', !this.price_flag);
                }

            },
            /*手动搜索*/
            onSearch() {
                if (this.keyword.length > 0 && this.keyword.length < 20) {
                    let keyword = this.keyword.toUpperCase();
                    keyword = keyword.replace(/\s*/g, "");
                    this.$router.push({path: 'goodsList', query: {type: 'search', cat_id: -1, keyword: keyword}});
                }
            },
        },
        components: {
            myNarBar,//头部组件
            oneGoods,//单个商品
        },
    };
</script>
<style lang="scss" scoped>
	.main {
		.van-tabs--line {
			padding-top: 0 !important;
		}

		.van-search {
			//background-image: linear-gradient(45deg,$main-color0,$main-color2)!important;
		}

		.suspension-button-box {
			z-index: 100;
			position: fixed;
			right: 0;
			bottom: 0;

			.suspension-button {
				display: block;
				background-color: white;
				width: 40px;
				height: 40px;
				margin-bottom: 5px;
				border-radius: 50%;
				margin-right: 5px;
				border: 2px solid $main-color0;
				box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.9);

				i {
					width: 100%;
					height: 100%;
					line-height: 40px;
					text-align: center;
					font-size: 18px;
					color: $main-color0;
				}
			}
		}

		.goods-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
		}

		.flip-list-move {
			transition: transform 0.5s;
		}
	}
</style>
<style>
	.van-tabs__wrap {
		z-index: 2 !important;
	}
</style>