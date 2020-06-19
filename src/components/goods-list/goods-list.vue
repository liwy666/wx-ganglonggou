<template>
  <div class="main">
    <div class="van-search-main">
      <van-search
          v-model="keyword"
          placeholder="请输入搜索关键词"
          showAction
          shape="round"
          action-text="返回"
          @click="goSearch"
          @cancel="$router.go(-1)"
      >
      </van-search>
      <div class="van-search-support"></div>
    </div>
    <button-bar :sort-type.sync="sortType"/>
    <van-list v-model="goodsLoading" :finished="goodsFinished" @load="getGoodsList">
      <div class="goods-list-box">
        <goods-card v-for="goodsItem in goodsList"
                    :key="goodsItem.goods_id"
                    :goods-info="goodsItem"
                    @goods-card-click="goodsCardClick"/>
      </div>
    </van-list>
    <back-top-button/>
  </div>
</template>
<script>
    import ButtonBar from "./sub/ButtonBar";
    import GoodsCard from "./sub/GoodsCard";
    import backTopButton from "../sub/backTopButton";

    export default {
        name: "goods-list",
        data() {
            return {
                keyword: "",
                sortType: "synthesize",//[synthesize,salesRise,priceRise,priceDown,new],
                goodsLoading: false,//是否正在加载商品
                goodsFinished: false,//是否加载完毕
                pageNumber: 1,
                limitNumber: 5,
                goodsList: [],
            };
        },
        created() {

        },
        activated() {
            this.keyword = this.$route.query.keyword;
            this.initPage();
        },
        watch: {
            'sortType': function (newVal) {
                this.initPage();
            }
        },
        methods: {
            /*手动搜索*/
            goSearch() {
                this.$router.replace('search');
            },
            /*初始化页面*/
            initPage() {
                this.goodsList = [];
                this.goodsLoading = false;
                this.goodsFinished = false;
                this.pageNumber = 1;
                this.getGoodsList();
            },
            /*获取商品列表*/
            getGoodsList() {
                this.goodsLoading = true;
                this.$fetch('search_goods', {
                    keyword: this.keyword,
                    page: this.pageNumber,
                    limit: this.limitNumber,
                    sortType: this.sortType
                }).then((data) => {
                    if (data.count <= this.goodsList.length + this.limitNumber) this.goodsFinished = true;
                    if (data.goodsList.length > 0) {
                        this.goodsList = this.goodsList.concat(data.goodsList);
                    }
                    this.pageNumber++;
                    this.goodsLoading = false;
                });
            },
            goodsCardClick(goodsId) {
                if (goodsId && goodsId > 0) {
                    this.$router.push({path: 'goods/' + goodsId});
                }
            },
        },
        components: {
            "button-bar": ButtonBar,
            'goods-card': GoodsCard,
            'back-top-button': backTopButton,
        }
    }
    ;
</script>
<style lang="scss" scoped>
  .main {
    .van-tabs--line {
      padding-top: 0 !important;
    }

    .van-search {
      //background-image: linear-gradient(45deg,$main-color0,$main-color2)!important;
    }

    .suspension-button-box {
      z-index: 100;
      position: fixed;
      right: 0;
      bottom: 0;

      .suspension-button {
        display: block;
        background-color: white;
        width: 40px;
        height: 40px;
        margin-bottom: 5px;
        border-radius: 50%;
        margin-right: 5px;
        border: 2px solid $main-color0;
        box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.9);

        i {
          width: 100%;
          height: 100%;
          line-height: 40px;
          text-align: center;
          font-size: 18px;
          color: $main-color0;
        }
      }
    }

    .goods-list-box {
      width: 394px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
</style>