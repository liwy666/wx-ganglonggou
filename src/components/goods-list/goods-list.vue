<template>
	<div class="main">
		<div class="van-search-main">
			<van-search
				v-model="show_keyword"
				placeholder="请输入搜索关键词"
				showAction
				shape="round"
			>
				<div slot="label" @click="back">返回</div>
				<div slot="action" @click="goSearch">搜索</div>
			</van-search>
			<div class="van-search-support"></div>
		</div>
		<goodsList :goods_list="screen_after_goods_list"></goodsList>
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
    import goodsList from '../sub/goodsList'

    export default {
        data() {
            return {
                scrollTop: 0,//滚动距离
                t1: '',//是否隐藏按钮计时器
                yz_flag: false,//是否隐藏按钮
                type: '',
                cat_id: -1,
                show_keyword: "",
                truth_keyword: "",
                goods_list: [],
                screen_after_goods_list: [],
                back_number: -2,
            };
        },
        computed: {},
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
                this.$set(this, 'goods_list', newVal);
            }
        },
        activated() {
            window.addEventListener('scroll', this.handleScroll);
            /*获取url参数*/
            this.type = this.$route.query.type;
            this.cat_id = this.$route.query.cat_id;
            this.truth_keyword = decodeURI(this.$route.query.keyword);
            this.back_number = typeof (this.$route.query.back_number) === 'undefined' ? -2 : this.$route.query.back_number;
            this.yz_flag = false;//是否隐藏按钮
            /*获取商品列表*/
            if (this.$store.state.goods_list.length < 1) {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '获取商品列表',
                    duration: 0
                });
                this.$fetch('user_get_goods_list', {into_type: this.$store.getters.getIntoType})
                    .then((msg) => {
                        if (msg) {
                            console.log(msg);
                            this.$set(this, 'goods_list', msg);
                            toast1.clear();
                            this.screen_after_goods_list = this.screenGoods();
                        }

                    })
            } else {
                this.$set(this, 'goods_list', this.$store.state.goods_list);
                this.screen_after_goods_list = this.screenGoods();
            }

            /*置顶*/
            let beforeUrl = localStorage.getItem('beforeUrl');
            if (beforeUrl.indexOf('/goods/') === -1) {
                window.scrollTo(0, 0);
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
            screenGoods() {
                let result = [];
                if (this.type === 'cat') {
                    if (this.goods_list.length > 0) {
                        this.goods_list.forEach(item => {
                            if (parseInt(item.cat_id) === parseInt(this.cat_id)) {
                                result.push(item)
                            }
                        })
                    }
                } else if (this.type === 'search') {
                    result = this.screenGoodsByKeyword();
                }
                return result;
            },
            screenGoodsByKeyword() {
                let result = [];
                let goods_id_array = [];
                this.goods_list.forEach(item => {
                    /*名称*/
                    let goods_name = item.goods_name.toUpperCase();
                    goods_name = goods_name.replace(/\s*/g, "");
                    if (goods_name.indexOf(this.truth_keyword) !== -1) {
                        goods_id_array.push(item.goods_id)
                    }
                    /*分类名称*/
                    let cat_name = item.cat_name.toUpperCase();
                    cat_name = cat_name.replace(/\s*/g, "");
                    if (cat_name.indexOf(this.truth_keyword) !== -1) {
                        goods_id_array.push(item.goods_id)
                    }
                    /*关键词*/
                    let keywords = item.keywords.toUpperCase();
                    keywords = keywords.replace(/\s*/g, "");
                    if (keywords.indexOf(this.truth_keyword) !== -1) {
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
                } else {
                    result = this.goods_list;
                    this.$dialog.alert({
                        title: '没找到相关的商品哦~',
                        message: '别担心，看看这些商品吧，肯定有你喜欢的'
                    })
                }
                return result;
            },
            /*手动搜索*/
            goSearch() {
                this.truth_keyword = this.show_keyword;
                this.truth_keyword = this.truth_keyword.toUpperCase();
                this.truth_keyword = this.truth_keyword.replace(/\s*/g, "");
                let screen_goods_list = this.screenGoodsByKeyword();
                this.$set(this, 'screen_after_goods_list', screen_goods_list);
            },

            back(){
                if (window.history.length <= 1) {
                    this.$router.push({path:'/'});
                    return false
                } else {
                    this.$router.go(this.back_number)
                }
                //上面都没执行就说明卡在当前页不是最后一条， histroy记录数量大于1，又没有回退记录，只能返回首页，
                //如果上面都执行了 页面都跳走了，这个也就不用管了
                setTimeout(() => {
                    this.$router.push({path:'/'})
                },500)
            }

        },
        components: {
            goodsList,//商品列表
        }
        ,
    }
    ;
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