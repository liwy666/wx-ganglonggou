<template>
  <div class="user-award-main">
    <my-nav-bar title="我的奖项"/>
    <user-award/>
  </div>
</template>

<script>
    import myNavBar from '../sub/my-nav-bar';
    import userAwards from "ganglonggou-user-award/user-awards.common"
    import 'ganglonggou-user-award/user-awards.css';

    export default {
        name: "UserAward",//我的奖项
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
            'user-award': userAwards,
            'my-nav-bar': myNavBar
        }
    }
</script>

<style scoped lang="scss">

</style>