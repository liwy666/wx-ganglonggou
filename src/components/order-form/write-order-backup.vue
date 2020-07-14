<template>
  <div class="write-order">
    <myNarBar title="订单详情"/>
    <div class="main" v-if="pageLoadComplete">
      <!--收货地址-->
      <van-contact-card
          :type="default_address===''? 'add' : 'edit'"
          :name="default_address.name +'（'+default_address.province+default_address.city+default_address.county+default_address.address_detail+'）'"
          :tel="default_address.tel"
          add-text="添加收货人"
          @click="updDefaultAddress()"
      />
      <!--商品列表-->
      <GoodsList/>
      <!--支付选项-->
      <payOption :pay-list="payList" :order-price="parseFloat(orderPrice)"/>
      <!--开票方式选项-->
      <invoice/>
      <!--优惠券选项-->
      <couponOption :not-allow-coupons="notAllowCoupons" :allow-coupons="allowCoupons"/>
      <!--积分使用-->
      <integralOption :user-integral-number="userIntegralNumber" :max-integral-number="maxIntegralNumber"/>
      <!--费用清单-->
      <orderList/>
      <div class="d"></div>
      <div class="button-box">
        <div class="button-box-l"><span>￥</span>{{this.orderPrice}}</div>
        <div class="button-box-r">
          <van-button type="danger" size="large" @click="submitOrder">提交订单</van-button>
        </div>
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
                pageLoadComplete: false,
                allowCoupons: [],//可用优惠券
                notAllowCoupons: [],//不可用优惠券,
                userIntegralNumber: 0,//用户持有积分数量
                maxIntegralNumber: 0,//最大可使用积分数量
                payList: [],
                submitGoodsList: [],
            };
        },
        computed: {
            default_address: {
                get: function () {
                    return this.$store.getters.getDefaultAddress;
                }
            },
            orderPrice: {
                get: function () {
                    return this.$store.state.write_order_info.order_price;
                }
            },
            goodsList: {
                get: function () {
                    return this.$store.getters.getCartsSelected;
                }
            }
        },
        created() {
            //初始化表单
            if (this.$route.query.init === true) {
                this.$set(this.$store.state, 'write_order_info', {
                    pay_info: {},//提交订单时用户选中的支付方式信息
                    invoice_info: {
                        invoice_head: "",
                        invoice_khh: "",
                        invoice_kpdz: "",
                        invoice_nsrsbh: "",
                        invoice_phone: "",
                        invoice_qymc: "",
                        invoice_type: "不开票",
                        invoice_yhzh: "",
                        invoice_zj: "",
                    },//提交订单时用户选中的开票方式信息
                    coupon_info: {},//提交订单时用户选中的优惠券信息
                    coupon_id: -1,//提交订单时用户选中的优惠券id
                    use_integral: 0,//使用积分数量
                    order_price: '0'//订单价格
                });
            }

            this.goodsList.forEach(item => {
                this.submitGoodsList.push({
                    goodsId: item['goods_id'],
                    goodsNumber: item['goods_number'],
                    skuId: item['sku_id']
                });
            });
            this.getSubmitOrderInfo();
        },
        methods: {
            updDefaultAddress() {
                if (this.$store.state.address_list.length === 0) {
                    this.$router.push({path: '/addressEdit', query: {address_edit: JSON.stringify({is_add: true,})}})
                } else {
                    this.$router.push({path: '/addressList', query: {go_back: true}});
                }
            },

            getSubmitOrderInfo() {
                const toast1 = this.$toast.loading({
                    mask: true,
                    message: '处理中',
                    duration: 0
                });
                this.$post("submit_order_back", {
                    'goodsItems': this.submitGoodsList,
                    'userToken': this.$store.getters.getUserToken
                }).then((data) => {
                    if (data) {
                        this.$set(this.$store.state, 'address_list', data['addressList']);
                        this.allowCoupons = data['couponList']['allow'];
                        this.notAllowCoupons = data['couponList']['notAllow'];
                        this.$set(this.$store.state, 'user_info', data['userInfo']);
                        this.payList = data['payList'];
                        this.userIntegralNumber = data['userInfo']['integral'];
                        this.maxIntegralNumber = data['allowIntegralNumber'];
                        this.pageLoadComplete = true;
                    }
                    toast1.clear();
                });
            },

            submitOrder() {
                let write_order_info = this.$store.state.write_order_info;
                if (this.$store.state.carts_selected.length < 1 || JSON.stringify(this.$store.state.user_info) === '{}') {
                    this.$toast("暂无法提交该订单，请稍后再试。或您已提交过订单，请前往个人中心查看");
                    return false;
                }
                if (this.$store.state.address_list.length < 1) {
                    this.$toast("您需要添加一个收货地址");
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
                    this.$post('user_submit_order', {
                        user_token: this.$store.getters.getUserToken,
                        pay_id: this.$store.state.write_order_info.pay_info.pay_id,
                        bystages_id: this.$store.state.write_order_info.pay_info.bystages_id,
                        coupon_id: this.$store.state.write_order_info.coupon_id,
                        invoice_info: this.$store.state.write_order_info.invoice_info,
                        use_integral_number: this.$store.state.write_order_info.use_integral,
                        goods_list: this.submitGoodsList
                    })
                        .then((msg) => {
                            if (msg) {
                                //删除购物车
                                this.$store.state.carts_selected.forEach(item => {
                                    this.$store.commit('delCart', item);
                                });
                                //刷新用户信息
                                this.$store.dispatch("getUserInfo", this.$store.getters.getUserToken);
                                //刷新订单表
                                this.$store.dispatch("getOrderList", this.$store.getters.getUserToken);
                                //导航到订单查看
                                this.$router.replace('/seeOrder/' + msg);
                            }
                            toast1.clear();
                        });
                }).catch(() => {

                });


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
  .write-order {
    .main {
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
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);

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
    }
  }

</style>