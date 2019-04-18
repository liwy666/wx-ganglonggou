<template>
	<div class="main">
		<div class="coupon-box">
			<div class="coupon-head">
				<div class="coupon-head-l">
					<div class="coupon-cut-sum">{{this.coupon_info.cut_sum}}<span>元</span></div>
					<p class="coupon-found_sum">满{{this.coupon_info.found_sum}}元</p>
				</div>
				<div class="coupon-head-r">
					<p class="coupon-name">{{this.coupon_info.coupon_name}}</p>
					<p class="coupon-grant-time">有效日期：{{this.formatDate(this.coupon_info.start_use_time)}} -
						{{this.formatDate(this.coupon_info.end_use_time)}}</p>
				</div>
			</div>
			<p class="coupon-desc">{{this.coupon_info.coupon_desc}}</p>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: ["coupon_info"],
        computed: {},
        created() {

        },
        methods: {
            add0(m){
                return m<10?'0'+m:m
            },
            formatDate(now) {
                now = now * 1000;
                now = new Date(now);
                let year = now.getFullYear(),
                    month = now.getMonth() + 1,
                    date = now.getDate();
                return year + "-" + this.add0(month) + "-" + this.add0(date);
            }
        },
    };
</script>

<style lang="scss" scoped>
	.coupon-box {
		width: 90%;
		margin-left: 5%;
		height: 130px;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		background-color: #fff;
		overflow: hidden;
		margin-top: 10px;
		margin-bottom: 10px;
		
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
					font-size: 12px;
					line-height: 16px;
					color: #969799;
				}
			}
		}
		
		.coupon-desc {
			height: 20px;
			font-size: 12px;
			line-height: 12px;
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