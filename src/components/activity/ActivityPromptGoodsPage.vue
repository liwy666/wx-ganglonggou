<template>
  <div class="prompt-goods-page-main">
    <prompt-goods-page :api-base-url="apiBaseUrl"
                       :head-open="false"
                       @goods-card-click="(goodsInfo)=>{this.$MyCommon.goodsCardClick(this,goodsInfo)}"
                       @back-click="$router.go(-1)"
    />
  </div>
</template>

<script>
    export default {
        name: "ActivityPromptGoodsPage",
        data() {
            return {
                apiBaseUrl: process.env.VUE_APP_API_URL + '/',
            }
        },
        methods: {
            goodsCardClick(goodsId) {
                this.$router.push(`goods/${goodsId}`);
            }
        },
        components: {}
    }
</script>

<style scoped lang="scss">
  .prompt-goods-page-main {

  }
</style>