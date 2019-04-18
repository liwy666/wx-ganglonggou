<template>
    <div class="main">
        <myNarBar title="商品详情"></myNarBar>
        <!--头部商品轮播-->
        <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,i) in head_swipe" :key="item.img_url" @click="imgPreview(head_imgPreview,i)">
                <img v-lazy="item.img_url"/>
            </van-swipe-item>
        </van-swipe>
        <!--价格-->
        <div class="goods-price" v-if="parseInt(goods_info.promote_start_date * 1000) > parseInt( new Date().getTime()) || parseInt(goods_info.promote_end_date * 1000) < parseInt( new Date().getTime())">
            ￥{{goods_info.goods_price}}
        </div>
        <!--秒杀倒计时-->
        <div class="promote-price-box" v-if="parseInt(goods_info.promote_start_date * 1000) < parseInt( new Date().getTime()) && parseInt(goods_info.promote_end_date * 1000) > parseInt( new Date().getTime())">
            <!--价格-->
            <div class="goods-price">
                <div class="shop_price">{{goods_info.goods_price}}<span>元</span></div>
            </div>
            <!--倒计时-->
            <countDown :end_time="goods_info.promote_end_date"></countDown>
        </div>
        <!--商品名称-->
        <div class="goods-name">
            <van-tag type="danger">自营</van-tag>
            {{msg.goods_name}}
        </div>
        <!--积分信息-->
        <div class="integral-box" v-if="goods_info.give_integral_desc !==''">
           <!-- <van-tag plain type="danger">{{this.$store.state.integral_name}}</van-tag>-->
            {{goods_info.give_integral_desc}}
        </div>
        <!--库存、销量信息-->
        <van-row>
            <van-col span="8">快递:免运费</van-col>
            <van-col span="8">库存:{{msg.goods_number}}</van-col>
            <van-col span="8">销量:{{ sales_volume == null ? 0 : sales_volume }}</van-col>
        </van-row>
        <!--支付列表-->
        <myPayInfo :pay_list="msg.pay_lsit"></myPayInfo>
        <!--领券选择-->
        <myCouponOption :coupon_list="this.coupon_list"></myCouponOption>
        <!--规格选择-->
        <van-cell title="已选" :value="goods_info.attr_desc + ',' +goods_info.goods_number +'件'" is-link
                  @click="show_sku = !show_sku"/>
        <!--服务选择-->
        <myServiceOption></myServiceOption>
        <!--商品详情and用户评价-->
        <van-tabs>
            <van-tab title="商品详情">
                <myGoodsInfo :goods_desc="goods_desc"></myGoodsInfo>
            </van-tab>
            <van-tab :title="'用户评价(' + this.evaluate_count+')'">
                <myEvaluateList :goods_id="goods_id" :evaluate_count="this.evaluate_count"></myEvaluateList>
            </van-tab>
        </van-tabs>
        <div class="d"></div>
        l
        <!--商品导航栏-->
        <myGoodsAction @updShowSku="updShowSku"></myGoodsAction>
        <!--商品Sku展开栏-->
        <van-popup v-model="show_sku" position="bottom" overlay>
            <van-nav-bar
                    title="商品规格"
                    right-text="关闭"
                    @click-right="show_sku = !show_sku"
            />
            <myGoodsSku @updShowSku="updShowSku"></myGoodsSku>
        </van-popup>


    </div>
</template>

<script>
    import {ImagePreview} from 'vant';
    import myNarBar from '../sub/my-nav-bar';
    import myServiceOption from './sub/my-service-option'
    import myCouponOption from './sub/my-coupon-option'
    import myGoodsInfo from './sub/my-goods-info'
    import myEvaluateList from './sub/my-evaluate-list'
    import myGoodsSku from './sub/my-goods-sku'
    import myGoodsAction from './sub/my-goods-action'
    import myPayInfo from './sub/my-pay-info'
    import countDown from '../sub/my-count-down'
    import {commonShare} from "../../share";
    export default {
        data() {
            return {
                msg: "",
                goods_id: "",
                pay_info_swiper: {
                    slidesPerView: 3.5,
                    spaceBetween: 10,
                    //autoplay:true,
                },
                show_sku: false
            };
        },
        computed: {
            /*头部轮播*/
            head_swipe: {
                get: function () {
                    var result = "";
                    if (this.msg !== "") {
                        result = this.msg.goods_gallery;
                    }

                    return result;
                }
            },
            /*预览图片*/
            head_imgPreview: {
                get: function () {
                    var result = [];
                    if (this.msg !== "") {
                        this.msg.goods_gallery.forEach(item => {
                            result.push(item.img_url)
                        });
                    }
                    return result;
                }
            }
            /*商品销量*/
            , sales_volume: {
                get: function () {
                    var result = "";
                    if (this.msg !== "") {
                        result = this.msg.goods_sales_volume
                    }
                    return result;
                }


            }
            /*优惠券列表*/
            , coupon_list: {
                get: function () {
                    let result = "";
                    if (this.msg !== "") {
                        result = this.msg.coupon_list;
                    }
                    return result;
                }
            }
            /*评价数量*/
            , evaluate_count: {
                get: function () {
                    let reslut = 0;
                    if (this.msg !== "") {
                        reslut = this.msg.evaluate_count;
                    }
                    return reslut;
                }
            }
            /*商品详情图*/
            , goods_desc: {
                get: function () {
                    let reslut = [];
                    if (this.msg !== "" && this.msg.goods_desc !== "") {
                        var imgReg = /<img.*?(?:>|\/>)/gi;
                        //匹配src属性
                        var srcReg = /src=['"]?([^'"]*)['"]?/i;
                        var arr = this.msg.goods_desc.match(imgReg);
                        for (var i = 0; i < arr.length; i++) {
                            var src = arr[i].match(srcReg);
                            //获取图片地址
                            if (src[1]) {
                                reslut.push(src[1])
                            }
                        }
                    }
                    return reslut;
                }


            },
            /*商品详情*/
            goods_info: {
                get: function () {
                    if (this.msg !== "") {
                        return this.$store.getters.getGoodsInfo;
                    } else {
                        return {};
                    }
                }
            }
        },
        created() {
            this.goods_id = this.$route.params.goods_id;
            this.getGoodsInfo();
           
        },
        components: {
            myNarBar,//头部组件
            myServiceOption,//服务选择组件
            myCouponOption,//优惠券选择组件
            myGoodsInfo,//商品详情
            myEvaluateList,//商品评价
            myGoodsSku,//商品规格选择
            myGoodsAction,//商品导航栏
            myPayInfo,//支付列表
            countDown,//倒计时组件
        },
        methods: {
            getGoodsInfo() {
                this.$toast.loading({
                    mask: true,
                    message: '马上就来...',
                    duration: 0
                });
                this.$fetch('onegoods_v2/' + this.goods_id, {login_type: this.$store.getters.getLoginType})
                    .then((msg) => {
                        this.msg = msg;
                        //赋值goods_info
                        this.$store.commit("setGoodsInfo", msg);
                        this.$store.commit("initGoodsSku", msg);
                        let share_url = ("https://" + window.location.host + "/wx_glShopping?gl_goods_id="+this.goods_id);
                        commonShare(this, msg.goods_name,share_url,this.$store.state.goods_info.goods_attribute_img, '江苏岗隆数码科技有限公司');
                        this.$toast.clear();
                    })
            }
            , imgPreview(img_url, i) {
                ImagePreview({
                    images: img_url,
                    lazyLoad: true,
                    startPosition: i
                });
            }
            , updShowSku(flag) {
                this.show_sku = flag;
            }
        },
    };
</script>

<style lang="scss">
    .van-swipe {
        background-color: white;

        img {
            width: 100%;
        }
    }

    .goods-price {
        color: #FF0036;
        height: 36px;
        line-height: 36px;
        background-color: white;
        font-size: 18px;
        padding-left: 15px;
    }
    
    .promote-price-box{
        display: flex;
        .goods-price{
            width: 90%;
            background-image: linear-gradient(45deg,$main-color0,$main-color5);
            height: 50px;
            .shop_price{
                color: white;
                line-height: 50px;
                font-size: 26px;
                font-weight: bold;
                padding-left: 10px;
                span{
                    font-size: 12px;
                }
            }
        }
    }

    .goods-name {
        padding-top: 5px;
        background-color: white;
        font-size: 14px;
        color: #051B28;
        line-height: 20px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        max-height: 63px;
        -webkit-box-orient: vertical;
        -webkit-box-pack: center;
        overflow: hidden;
        word-break: break-all;
        padding-left: 10px;
        padding-right: 10px;
    }

    .van-row {
        background-color: white;

        .van-col {
            text-align: center;
            height: 30px;
            line-height: 30px;
            color: #7d7e80;
            font-size: 12px;
        }
    }

    .integral-box {
        background-color: white;
        height: 30px;
        padding: 10px;
        color: red;
    }

    .d {
        width: 100%;
        height: 50px;
    }
    .van-goods-action{
        z-index: 3;
    }
</style>