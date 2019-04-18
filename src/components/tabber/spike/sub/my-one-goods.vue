<template>
	<div class="main" @click="toGoods">
		<div class="goods-box">
			<div class="goods-one">
				<van-card
								:price="goods_info.shop_price"
								:origin-price="goods_info.market_price"
								:title="goods_info.goods_name"
								:thumb="goods_info.goods_img"
				/>
			</div>
			<md-progress
							:size="100"
							:value="current_rate"
							:width="5"
							color="#cc0001"
							transition
			>
				<span class="progress-value">{{this.circle_text}}</span>
			</md-progress>
		</div>
		<countDown :end_time="goods_info.promote_end_date"></countDown>
	</div>
</template>

<script>
    import countDown from '../../../sub/my-count-down';
    export default {
        data() {
            return {
                current_rate2: 0,
                time : '',
                flag : false
            };
        },
        props: ["goods_info"],
        computed: {
            current_rate: {
                get: function () {
                    return (parseInt(this.goods_info.goods_number) / parseInt(this.goods_info.promote_price));
                },
                set() {
                }
            },
            circle_text: {
                get: function () {
                    return "剩余：" + parseInt(this.current_rate * 100) + '%';
                }
            },
        },

        created() {
				
        },
        methods: {
            toGoods(){
                this.$router.push('goods/'+this.goods_info.goods_id)
            }
        },
        components: {
            countDown,//秒杀倒计时
        },
    };
</script>

<style lang="scss" scoped>
	.main {
		margin-bottom: 15px;
		.goods-box {
			width: 100%;
			display: flex;
			background-color: white;
			padding-top: 10px;
			.goods-one {
				width: 70%;
				margin-top: 10px;
				.van-card{
					background-color: white;
				}
			}
		}
	}
</style>
<style lang="scss">
	.rolling-container {
		position: relative;
		svg{
			width: 100px !important;
			height: 100px !important;
		}
		.content {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			height: 50px;
			width: 100px;
			
			.progress-value {
				display: block;
				width: 100%;
				height: 100%;
				text-align: center;
				font-size: 14px;
				line-height: 50px;
			}
		}
		
	}
</style>