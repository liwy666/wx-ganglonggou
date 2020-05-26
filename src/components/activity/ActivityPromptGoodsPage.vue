<template>
  <div class="prompt-goods-page-main">
    <my-nav-bar title="现货专区"/>
    <prompt-goods-page :api-base-url="apiBaseUrl"
                       :head-open="false"
                       @goods-card-click="goodsCardClick"
    />
  </div>
</template>

<script>
    import myNavBar from '../sub/my-nav-bar'
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
        components: {
            'my-nav-bar': myNavBar,
        }
    }
</script>

<style scoped lang="scss">
  .prompt-goods-page-main {

  }
</style>