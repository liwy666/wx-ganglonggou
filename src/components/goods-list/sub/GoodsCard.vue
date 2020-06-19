<template>
  <div class="goods-card-main" @click="$emit('goods-card-click',goodsInfo.goods_id)">
    <img class="goods-img" :src="goodsInfo.goods_img" :alt="goodsInfo.goods_img">
    <div class="goods-name">{{goodsInfo.goods_name}}</div>
    <div class="goods-price-box">
      <div class="goods-price"><span>¥</span><span class="main">{{goodsInfo.shop_price}}</span></div>
      <img class="shop-car" src="./../../../assets/images/car_icon.png" alt="./../../../assets/images/car_icon.png">
    </div>
  </div>
</template>

<script>
    export default {
        name: "GoodsCard",
        props: {
            goodsInfo: {
                type: Object,
                required: true,
            }
        },
        methods: {},
    }
</script>

<style scoped lang="scss">
  .goods-card-main {
    width: 192px;
    height: 290px;
    margin-top: 10px;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;

    .goods-img {
      width: 192px;
      height: 192px;
      overflow: hidden;
      display: block;
    }

    .goods-name {
      font-size: 12.39px;
      text-align: left;
      padding: 0 12px;
      margin-top: 8px;
      color: #727171;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .goods-price-box {
      padding: 0 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;

      .goods-price {
        color: #f02419;
        font-size: 15px;

        .main {
          margin-left: 1px;
          font-size: 20.99px;
        }
      }

      .shop-car {
        width: 16px;
        height: 16px;
      }
    }
  }
</style>