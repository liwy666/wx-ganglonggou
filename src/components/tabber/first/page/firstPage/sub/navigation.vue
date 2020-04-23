<template>
	<div class="navigation-main">
		<div class="item" v-for="(item,i) in _classify_list" :key="i" @click="toControl(item)">
			<div class="img-box"><img :src="item.logo_img" alt=""></div>
			<div class="name-box">{{item.classify_name}}</div>
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props: {
            classify_list: Array,
        },
        computed: {
            _classify_list: {
                get: function () {
                    let result = [];

                    if (this.classify_list) {
                        result = JSON.parse(JSON.stringify(this.classify_list));
                        if (result.length > 8) {
                            result = result.slice(0, 8);
                            result.splice(5, 0, {
                                click_type: '工行活动页',
                                classify_name: '工行免息',
                                logo_img: 'https://mate.ganglonggou.com/lib/images/wx_icbc_icon_20190813.png'
                            });
                            result.splice(8, 0, {
                                click_type: '工行活动页',
                                classify_name: '工行免息',
                                logo_img: 'https://mate.ganglonggou.com/lib/images/wx_icbc_icon_20190813.png'
                            })
                        } else {
                            result.push({
                                click_type: '工行活动页',
                                classify_name: '工行免息',
                                logo_img: 'https://mate.ganglonggou.com/lib/images/wx_icbc_icon_20190813.png'
                            });
                            result.push({
                                click_type: '领券活动页',
                                classify_name: '领券',
                                logo_img: 'https://mate.ganglonggou.com/lib/images/wx_conpou_icon_20190813.png'
                            })
                        }
                    }

                    return result;
                }
            }
        },
        created() {

        },
        methods: {
            toControl(ad_info) {
                switch (ad_info.click_type) {
                    case "工行活动页":
                        window.location.href = "https://m.mall.icbc.com.cn/mobile/mobileStroe/index.jhtml?shopId=026386";
                        break;
                    case "领券活动页":
                        this.$router.push('/allCoupon');
                        break;
                    default:
                        this.$router.push({
                            path: 'goodsList',
                            query: {type: 'search', cat_id: -1, keyword: ad_info.classify_name, back_number: -1}
                        })
                }
            }
        },
    };
</script>
<style lang="scss" scoped>
	.navigation-main {
		display: flex;
		flex-wrap: wrap;
		background-color: white;
		width: 95%;
		margin: 0 auto;
		//margin-top: 10px;
		//padding-bottom: 20px;
		justify-content: left;
		/*border-bottom-left-radius: 10px;*/
		/*border-bottom-right-radius: 10px;*/
		border-radius: 10px;

		.item {
			width: 18%;
			margin-left: 2%;
			margin-top: 10px;
			margin-bottom: 10px;
			text-align: center;

			img {
				width: 60%;
			}
		}
	}
</style>