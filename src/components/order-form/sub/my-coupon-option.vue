<template>
  <div class="main">
    <!-- 优惠券单元格 -->
    <van-coupon-cell
        :coupons="thisAllowCoupons"
        :chosen-coupon="chosen_coupon"
        @click="show = true"
    />
    <!-- 优惠券列表 -->
    <van-popup v-model="show" position="bottom">
      <van-coupon-list
          show-close-button
          :show-exchange-bar="show_exchange_bar"
          :coupons="thisAllowCoupons"
          :chosen-coupon="chosen_coupon"
          :disabled-coupons="thisNotAllowCoupons"
          :close-button-text="thisAllowCoupons.length >0 ? '任性，不使用优惠券': '关闭' "
          @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                show_exchange_bar: false,
                chosen_coupon: -1,
                thisAllowCoupons: [],//可用优惠券
                thisNotAllowCoupons: []//不可用优惠券
            };
        },
        props: {
            allowCoupons: {
                type: Array,
                required: true,
            },
            notAllowCoupons: {
                type: Array,
                required: true,
            },
        },

        created() {
            if (this.allowCoupons.length > 0) {
                this.allowCoupons.forEach(coupon => {
                    this.thisAllowCoupons.push(this.formatCoupon(coupon));
                });
                this.onChange(0);
            }
            if (this.notAllowCoupons.length > 0) {
                this.notAllowCoupons.forEach(coupon => {
                    this.thisNotAllowCoupons.push(this.formatCoupon(coupon, "该笔订单使用条件不满足"));
                });
            }
        },
        methods: {
            /*切换优惠券*/
            onChange(index) {
                this.chosen_coupon = index;
                this.show = false;
                let coupon_info_ = {
                    coupon_id: -1,
                    coupon_info: {}
                };
                if (index === -1) {
                    this.$store.commit("setCouponInfo", coupon_info_);
                } else {
                    coupon_info_.coupon_id = this.thisAllowCoupons[index].coupon_id;
                    coupon_info_.coupon_info = this.thisAllowCoupons[index];
                    this.$store.commit("setCouponInfo", coupon_info_);
                }
            }
            /*格式化优惠券*/
            , formatCoupon(coupon, reason = "") {
                return {
                    id: coupon.coupon_id
                    , name: coupon.coupon_name
                    , cut_sum: coupon.cut_sum
                    , found_sum: coupon.found_sum
                    , grant_type: coupon.grant_type
                    , solo: coupon.solo
                    , classify: coupon.classify
                    , coupon_id: coupon.coupon_id
                    , condition: '单笔订单满' + coupon.found_sum + '元'
                    , startAt: this.$MyCommon.strToDateTime(coupon.start_use_time, 's')
                    , endAt: this.$MyCommon.strToDateTime(coupon.end_use_time, 's')
                    , description: coupon.coupon_desc
                    , value: parseFloat(coupon.cut_sum) * 100
                    , valueDesc: "减" + parseFloat(coupon.cut_sum)
                    , reason: reason
                    , unitDesc: "元"
                };
            },
        },
    };
</script>

<style lang="scss">
  .van-coupon-list__list {
    height: 500px !important;
  }
</style>