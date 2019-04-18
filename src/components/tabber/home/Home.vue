<template>
	<div class="main">
		<div class="home-head">
			<div class="home-head-body">
				<div class="home-head-l">
					<div class="user-img"><img :src="user_info.user_img"></div>
					<div class="user-name">{{user_info.user_name}}</div>
				</div>
				<div class="home-head-r">
					<van-icon name="setting-o" color="white" size="30px" @click="$router.push('./updateUserInfo')"/>
				</div>
			</div>
			<div class="home-head-bottom">剩余{{this.$store.state.integral_name +'：'+this.user_info.integral}}</div>
		</div>
		<!--订单选项-->
		<orderOption></orderOption>
		<div class="option-body">
			<!--地址选项-->
			<van-cell title="地址列表" icon="location-o" is-link value="查看地址" to="/addressList"/>
			<!--优惠券选项-->
			<van-cell title="我的优惠券" icon="coupon-o" is-link value="查看拥有优惠券" to="/couponList"/>
			<!--余额选项-->
			<van-cell title="我的余额" icon="balance-pay" is-link value="查看我的余额" to="/balance"/>
		</div>
	</div>
</template>

<script>
    import orderOption from './sub/my-home-order-option';

    export default {
        data() {
            return {};
        },
        computed: {
            user_info: {
                get: function () {
                    return this.$store.state.user_info;
                }
            },
        },
        created() {
        },
        activated() {
            /*获取用户信息*/
            this.$store.dispatch("getUserInfo", this.$store.getters.getUserToken);
            /*获取订单信息*/
            this.$store.dispatch("getOrderList", this.$store.getters.getUserToken);
        },
        methods: {},
        components: {
            orderOption,//订单选项
        },
    };
</script>

<style lang="scss" scoped>
	.main {
		.home-head {
			background-color: $main-color0;
			height: 150px;
			width: 100%;
			
			.home-head-body {
				display: flex;
				height: 80%;
				
				.home-head-l {
					display: flex;
					height: 100%;
					align-items: center;
					margin-left: 20px;
					
					.user-img {
						border-radius: 50%;
						overflow: hidden;
						width: 60px;
						height: 60px;
						border: 4px solid $main-color2;
						
						img {
							width: 100%;
						}
					}
					
					.user-name {
						font-size: 20px;
						margin-left: 10px;
						color: white;
						font-weight: bold;
					}
				}
				
				.home-head-r {
					.van-icon {
						position: fixed;
						top: 20px;
						right: 20px;
						font-size: 25px !important;
					}
				}
			}
			
			.home-head-bottom {
				height: 20%;
				background-color: rgba(0, 0, 0, .2);
				color: white;
				text-align: center;
				line-height: 30px;
				font-size: 14px;
			}
			
		}
		
		.option-body {
			margin-top: 40px;
		}
	}
</style>