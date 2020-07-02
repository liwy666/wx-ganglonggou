<template>
  <div class="home-page">
    <personal-center :user_token="userToken"
                     :base_url="baseApiUrl"
                     :login_or_out_show="false"
                     @user_setting="userSetting"
                     @edit_user_information="userSetting"
                     @update_logo_img="userSetting"
                     @see_integral="seeIntegral"
                     @see_coupon="seeCoupon"
                     @see_order="seeOrder"
                     @see_address="seeAddress"/>
  </div>
</template>

<script>
    //personal-center
    import personalCenter from "ganglonggou-personal-center/personal-center.common";
    import 'ganglonggou-personal-center/personal-center.css';

    export default {
        name: "Home",
        data() {
            return {
                vueAppMode: process.env.VUE_APP_MODE,
                baseApiUrl: process.env.VUE_APP_API_URL + '/',
                userToken: "",
            }
        },
        created() {
            this.userToken = this.$store.state.user_token
        },
        methods: {
            //设置
            userSetting() {
                this.$router.push('./updateUserInfo');
            },
            //查看积分
            seeIntegral() {
                this.$router.push('/integral_center');
            },
            //查看优惠券
            seeCoupon() {
                this.$router.push('/couponList');
            },
            //查看订单
            seeOrder(typeCode) {
                switch (typeCode) {
                    case 0:
                        this.$router.push('/orderList/' + "全部");
                        break;
                    case 1:
                        this.$router.push('/orderList/' + "待付款");
                        break;
                    case 2:
                        this.$router.push('/orderList/' + "待收货");
                        break;
                    case 3:
                        this.$router.push('/evaluateList');
                        break;
                    case 4:
                        this.$router.push('/orderList/' + "售后");
                        break;
                    default:
                        this.$router.push('/orderList/' + "全部");
                }
            },
            //查看收货地址
            seeAddress() {
                this.$router.push('/addressList');
            }

        },
        components: {
            [personalCenter.name]: personalCenter,
        }
    }
</script>

<style scoped lang="scss">
  .home-page {

  }
</style>