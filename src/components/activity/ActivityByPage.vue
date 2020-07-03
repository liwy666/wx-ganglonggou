<template>
  <div class="by-page-main">
    <by-page :api-base-url="apiBaseUrl"
             :head-open="false"
             @goods-card-click="goodsCardClick"
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
        methods: {
            goodsCardClick(goodsId) {
                this.$router.push(`goods/${goodsId}`);
            }
        }
    }
</script>

<style scoped lang="scss">
  .by-page-main {

  }
</style>