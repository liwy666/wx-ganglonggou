<template>
  <div class="back-top-button" v-show="show" @click="backTop">

  </div>
</template>

<script>
    export default {
        name: "backTopButton",
        data() {
            return {
                show: false,
            }
        },
        mounted() {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 500 && !this.show) {
                    this.show = true;
                } else if (window.pageYOffset <= 500 && this.show) {
                    this.show = false;
                }
            })
        },
        methods:{
            backTop(){
                this.$toolFuntion.pageScrollY(0);
            }
        },
    }
</script>

<style scoped lang="scss">
  .back-top-button {
    width: 45px;
    height: 45px;
    background-image: url("../../assets/images/back_top_button.png");
    background-size: 100%;
    background-repeat: no-repeat;
    z-index: 999;
    position: fixed;
    bottom: 125px;
    right: 20px;
  }
</style>