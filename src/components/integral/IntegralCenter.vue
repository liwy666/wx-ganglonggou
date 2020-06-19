<template>
  <div class="integral-center-main">
    <my-nav-bar title="积分中心"/>
    <div class="open"></div>
    <integral-center :user_token="userToken"
                     :buyCard="buyCard" :exchange="exchange"
                     :loginAdd="loginAdd" :morePath="morePath"
                     :howUse="howUse" :base_url="baseUrl"/>
  </div>
</template>

<script>
    import integralCenter from 'ganglonggou-integral-center/integral-center.common';
    import 'ganglonggou-integral-center/integral-center.css';
    import myNavBar from '../sub/my-nav-bar'

    export default {
        name: "IntegralCenter",//积分中心
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
            /**
             * 购礼品卡（跳转到积分卡商品页面）
             */
            buyCard() {
                this.$dialog.alert({
                    message: "线上购买暂未开放",
                });
            },
            /**
             * 激活礼品卡（跳转到礼品卡页面）
             */
            exchange() {
                this.$router.push('/card_activation');
            },
            /**
             *每日签到（跳转到每日签到页面）
             */
            loginAdd() {
                this.$router.push('/login_get_integral');
            },
            /**
             *赚积分
             */
            morePath() {
                this.$router.push('/more_get_integral');
            },
            /**
             * 积分如何使用
             */
            howUse() {
                this.$router.push('/how_use_integral');
            }
        },
        components: {
            "integral-center": integralCenter,
            'my-nav-bar': myNavBar
        }
    }
</script>

<style scoped lang="scss">
  .integral-center-main {
    .open {
      width: 100vw;
      height: 10px;
    }
  }
</style>