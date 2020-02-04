<template>
	<div class="main">
		<div class="coupon-box" @click="getCoupon(coupon_info.coupon_id,already_get)">
			<div class="coupon-head">
				<div class="coupon-head-l">
					<div class="coupon-cut-sum">{{this.coupon_info.cut_sum}}<span>元</span></div>
					<p class="coupon-found_sum">满{{this.coupon_info.found_sum}}元</p>
				</div>
				<div class="coupon-head-r">
					<p class="coupon-name">{{this.coupon_info.coupon_name}}</p>
					<p class="coupon-grant-time">有效日期：{{this.coupon_info.start_use_time.substring(0,10)}} -
						{{this.coupon_info.end_use_time.substring(0,10)}}</p>
				</div>
			</div>
			<p class="coupon-desc">{{this.coupon_info.coupon_desc}}</p>
			<van-progress
				v-if="view_number"
				:pivot-text="'已领:' + already_get + '%'"
				color="#f44"
				:percentage="already_get"
			/>
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props: {
            coupon_info: Object,
            allow_get: Boolean,
            view_number: Boolean,
        },
        computed: {
            //已抢优惠券百分比
            already_get: {
                get: function () {
                    if (this.view_number) {
                        let get_coupon_number = parseInt(this.coupon_info.coupon_number) - parseInt(this.coupon_info.coupon_remainder_number);
                        let get_coupon_number_ = (get_coupon_number / parseInt(this.coupon_info.coupon_number)).toFixed(3);
                        return parseInt(parseFloat(get_coupon_number_.substring(0, get_coupon_number_.lastIndexOf('.') + 3) * 100).toFixed(0));
                    } else {
                        return false;
                    }

                }
            }
        },
        created() {

        },
        methods: {
            getCoupon(coupon_id, already_get) {
                if (!this.allow_get) {
                    return false;
                }
                if (already_get >= 100) {
                    this.$toast("已经领光啦，下次再来吧");
                    return false;
                } else {
                    let toast1 = this.$toast.loading({
                        mask: true,
                        message: '领取中...',
                        duration: 0
                    });
                    this.$post('user_get_coupon', {coupon_id: coupon_id, user_token: this.$store.getters.getUserToken})
                        .then((msg) => {
                            toast1.clear();
                            if (msg === "领券成功") {
                                this.coupon_info.coupon_remainder_number = parseInt(this.coupon_info.coupon_remainder_number) - 1;
                            }
                            this.$toast(msg);
                        })
                }
            },
        },
    };
</script>
<style lang="scss" scoped>
	.coupon-box {
		padding: 10px;
		width: 85%;
		margin-left: 5%;
		border-radius: 4px;
		background-color: #fff;
		overflow: hidden;
		margin-top: 10px;
		margin-bottom: 10px;
		border: 1px solid rgba(0, 0, 0, .1);

		.coupon-head {
			height: 85px;
			display: flex;

			.coupon-head-l {
				flex: 1;

				.coupon-cut-sum {
					padding: 7px 15px;
					color: #f44;
					font-size: 36px;
					height: 50px;
					font-weight: 500;
					line-height: 50px;

					span {
						font-size: 12px;
					}
				}

				.coupon-found_sum {
					font-size: 12px;
					line-height: 16px;
					color: #969799;
					padding: 0px 15px;
				}
			}

			.coupon-head-r {
				flex: 2;

				.coupon-name {
					padding: 7px 15px;
					height: 50px;
					font-weight: 500;
					line-height: 50px;
					font-size: 18px;
				}
				.coupon-grant-time {
					font-size: 10px;
					line-height: 16px;
					color: #969799;
				}
			}
		}

		.coupon-desc {
			height: 20px;
			font-size: 12px;
			line-height: 20px;
			color: #969799;
			padding: 7px 15px;
			border-top: 1px dashed #ebedf0;
			background-color: #fafafa;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

	}
</style>