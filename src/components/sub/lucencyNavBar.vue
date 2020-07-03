<template>
  <div class="lucency-nav-bar" v-show="show">
    <div class="left" @click="$router.go(-1)">
      <van-icon name="arrow-left" color="white" size="18"/>
    </div>
    <div class="title-name">{{titleName}}</div>
    <div class="right"></div>
  </div>
</template>

<script>
    export default {
        name: "lucencyNavBar",
        data() {
            return {
                show: true,
            }
        },
        mounted() {
            window.document.addEventListener('scroll', () => {
                if (window.pageYOffset > 10 && this.show) {
                    this.show = false;
                } else if (window.pageYOffset <= 10 && !this.show) {
                    this.show = true;
                }
            })
        },
        props: {
            titleName: {
                type: String,
                required: true,
            }
        },
    }
</script>

<style scoped lang="scss">
  .lucency-nav-bar {
    display: flex;
    position: fixed;
    width: 100vw;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    box-sizing: border-box;

    .left {
      flex: 1;
      height: 100%;
      i {
        height: 100%;
        line-height: 50px;
      }
    }

    .title-name {
      height: 100%;
      flex: 2;
      color: white;
      text-align: center;
      font-size: 18px;
      font-weight: bolder;
      line-height: 50px;
    }

    .right {
      flex: 1;
    }
  }
</style>