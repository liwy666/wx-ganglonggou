<template>
	<div class="main">
		<myNarBar title="订单详情"></myNarBar>
		<!--收货地址-->
		<van-contact-card
			:type="default_address===''? 'add' : 'edit'"
			:name="default_address.name +'（'+default_address.province+default_address.city+default_address.county+default_address.address_detail+'）'"
			:tel="default_address.tel"
			add-text="添加收货人"
			v-if="getAddressList_load"
			@click="updDefaultAddress()"
		/>
		<!--商品列表-->
		<GoodsList></GoodsList>
		<!--支付选项-->
		<payOption v-if="getPayList_load && getUserInfo_load"></payOption>
		<!--开票方式选项-->
		<invoice></invoice>
		<!--优惠券选项-->
		<couponOption v-if="getCouponList_load"></couponOption>
		<!--积分使用-->
		<integralOption v-if="getUserInfo_load"></integralOption>
		<!--费用清单-->
		<orderList v-if="getUserInfo_load"></orderList>
		<div class="d"></div>
		<div class="button-box">
			<div class="button-box-l"><span>￥</span>{{this.order_price}}</div>
			<div class="button-box-r">
				<van-button type="danger" size="large" @click="put_order">提交订单</van-button>
			</div>
		</div>
	</div>
</template>

<script>
    import myNarBar from '../sub/my-nav-bar';
    import payOption from './sub/my-pay-option';
    import GoodsList from './sub/my-write-order-goods-list';
    import invoice from './sub/my-invoice-option';
    import couponOption from './sub/my-coupon-option';
    import integralOption from './sub/my-write-order-integral-option';
    import orderList from './sub/my-write-order-list';

    export default {
        data() {
            return {
                getPayList_load: false,
                getAddressList_load: false,
                getCouponList_load: false,
                getUserInfo_load: false,
            };
        },
        computed: {
            default_address: {
                get: function () {
                    return this.$store.getters.getDefaultAddress;
                }
            },
            order_price: {
                get: function () {
                    return this.$store.state.write_order_info.order_price;
                }
            },
        },
        created() {
            //初始化表单
            if (this.$route.query.init === true) {
                this.$set(this.$store.state, 'write_order_info', {
                    use_integral: 0,//使用积分数量
                });
            }
            this.getPayList(this.$store.state.user_token);
            this.getCouponList(this.$store.state.user_token);
            this.getUserInfo(this.$store.state.user_token);
            this.getAddressList(this.$store.state.user_token);
        },
        methods: {
            getInfo() {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '获取支付列表',
                    duration: 0
                });
                this.$fetch('user_get_fill_in_order_v2', {user_token: this.$store.getters.getUserToken})
                    .then((msg) => {
                        this.msg = msg;
                        this.$store.dispatch("getAddressList", this.$store.getters.getUserToken);
                        this.$store.dispatch("getCouponList", this.$store.getters.getUserToken);
                        this.$store.dispatch("getUserInfo", this.$store.getters.getUserToken);
                        toast1.clear();
                    })
            },

            updDefaultAddress() {
                if (this.$store.state.address_list.length === 0) {
                    this.$router.push({path: '/addressEdit', query: {address_edit: JSON.stringify({is_add: true,})}})
                } else {
                    this.$router.push({path: '/addressList', query: {go_back: true}});
                }
            }
            ,

            put_order() {

                let write_order_info = this.$store.state.write_order_info;
                if (this.$store.state.carts_selected.length < 1 || JSON.stringify(this.$store.state.user_info) === '{}') {
                    this.$toast("暂无法提交该订单，请稍后再试。或您已提交过订单，请前往个人中心查看");
                    return false;
                }
                //检查余额是否充足
                let user_balance = -1;
                if (write_order_info.pay_info.bystages_code === 'wx_0_balance') {
                    user_balance = this.$store.state.user_info.wx_0_balance;
                } else if (write_order_info.pay_info.bystages_code === 'wx_235_balance') {
                    user_balance = this.$store.state.user_info.wx_235_balance;
                }
                if (parseFloat(user_balance) < this.order_price && user_balance !== -1) {
                    this.$toast("余额不足");
                    return false;
                }
                if (this.$store.state.address_list.length < 1) {
                    this.$toast("您需要添加一个收货地址");
                    return false;
                }
                //检查余额分类是否满足
                let cat_flag = true;
                this.$store.state.carts_selected.forEach(item => {
                    if (item.cat_id !== write_order_info.pay_info.bystages_cat_id && write_order_info.pay_info.bystages_cat_id !== 0) {
                        cat_flag = false;
                    }
                });
                if (!cat_flag) {
                    this.$toast("订单中的商品不能使用该类型余额支付");
                    return false;
                }
                this.$dialog.confirm({
                    message: '当前支付方式为：' + write_order_info.pay_info.pay_name + '(' + write_order_info.pay_info.bystages_val + ')，提交订单后不可更改，请确认'
                }).then(() => {
                    let toast1 = this.$toast.loading({
                        mask: true,
                        message: '正在为您生成订单',
                        duration: 0
                    });
                    this.$post('user_submit_order?XDEBUG_SESSION_START=12355', {
                        user_token: this.$store.getters.getUserToken,
                        pay_id: this.$store.state.write_order_info.pay_info.pay_id,
                        pay_code: this.$store.state.write_order_info.pay_info.pay_code,
                        bystages_id: this.$store.state.write_order_info.pay_info.bystages_id,
                        coupon_id: this.$store.state.write_order_info.coupon_id,
                        invoice_info: this.$store.state.write_order_info.invoice_info,
                        use_integral_number: this.$store.state.write_order_info.use_integral,
                        goods_list: this.$store.state.carts_selected
                    })
                        .then((msg) => {
                           /* //删除购物车
                            this.$store.state.carts_selected.forEach(item => {
                                this.$store.commit('delCart', item);
                            });
                            this.$router.push('/seeOrder/' + msg);*/
                            //
                            toast1.clear();
                        })


                }).catch(() => {

                });


            }
            /**
             * 获取地址列表
             * @param state
             */
            , getAddressList(user_token) {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '获取地址列表',
                    duration: 0
                });
                this.$fetch('user_get_address', {user_token: user_token})
                    .then((msg) => {
                        this.$set(this.$store.state, 'address_list', msg);
                        this.getAddressList_load = true;
                        toast1.clear();
                    })
            }

            /**
             * 获取优惠券列表
             * @param state
             */
            , getCouponList(user_token) {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '获取优惠券列表',
                    duration: 0
                });
                this.$fetch('user_get_coupon_list', {user_token: user_token})
                    .then((msg) => {
                        if (msg) {
                            this.$set(this.$store.state, 'coupon_list', msg);
                            this.getCouponList_load = true;
                            toast1.clear();
                        }

                    })
            }
            /**
             * 获取用户信息
             * @param context
             * @param user_token
             */
            , getUserInfo(user_token) {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '获取用户信息',
                    duration: 0
                });
                this.$fetch('user_get_user_info', {user_token: user_token})
                    .then((msg) => {
                        this.$set(this.$store.state, 'user_info', msg);
                        this.getUserInfo_load = true;
                        toast1.clear();
                    })

            }
            /**
             * 获取支付列表
             * @param context
             * @param login_type
             */
            , getPayList(user_token) {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '获取支付列表',
                    duration: 0
                });
                this.$fetch('user_get_pay_list', {user_token: user_token})
                    .then((msg) => {
                        this.$set(this.$store.state, 'pay_list', msg);
                        this.getPayList_load = true;
                        toast1.clear();
                    })

            }

        },
        components: {
            myNarBar,//头部组件
            payOption,//支付选项
            GoodsList,//商品列表
            invoice,//开票
            couponOption,//优惠券选择
            integralOption,//积分使用
            orderList//费用清单
        }
        ,
    }
    ;
</script>

<style lang="scss" scoped>
	.d {
		margin-top: 20px;
		width: 100%;
		height: 50px;
	}

	.button-box {
		width: 100%;
		height: 50px;
		bottom: 0;
		position: fixed;
		display: flex;
		box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.1);

		.button-box-l {
			height: 100%;
			flex: 2;
			line-height: 50px;
			padding-left: 15px;
			font-size: 24px;
			background-color: white;
			font-weight: bold;
			color: red;

			span {
				font-size: 16px;
			}
		}

		.button-box-r {
			flex: 1;
		}
	}
</style>