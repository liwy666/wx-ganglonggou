<template>
  <div class="by-page-main">
    <classify-ad-info :parent-classify-id="parentClassifyId"
                      :api-base-url="apiBaseUrl"
                      :head-open="false"
                      @left-icon-click="$router.go(-1)"
                      @goods-card-click="(goodsInfo)=>{this.$MyCommon.goodsCardClick(this,goodsInfo)}"/>
  </div>
</template>

<script>
    import myNavBar from '../sub/my-nav-bar'
    /*分类详情*/
    export default {
        name: "ActivityClassifyInfoPage",
        data() {
            return {
                apiBaseUrl: process.env.VUE_APP_API_URL + '/',
                parentClassifyId: 0,
            }
        },
        created() {
            this.parentClassifyId = this.$route.query.id;
        },
        methods: {
        },
        components: {
            'my-nav-bar': myNavBar,
        }
    }
</script>

<style scoped lang="scss">
  .by-page-main {

  }
</style>