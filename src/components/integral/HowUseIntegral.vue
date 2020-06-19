<template>
  <div class="how-use-integral-main">
    <my-nav-bar title="怎样使用"/>
    <how-use-integral/>
  </div>
</template>

<script>
    import myNavBar from '../sub/my-nav-bar';
    import howUseIntegral from "ganglonggou-how-use-integral/how-use-integral.common"
    import 'ganglonggou-how-use-integral/how-use-integral.css'

    export default {
        name: "HowUseIntegral",//怎样使用积分
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
            'how-use-integral': howUseIntegral,
            'my-nav-bar': myNavBar
        }
    }
</script>

<style scoped lang="scss">

</style>