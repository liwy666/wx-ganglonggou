<template>
  <div class="prompt-goods-page-main">
    <lucency-nav-bar title-name="现货专区"/>
    <prompt-goods-page :api-base-url="apiBaseUrl"
                       :head-open="true"
                       @goods-card-click="goodsCardClick"
    />
  </div>
</template>

<script>
   import lucencyNavBar from "../sub/lucencyNavBar";
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
            'lucency-nav-bar': lucencyNavBar,
        }
    }
</script>

<style scoped lang="scss">
  .prompt-goods-page-main {

  }
</style>