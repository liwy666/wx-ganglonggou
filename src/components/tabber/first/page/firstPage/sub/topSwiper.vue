<template>
  <div class="top-swiper-main">
    <div class="some" v-if="data.length>1">
      <swiper :options="swiper_options" ref="topSwiper">
        <swiper-slide v-for="(item,i) in data" :key="item.id" :data_index="i">
          <div class="img-box"><img :src="item.ad_img" alt=""></div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="any" v-else>
      <div class="img-box"><img :src="data[0].ad_img" @click="toControl(data[0])" alt=""></div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                swiper_options: {
                    loop: true,
                    autoplay: true,
                }
            };
        },
        props: {
            data: Array,
            toControl: Function,
        },
        computed: {
            swiper() {
                return this.$refs.topSwiper.swiper;
            }
        },
        created() {

        },
        mounted() {
            // this.swiper的函数里的this指向swiper, 所以这里要定义一个_this指向vue
            let _this = this;
            this.swiper.on('click', function () {
                _this.toSonControl(_this.data[this.clickedSlide.getAttribute('data_index')]);
            });
        },
        methods: {
            toSonControl(ad_info) {
                this.toControl(ad_info)
            }
        },
    };
</script>
<style lang="scss" scoped>
  .top-swiper-main {
    margin-top: -2px;
    margin-bottom: 5px;
    background-image: url("https://mate.ganglonggou.com/lib/images/wx_first_top2_0812.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .img-box {
      text-align: center;
      margin-top: 5px;

      img {
        width: 95%;
        margin: 0 auto;
        //border-radius: 10px;
      }
    }

    .any {
      margin-top: -5px;
    }

  }
</style>