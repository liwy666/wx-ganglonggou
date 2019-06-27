<template>
	<div class="pc-login-main">
	</div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        computed: {},
        created() {
            this.pcLogin();
        },
        methods: {
            pcLogin() {
                let code = this.$route.query.gl_code;
                let token = this.$store.getters.getUserToken;
                if (code) {
                    let toast1 = this.$toast.loading({
                        mask: true,
                        message: '授权中',
                        duration: 0
                    });
                    this.$post('wx_write_pc_token', {user_token: token, code: code})
                        .then((msg) => {
                            toast1.clear();
                            if (msg) {
                                this.loginSuccess();
                            } else {
                                this.loginError();
                            }

                        })
                } else {
                    this.loginError();
                }


            },
            /*获取URL参数*/
            GetQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
            , loginSuccess() {
                this.$dialog.alert({
                    title: '授权登录',
                    message: '授权登录成功，当然您也可以在手机预览岗隆购'
                }).then(() => {
                    this.$router.push('/');
                })
            }
            , loginError() {
                this.$dialog.alert({
                    title: '授权登录',
                    message: '抱歉！授权登录失败，您需要重新扫描一下二维码'
                }).then(() => {
                    this.$router.push('/');
                })
            }
        },
    };
</script>
<style lang="scss" scoped>
</style>