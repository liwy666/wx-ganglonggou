<template>
	<div>
		<transition name="name1">
			<keep-alive>
				<router-view class="router-view" v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		<transition name="name2">
			<router-view class="router-view" v-if="!$route.meta.keepAlive"></router-view>
		</transition>

		<div class="support"></div>
		<van-tabbar v-model="active" :fixed="fixed" :active-color="$MyCommon.$main_color0">
			<van-tabbar-item icon="shop-collect" to="first">首页</van-tabbar-item>
			<van-tabbar-item icon="service"
							 :to="{path:'myIframe',query:{src:'https://p.qiao.baidu.com/cps2/mobileChat?siteId=11040705&userId=24298402&type=1&reqParam=&appId=&referer='}}">
				客服
			</van-tabbar-item>
			<van-tabbar-item icon="underway" dot to="spike">秒杀</van-tabbar-item>
			<van-tabbar-item icon="shopping-cart" to="cart" :info="this.$store.getters.getCartsGoodsNumberCount">购物车
			</van-tabbar-item>
			<van-tabbar-item icon="manager" to="home">个人中心</van-tabbar-item>
		</van-tabbar>
	</div>

</template>

<script>

    import {commonShare} from "../../share";

    export default {
        data() {
            return {
                fixed: true
            };
        },
        created() {
            //commonShare(this, '岗隆数码', window.location.href, 'https://api.ganglonggou.com/images/wx_share_img.png', '岗隆数码农行专区');
        },
        computed: {
            /*头部轮播*/
            active: {
                get: function () {
                    let path = this.$route.path,
                        index = 0;
                    switch (path) {
                        case "/":
                            index = 0;
                            break;
                        case "/spike":
                            index = 2;
                            break;
                        case "/cart":
                            index = 3;
                            break;
                        case "/home":
                            index = 4;
                            break;
                        default:
                            index = 0;
                            break;
                    }
                    return index;
                },
                set: function () {

                }
            },
        },
        activated() {

        },
        methods: {},
    };
</script>

<style lang="scss" scoped>
	.van-tabbar--fixed {
		position: fixed !important;
		z-index: 999 !important;
		box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
	}

	.name1-enter {
		//opacity: 0;
		transform: translateX(100%);
	}

	.name1-leave-to {
		//opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}

	.name2-enter-active,
	.name2-leave-active {
		transition: all 0.3s ease;
	}

	.name2-enter {
		//opacity: 0;
		transform: translateX(100%);
	}

	.name2-leave-to {
		//opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}

	.name1-enter-active,
	.name1-leave-active {
		transition: all 0.3s ease;
	}

	.support {
		height: 80px;
	}
</style>