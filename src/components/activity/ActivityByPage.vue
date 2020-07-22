<template>
  <div class="by-page-main">
    <by-page :api-base-url="apiBaseUrl"
             :head-open="false"
             @goods-card-click="(goodsInfo)=>{this.$MyCommon.goodsCardClick(this,goodsInfo)}"
             @back-click="$router.go(-1)"
    />
  </div>
</template>

<script>
    /*9.9包邮专区*/
    export default {
        name: "ActivityByPage",
        data() {
            return {
                apiBaseUrl: process.env.VUE_APP_API_URL + '/',
            }
        },
    }
</script>

<style scoped lang="scss">
  .by-page-main {

  }
</style>