<template>
  <div class="by-page-main">
    <my-nav-bar title="9.9包邮专区"/>
    <by-page :api-base-url="apiBaseUrl"
             :head-open="false"
             @goods-card-click="goodsCardClick"
    />
  </div>
</template>

<script>
    import myNavBar from '../sub/my-nav-bar'
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