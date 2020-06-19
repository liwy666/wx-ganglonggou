<template>
  <div class="by-page-main">
    <classify-ad-info :parent-classify-id="parentClassifyId"
                      :api-base-url="apiBaseUrl"
                      :head-open="true"
                      @left-icon-click="$router.go(-1)"
                      @goods-card-click="goodsCardClick"/>
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
                parentClassifyId: 0,
            }
        },
        created() {
            this.parentClassifyId = this.$route.query.id;
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