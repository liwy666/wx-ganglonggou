<template>
    <transition name="img-transition"
                enter-active-class="animated fadeInRightBig"
                leave-active-class="animated bounceOutLeft">
        <div class="one-cart-main" v-show="!delete_is">
            <div class="one-cart-box">
                <div class="switch-box">
					<van-checkbox v-model="cart_info.selected" click="onInput(cart_info.cart_is)" :checked-color="$MyCommon.$main_color0"></van-checkbox>
                </div>

                <div class="card-box">
                    <van-card
                            @click="toGood(cart_info.goods_id)"
                            :price="cart_info.goods_price"
                            :tag="cart_info.cart_is === true ? '' : '失效'"
                            :desc="cart_info.attr_desc"
                            :title="cart_info.goods_name"
                            :thumb="cart_info.goods_attribute_img"
                    >
                        <div slot="tags">
                            <van-tag plain type="danger" v-if="cart_info.goods_stock < 20">
                                库存紧张:剩余{{this.cart_info.goods_stock}}件
                            </van-tag>
                            <van-tag plain type="danger" v-if="cart_info.goods_stock >= 20">库存充足</van-tag>
                        </div>
                    </van-card>
                    <div class="card-bottom">
                        <van-row>
                            <van-col span="12"></van-col>
                            <van-col span="12">
                                <van-stepper v-model="cart_info.goods_number" @change="updCartNumber" integer
                                             disable-input :max="cart_info.goods_stock"/>
                            </van-col>
                        </van-row>
                        <van-button size="mini" @click="deleteCart">删除</van-button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                delete_is: false
            };
        },

        props: ["cart_info"],

        created() {
        },
        methods: {
            deleteCart() {
                this.delete_is = true;
                this.$store.commit("delCart", this.cart_info);
            },
            onInput(cart_is) {
                if (cart_is) {
                    this.$store.commit("updCartSelected", this.cart_info);
                }
            },
            updCartNumber() {
                this.$set(this.cart_info,'goods_price',parseFloat(this.cart_info.one_goods_price * this.cart_info.goods_number).toFixed(2));
                this.$store.commit("updCartNumber", this.cart_info);
            },
            toGood(goods_id){
                this.$router.push('goods/'+goods_id);
            }
        },
    };
</script>

<style lang="scss" scoped>
    .one-cart-box {
        display: flex;
        align-items: center;
        width: 96%;
        margin-left: 2%;
        margin-top: 10px;

        .switch-box {
            flex: 1;

            .van-switch {
                font-size: 18px !important;
                margin-right: 5px;

                .van-switch__node {
                    z-index: 0 !important;
                }
            }
        }

        .card-box {
            flex: 11;
            border-radius: 5px;
            box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            .van-card {
                width: 100%;
                background-color: white;
             

                .van-card__footer {
                    .van-button {
                        margin-top: 10px;
                    }
                }

                .van-card__desc {
                    white-space: pre-wrap !important;
                    font-size: 10px;
                }
            }
            .card-bottom{
                background-color: white;
                text-align: right;
                button{
                  margin: 5px;
                }
            }
        }
       
    }
</style>