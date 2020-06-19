<template>
  <div class="binding-phone">
    <my-nar-bar title="手机号绑定"/>
    <mobile-number-binding :api-base-url="apiBaseUrl" :user-token="userToken" @success-callback="successCallback"/>
  </div>
</template>

<script>
    import MobileNumberBinding from 'ganglonggou-mobile-number-binding/dist/ganglonggou-mobile-number-binding.common';
    import 'ganglonggou-mobile-number-binding/dist/ganglonggou-mobile-number-binding.css'
    import myNarBar from './sub/my-nav-bar';

    export default {
        name: "BindingPhone",
        data() {
            return {
                apiBaseUrl: process.env.VUE_APP_API_URL + '/',
            }
        },
        computed: {
            userToken: {
                get: function () {
                    return this.$store.getters.getUserToken;
                }
            }
        },
        created() {
            console.log(this.apiBaseUrl);
        },
        methods: {
            successCallback() {
                const url = localStorage.getItem("beforeBindingPhoneUrl");
                if (!url || url.indexOf('/binding_phone') !== -1) {
                    this.$router.push('/index')
                } else {
                    localStorage.setItem("beforeBindingPhoneUrl", "/index");
                    this.$router.push(url)
                }
            }
        },
        components: {
            "mobile-number-binding": MobileNumberBinding,
            'my-nar-bar': myNarBar
        }
    }
</script>

<style scoped lang="scss">

</style>