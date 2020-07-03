<template>
  <div class="main" v-if="this.user_info !== null">
    <myNarBar title="修改用户资料"></myNarBar>
    <van-uploader :after-read="onRead" :max-size="1000000" @oversize="overSize">
      <div class="user-img"><img :src="user_info.user_img" alt=""></div>
    </van-uploader>
    <van-cell-group>
      <van-field v-model="user_info.user_name" placeholder="请输入用户名" label="用户名" :error-message="user_name_error"/>
      <van-field v-model="user_info.phone" placeholder="" readonly label="手机号" :error-message="phone_error"/>
      <!--			<van-field v-model="user_info.email" placeholder="请输入用户名" label="邮箱号" :error-message="email_error"/>-->
      <van-button size="large" type="danger" @click="pudUserInfo">确认修改</van-button>
    </van-cell-group>
    <van-field :value="userToken" label="用户token" placeholder="" v-if="vueAppMode!=='production'"/>
  </div>
</template>

<script>
    import myNarBar from '../../../sub/my-nav-bar';

    export default {
        data() {
            return {
                user_name_error: '',
                phone_error: '',
                email_error: '',
                userToken: '',
                vueAppMode: process.env.VUE_APP_MODE,
            };
        },
        computed: {
            user_info: {
                get: function () {
                    let result = {};
                    if (this.$store.state.user_info !== null) {
                        result.user_img = this.$store.state.user_info.user_img;
                        result.user_name = this.$store.state.user_info.user_name;
                        result.phone = this.$store.state.user_info.phone;
                        result.email = this.$store.state.user_info.email;
                        return result;
                    } else {
                        return null;
                    }

                },
                set: function () {

                }
            }
        },
        created() {
            /*获取用户信息*/
            if (this.$store.state.user_info === null) {
                this.$store.dispatch("getUserInfo", this.$store.getters.getUserToken);
            }
            this.userToken = this.$store.getters.getUserToken;
        },
        activated() {
        },
        methods: {
            /*修改头像*/
            onRead(file) {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '正在为您上传图片',
                    duration: 0
                });
                let file2 = file.file;
                let param = new FormData(); //创建form对象
                param.append('portrait_img', file2, file2.name);//通过append向form对象添加数据
                this.$imgUpload('user_upd_portrait', param)
                    .then((msg) => {
                        if (msg) {
                            this.$set(this.user_info, 'user_img', msg.goods_img);
                            this.$forceUpdate();
                        }
                        toast1.clear();
                    })
            }
            ,
            /*验证图片大小*/
            overSize() {
                this.$toast("超出1M上传限制")
            }
            ,
            pudUserInfo() {
                if (this.user_info.user_name.length < 3 || this.user_info.user_name.length > 20) {
                    this.user_name_error = "名称长度不符合规范";
                    return false;
                } else {
                    this.user_name_error = "";
                }
                /* let mobileRegex = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
                 if (!mobileRegex.test(this.user_info.phone)) {
                     this.phone_error = "请输入正确手机号";
                     return false;
                 } else {
                     this.phone_error = "";
                 }
                 mobileRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                 if (!mobileRegex.test(this.user_info.email)) {
                     this.email_error = "请输入正确邮箱号";
                     return false;
                 } else {
                     this.email_error = "";
                 }*/

                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '正在修改个人信息',
                    duration: 0
                });
                this.$post('user_upd_info', {
                    user_token: this.$store.getters.getUserToken,
                    user_name: this.user_info.user_name,
                    user_img: this.user_info.user_img,
                    phone: this.user_info.phone,
                    email: this.user_info.email,
                })
                    .then((msg) => {
                        if (msg) {
                            //刷新用户信息
                            this.$store.dispatch("getUserInfo", this.$store.getters.getUserToken);
                            this.$router.go(-1);
                            this.$toast("修改成功");
                        }
                        toast1.clear();
                    })
            }
        },
        components: {
            myNarBar
        }
        ,
    }
    ;
</script>

<style lang="scss" scoped>
  .main {
    .user-img {
      width: 100%;
      height: 100px;
      text-align: center;
      margin: 10px;
      overflow: hidden;

      img {
        height: 100%;
      }
    }
  }
</style>