<template>
	<h1></h1>
</template>

<script>
    export default {
        data() {
            return {};
        },
        created() {
            this.Login();
        },
        methods: {
            /*测试*/
            Login() {
                let test_app_appid = "1CIOOHCD70050101007F00000910CACD";
                let id = "fc196654571f8ba9a893350cbc40a59fceb615257d436a67";
                this.$toast.loading({
                    mask: true,
                    message: '登录中....',
                    duration: 0
                });
                this.$post('test_login', {test_app_appid: test_app_appid, id: id})
                    .then((msg) => {
                        if (msg) {
                            this.$store.commit("setUserToken", msg);
                            this.$toast.clear();
                            this.goBeforeLoginUrl();
                        } else {
                            this.$toast("发生登录错误，请尝试重新进入商城");
                        }
                    })
            },

            /*微信登录*/
         /*   Login() {
                var code_v = this.GetQueryString("code");
                var redirect_uri = encodeURIComponent(window.location.href);
                this.$store.state.login_type = 'wxgllogin';
                if (code_v === null) {
                    let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcdc792b2207365e6&redirect_uri=" +
                        redirect_uri +
                        "&response_type=code&scope=snsapi_userinfo&state=GANGLONG8888#wechat_redirect";
                    window.location.href = url;
                } else {
                    /!*用code去换取openid*!/
                    this.$toast.loading({
                        mask: true,
                        message: '登录中....',
                        duration: 0
                    });
                    this.$post('wxlogin', {code: code_v})
                        .then((msg) => {
                            if (typeof (msg) !== "undefined") {
                                this.$store.commit("setUserToken", msg);
                                this.$toast.clear();
                                this.goBeforeLoginUrl();
                            } else {
                                this.$toast("发生登录错误，请尝试重新进入商城");
                            }

                        })
                }
            },*/
            goBeforeLoginUrl() {
                let url = localStorage.getItem("beforeLoginUrl");
                if (!url || url.indexOf('/login') != -1) {
                    this.$router.push('/index')
                } else {
                    localStorage.setItem("beforeLoginUrl", "/index");
                    this.$router.push(url)
                }
            },
            /*获取URL参数*/
            GetQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>