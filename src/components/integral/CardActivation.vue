<template>
  <div class="card-activation-main">
    <my-nav-bar title="积分充值"/>
    <card-activation :user_token="userToken" :base_url="baseUrl" @activationCase="activationCase"/>
  </div>
</template>

<script>
    import CardActivation from "ganglonggou-card-activation/card-activation.common";
    import "ganglonggou-card-activation/card-activation.css";
    import myNavBar from '../sub/my-nav-bar'

    export default {
        name: "CardActivation",//积分充值
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
             * 确认激活后的响应事件
             * @param msg true是激活成功，false是激活失败
             */
            activationCase(msg) {
                if (msg) {
                    this.$dialog.alert({
                        message: '礼品卡激活成功',
                    })
                }
            }
        },
        components: {
            "card-activation": CardActivation,
            'my-nav-bar': myNavBar
        }
    }
</script>

<style scoped lang="scss">

</style>