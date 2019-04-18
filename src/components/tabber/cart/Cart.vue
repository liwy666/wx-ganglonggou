<template>
	<div class="main">
		<myNarBar v-if="nar_bar_flag" title="购物车"></myNarBar>
		<div class="evaluate-load">
			<van-list
							v-model="loading"
							:finished="finished"
							:error.sync="error"
							finished-text="没有更多了"
							error-text="请求失败，点击重新加载"
							@load="onLoad"
			>
				<myOneCart v-for="(item,i) in old_carts" :cart_info="item" :key="i"></myOneCart>
			</van-list>
		</div>
		<div class="d"></div>
		<div class="settle-accounts-box">
			<div class="settle-accounts-price">合计：<span>￥{{this.$store.getters.getCartsSelectedPrice}}</span></div>
			<div class="settle-accounts-button">
				<van-button type="danger" size="large" @click="goSettleAccounts">
					去结算（{{this.$store.getters.getCartsSelectedCount}}）
				</van-button>
			</div>
		</div>
	</div>

</template>

<script>
    import myNarBar from '../../sub/my-nav-bar';
    import myOneCart from './sub/my-one-cart'

    export default {
        data() {
            return {
                count: 0,
                nar_bar_flag: true,
                loading: false,
                finished: false,
                error: false,
                page: 0,//初始请求次数
                limit: 3,//每次获取购物车个数
                old_carts: [],
                now_count: 0,
                carts_count: this.$store.getters.getCartsCount
            };
        },
        watch: {
            '$route.path': function (new_val, lod_val) {
                if (lod_val.search("goods") === -1) {
                    this.nar_bar_flag = false;
                } else {
                    this.nar_bar_flag = true;
                }
            }
        }
        , created() {

        },
        methods: {
            onLoad() {
                //获取本地购物车数组
                if (this.carts_count > 0) {
                    let carts_ = this.$store.state.carts;
                    let get_carts = carts_.slice(this.page, this.page + this.limit);
                    this.loading = true;
                    this.$fetch('usergetcart_v2'
                        , {carts: get_carts})
                        .then((msg) => {
                            msg.forEach(item => {
                                this.$store.commit("updCart", item);
                            });
                            let carts_2 = this.$store.state.carts;
                            let get_carts2 = carts_2.slice(this.page, this.page + this.limit);
                            get_carts2.forEach(item => {
                                this.old_carts.push(item);
                            });
                            this.page += this.limit;
                            this.now_count += this.limit;
                            if (this.now_count >= this.carts_count) {
                                this.finished = true;
                            }
                            this.loading = false;
                        })
                } else {
                    this.finished = true;
                    this.loading = false;
                }
            }
            , goSettleAccounts() {
                if (this.$store.getters.getCartsSelectedCount > 0) {
                    let idl_carts_selected = this.$store.getters.getCartsSelected;
                    let flag = true;
                    idl_carts_selected.forEach(item => {
                        if (item.cart_is === false) {
                            this.$toast("选购商品中有失效产品");
                            flag = false;
                        }
                    });
                    if (flag) {
                        this.$router.push('/writeOrder');
                    }
                } else {
                    this.$toast("还未选中商品哦~~")
                }
            }
        },
        components: {
            myNarBar,//头部组件
            myOneCart//单个购物车
        },
    };
</script>

<style lang="scss" scoped>
	.settle-accounts-box {
		height: 50px;
		background-color: white;
		position: fixed;
		bottom: 50px;
		width: 100%;
		display: flex;
		
		.settle-accounts-price {
			line-height: 50px;
			text-align: center;
			font-size: 16px;
			flex: 1;
			
			span {
				font-weight: bold;
			}
		}
		
		.settle-accounts-button {
			flex: 1;
		}
	}
	
	.d {
		width: 100%;
		height: 50px;
	}
</style>