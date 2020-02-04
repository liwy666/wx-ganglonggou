<template>
	<div class="first-main">
		<van-sticky>
			<div class="top-main">
				<mySearch></mySearch>
				<topSwitch :parents_classify_list="classify_list" :switch_index="switch_index"
					@updateSwitchIndex="updateSwitchIndex"></topSwitch>
			</div>
		</van-sticky>
		<div class="base-swiper-main">
			<swiper :options="base_swiper_options" ref="myBaseSwiper">
				<swiper-slide>
					<firstPage v-if="index_ad_list&&classify_list" :index_ad_info="index_ad_list"
						:classify_list="classify_list"></firstPage>
				</swiper-slide>
				<swiper-slide v-for="(item,i) in classify_list" :key="i">
					<classifyPage :parent_classify="item"></classifyPage>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>
<script>
    import mySearch from "./sub/my-sub-search.vue";//搜索组件
    import topSwitch from './sub/topSwitch'//头部切换
    import firstPage from './page/firstPage/firstPage'//首页
    import classifyPage from './page/classifyPage/classifyPage'//分类页
    import {commonShare} from "../../../share";

    export default {
        data() {
            return {
                index_info: null,
                coupon_swiper: {
                    slidesPerView: 2.5,
                    spaceBetween: 10,
                },
                radio: "1",
                cat_index: 0,
                show_pic: false,
                swipe_img: [],
                notice_text: '',
                switch_index: 0,
                base_swiper_options: {
                    slidesPerView: 1,
                    allowTouchMove: false,
                    autoHeight: true,
                }
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
            commonShare(this, '岗隆数码', this.$store.state.local_url, 'https://img-api.ganglonggou.com/wx_share_img.png', '江苏岗隆数码-您身边的数码产品服务商');
        },
        computed: {
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
            classify_list: {
                get: function () {
                    let result = [];
                    let classify_list = this.$store.state.classify_list;
                    if (classify_list.length > 1) {
                        result = this.getTrees(classify_list, 0);
                    }
                    return result;
                }
            },
            index_ad_list: {
                get: function () {
                    let result = null;
                    if (this.index_info) {
                        result = this.index_info.ad_list;
                    }
                    return result;
                }
            }
        },
        components: {
            mySearch,//搜索组件
            topSwitch,//头部切换
            firstPage,//首页
            classifyPage,//分类页
        },
        methods: {
            getIndexAd() {
                this.$fetch("get_index_info", {into_type: this.$store.getters.getIntoType}).then((msg) => {
                    if (msg) {
                        this.index_info = msg;
                        this.$set(this.$store.state, 'goods_list', msg.goods_list);//赋值商品列表
                        //this.showPic();//弹窗
                        this.$fetch("user_get_classify_ad_list", {into_type: this.$store.getters.getIntoType}).then((msg) => {
                            if (msg) {
                                this.$set(this.$store.state, 'classify_list', msg);
                            }
                        });
						//默认展示第几项
                        let first_page_index= this.GetQueryString('first_page_index');
                        if(first_page_index){
                            if ((/(^[1-9]\d*$)/.test(parseInt(first_page_index)))) {//验证正整数
                                setTimeout(() => {
                                    this.updateSwitchIndex(first_page_index);
                                },1000)
                            }
                        }
                    }
                })
            },
            showPic() {
                let time = localStorage.getItem('glShowPicTime') || 0;
                if (time < parseInt(new Date().getTime())) {
                    localStorage.setItem('glShowPicTime', parseInt(new Date().getTime()) + 86400000);
                    this.show_pic = true;
                }
            },
            /**
             * 树状的算法
             * @params list     代转化数组
             * @params parentId 起始节点
             */
            getTrees(list, parentId) {
                let items = {};
                // 获取每个节点的直属子节点，*记住是直属，不是所有子节点
                for (let i = 0; i < list.length; i++) {
                    let key = list[i].parent_id;
                    if (items[key]) {
                        items[key].push(list[i]);
                    } else {
                        items[key] = [];
                        items[key].push(list[i]);
                    }
                }
                return this.formatTree(items, parentId);
            },
            /**
             * 利用递归格式化每个节点
             */
            formatTree(items, parentId) {
                let result = [];
                if (!items[parentId]) {
                    return result;
                }
                for (let t of items[parentId]) {
                    t.children = this.formatTree(items, t.id);
                    result.push(t);
                }
                return result;
            },
            GetQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
            updateSwitchIndex(val) {
                this.switch_index = val;
                console.log(val);
                this.$refs.myBaseSwiper.swiper.slideToLoop(val);
            }
        },
    };
</script>
<style lang="scss" scoped>
	.first-main {
		background-color: rgb(242, 242, 242);

		.top-main {
			height: 90px;
			background-image: url("https://mate.ganglonggou.com/lib/images/wx_first_top1_0812.jpg");
			background-repeat: no-repeat;
			background-size: 100% 100%;
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