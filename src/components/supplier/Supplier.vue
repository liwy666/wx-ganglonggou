<template>
  <div class="main"
       :style="'background-image: linear-gradient(135deg,'+this.supplier_info.colour+',rgb(255,255,255));'">
    <div class="head-box">
      <div class="logo"><img :src="supplier_info.logo_img" alt=""></div>
      <div class="name">
        <p class="supplier-name">{{this.supplier_info.supplier_name}}</p>
        <p class="company-name">{{this.supplier_info.company_name}}</p>
      </div>
      <div class="read">
        <p>宝贝描述：{{this.supplier_info.describe_rate}}</p>
        <p>服务评分：{{this.supplier_info.service_rate}}</p>
        <p>物流评分：{{this.supplier_info.logistics_rate}}</p>
      </div>
    </div>
    <div class="tel-box">
      <p>
        <van-icon name="phone-o"/>
        服务热线：{{this.supplier_info.service_tel}}
      </p>
      <p>
        <van-icon name="service-o"/>
        售后热线：{{this.supplier_info.after_sale_tel}}
      </p>
    </div>
    <div class="goods-list-box">
      <div class="tab">
        <i :class="active===0? 'xz':''" @click="switchTab(0)">综合</i>
        <i :class="active===1? 'xz':''" @click="switchTab(1)">价格
          <van-icon v-show="price_flag" :color="active===1? 'red':''" name="ascending"/>
          <van-icon v-show="!price_flag" :color="active===1? 'red':''" name="descending"/>
        </i>
        <i :class="active===2? 'xz':''" @click="switchTab(2)">销量</i>
        <i :class="active===3? 'xz':''" @click="switchTab(3)">新品</i>
      </div>
      <div class="base">
        <transition-group class="base" name="flip-list">
          <div class="goods-cart" v-for="(item) in screen_goods_list" :key="item.goods_id"
               @click="$router.push({ path: '/goods/'+item.goods_id, query: { goods_info: JSON.stringify(item) }})">
            <div class="goods-img"><img v-lazy="item.goods_img" alt=""></div>
            <div class="goods-name">{{item.goods_name}}</div>
            <div class="goods-price">￥{{item.shop_price}}</div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
    import myNarBar from '../sub/my-nav-bar';

    export default {
        name: "supplier",
        data() {
            return {
                supplier_info: {},
                goods_list_: [],
                active: 0,
                screen_goods_list: [],
                price_flag: true
            };
        },
        computed: {
            goods_list: {
                get: function () {
                    let result = [];
                    this.goods_list_.forEach(item => {
                        if (item.supplier_id === this.supplier_info.id) {
                            result.push(item)
                        }
                    });
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
            'active': {
                'handler': function (new_val) {
                    switch (new_val) {
                        case 0:
                            this.$set(this, 'screen_goods_list', this.default_goods_list);
                            break;
                        case 1:
                            this.$set(this, 'screen_goods_list', this.price_goods_list);
                            break;
                        case 2:
                            this.$set(this, 'screen_goods_list', this.sales_volume_goods_list);
                            break;
                        case 3:
                            this.$set(this, 'screen_goods_list', this.new_goods_list);
                            break;
                    }
                },
                immediate: true,
            },
            'default_goods_list': function () {
                switch (this.active) {
                    case 0:
                        this.$set(this, 'screen_goods_list', this.default_goods_list);
                        break;
                    case 1:
                        this.$set(this, 'screen_goods_list', this.price_goods_list);
                        break;
                    case 2:
                        this.$set(this, 'screen_goods_list', this.sales_volume_goods_list);
                        break;
                    case 3:
                        this.$set(this, 'screen_goods_list', this.new_goods_list);
                        break;
                }
            },
            'price_flag': function (new_val) {
                console.log(new_val);
                switch (this.active) {
                    case 0:
                        this.$set(this, 'screen_goods_list', this.default_goods_list);
                        break;
                    case 1:
                        this.$set(this, 'screen_goods_list', this.price_goods_list);
                        break;
                    case 2:
                        this.$set(this, 'screen_goods_list', this.sales_volume_goods_list);
                        break;
                    case 3:
                        this.$set(this, 'screen_goods_list', this.new_goods_list);
                        break;
                }
            },
            '$store.state.goods_list': function (newVal) {
                this.$set(this, 'goods_list_', newVal);
            }
        },
        created() {

        },
        activated() {
            this.supplier_info = JSON.parse(this.$route.query.supplier_info);
            /*获取商品列表*/
            if (this.$store.state.goods_list.length < 1) {
                this.$store.dispatch("getGoodsList", this.$store.getters.getIntoType);
            } else {
                this.$set(this, 'goods_list_', this.$store.state.goods_list);
            }
        },
        methods: {
            switchTab(tab_active) {
                this.$set(this, 'active', tab_active);
                if (this.active === 1) {
                    this.$set(this, 'price_flag', !this.price_flag);
                }
            }
        },
        components: {
            myNarBar,//头部组件
        },
    };
</script>
<style lang="scss" scoped>
  .main {
    padding-bottom: 20px;

    .head-box {
      display: flex;
      height: 90px;
      justify-content: space-around;
      align-items: center;

      .logo {
        width: 80px;
        height: 80px;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      .name {
        .supplier-name {
          font-size: 14px;
          font-weight: bold;
          color: white;
        }

        .company-name {
          font-size: 12px;
          color: white;
        }
      }

      .read {
        color: white;
        font-size: 12px;
        border-left: 1px solid rgb(255, 255, 255);
        padding-left: 10px;
      }
    }

    .tel-box {
      p {
        color: white;
        font-size: 14px;
        padding-left: 5px;
        margin-bottom: 5px;
      }
    }

    .goods-list-box {
      width: 96%;
      margin-left: 2%;
      background-color: white;
      border-radius: 5px;
      overflow: hidden;

      .tab {
        display: flex;
        justify-content: space-around;
        background-color: #c8c9cc;

        i {
          font-size: 14px;
          font-style: normal;
          height: 30px;
          line-height: 30px;
          color: white;
          transition: all ease 0.2s;
        }

        .xz {
          color: red;
          font-size: 16px;

        }
      }

      .base {
        height: 520px;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;

        .goods-cart {
          width: 45%;
          margin-left: 3%;
          margin-top: 10px;

          .goods-img {
            width: 100%;
            overflow: hidden;

            img {
              width: 100%;
            }
          }

          .goods-name {
            border: 0px solid black;
            position: relative;
            box-sizing: border-box;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            flex-direction: column;
            align-content: flex-start;
            flex-shrink: 0;
            font-size: 11px;
            text-align: left;
            line-height: 17px;
            height: 36px;
            color: rgb(62, 62, 62);
            -webkit-line-clamp: 2;
            overflow: hidden;
          }

          .goods-price {
            padding-left: 5px;
            font-size: 12px;
            height: 18px;
            line-height: 18px;
          }
        }
      }
    }

    .flip-list-move {
      transition: transform 0.5s;
    }
  }
</style>