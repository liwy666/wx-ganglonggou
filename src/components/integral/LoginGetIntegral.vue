<template>
  <div class="login-get-integral-main">
    <my-nav-bar title="签到"/>
    <login-get-integral :base_url="baseUrl" :user_token="userToken" :getAwardsLog="getAwardsLog"/>
  </div>
</template>

<script>
    import myNavBar from '../sub/my-nav-bar';
    import loginGetIntegral from "ganglonggou-login-get-integral/login-get-integral.common"
    import 'ganglonggou-login-get-integral/login-get-integral.css'

    export default {
        name: "LoginGetIntegral",//签到得积分
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
        methods: {
            getAwardsLog() {
                this.$router.push('/user_award');
            }
        },
        components: {
            'my-nav-bar': myNavBar,
            'login-get-integral': loginGetIntegral,
        }
    }
</script>

<style scoped lang="scss">
  .login-get-integral-main {

  }
</style>
