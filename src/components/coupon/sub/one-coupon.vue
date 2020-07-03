<template>
  <div class="coupon-item" @click="getCoupon">
    <div class="left-box">
      <div class="top"><span>¥</span>{{parseInt(couponInfo.cut_sum)}}</div>
      <div class="bottom">满{{parseInt(couponInfo.found_sum)}}元可用</div>
    </div>
    <div class="right-box">
      <div class="coupon-name-box">
        <div class="name-icon">{{iconName}}</div>
        <div class="coupon-name">
          {{couponInfo.coupon_name}}
        </div>
      </div>
      <div class="coupon-button-box">
        <div class="coupon-date" v-if="allowGet">
          {{couponInfo.start_grant_time.slice(0,10)}}至{{couponInfo.end_grant_time.slice(0,10)}}
        </div>
        <div class="coupon-date" v-else>
          {{couponInfo.start_use_time.slice(0,10)}}至{{couponInfo.end_use_time.slice(0,10)}}
        </div>
        <div class="coupon-button" v-if="allowGet">立即领取</div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'coupon-item',
        data() {
            return {
                iconName: "",
            };
        },
        props: {
            couponInfo: {
                type: Object,
                required: true
            },
            allowGet: {
                type: Boolean,
                default: true,
            },
        },
        created() {
            switch (this.couponInfo.grant_type) {
                case "all":
                    this.iconName = "全场通用券";
                    break;
                case "classify":
                    this.iconName = "指定类目券";
                    break;
                case "solo":
                    this.iconName = "指定商品券";
                    break;
                default:
                    this.iconName = "指定商品券";
            }
        },
        methods: {
            getCoupon() {
                if (!this.allowGet) return;
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '领取中...',
                    duration: 0
                });
                this.$post('user_get_coupon', {
                    coupon_id: this.couponInfo.coupon_id,
                    user_token: this.$store.getters.getUserToken
                })
                    .then((msg) => {
                        toast1.clear();
                        this.$toast(msg);
                    });
            },
        },
    };
</script>
<style lang="scss" scoped>
  .coupon-item {
    width: 389px;
    height: 100px;
    background-color: white;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, .1);
    display: flex;
    margin-bottom: 10px;

    .left-box {
      width: 125px;
      height: 100%;
      background: linear-gradient(90deg, #6a9be2, #6c87d8);
      overflow: hidden;
      color: white;

      .top {
        margin-top: 18px;
        font-size: 33px;
        text-align: center;
        font-weight: 700;

        span {
          font-size: 16px;
        }
      }

      .bottom {
        margin-top: 5px;
        text-align: center;
        font-size: 12px;
      }
    }

    .right-box {
      padding: 10px;
      box-sizing: border-box;
      width: 264px;
      height: 100%;
      font-size: 12px;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;

      .coupon-name-box {
        display: flex;
        align-items: center;
        height: 16px;
        width: 100%;

        .name-icon {
          height: 100%;
          padding: 1px 7px;
          background-color: #6291cf;
          color: white;
          font-size: 10px;
          border-radius: 500px;
        }

        .coupon-name {
          width: 60%;
          height: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-left: 5px;
          font-size: 10px;
        }
      }

      .coupon-button-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .coupon-date {
          font-size: 10px;
        }

        .coupon-button {
          line-height: 21px;
          font-size: 10px;
          text-align: center;
          color: white;
          border-radius: 110px;
          background: linear-gradient(90deg, #6a9be2, #6c87d8);
          height: 21px;
          width: 70px;
        }
      }
    }
  }
</style>