<template>
  <div class="more-get-integral-main">
    <my-nav-bar title="赚积分"/>
    <more-get-integral/>
  </div>
</template>

<script>
    import myNavBar from '../sub/my-nav-bar';
    import moreGetIntegral from "ganglonggou-more-get-integral/more-get-integral.common"
    import "ganglonggou-more-get-integral/more-get-integral.css"

    export default {
        name: "MoreGetIntegral",//赚积分
        data() {
            return {
                baseUrl: process.env.VUE_APP_API_URL + '/'
            }
        },
        computed: {
            userToken: {
                get: function () {
                    return this.$store.getters.getUserToken;
                }
            }
        },
        components: {
            'more-get-integral': moreGetIntegral,
            'my-nav-bar': myNavBar
        }
    }
</script>

<style scoped lang="scss">
  .more-get-integral-main {
    width: 100vw;
    height: 100vh;
    background-color: white;
  }
</style>