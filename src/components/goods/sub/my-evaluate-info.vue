<template>
	<div class="main">
		<div class="evaluate-box">
			<div class="evaluate-user">
				<div class="evaluate-user-head">
					<div class="evaluate-user-head-l"><img :src="evaluate_info.user_img" alt=""></div>
					<div class="evaluate-user-head-m">
						<p class="evaluate-user-name">{{this.evaluate_info.user_name}}</p>
						<p><van-rate v-model="this.evaluate_info.rate" readonly/></p>
					</div>
					<div class="evaluate-user-head-r">
						{{this.evaluate_info.create_time.substring(0,10)}}
					</div>
				</div>
				<div class="evaluate-user-body">{{this.evaluate_info.evaluate_text}}</div>
				<div class="evaluate-desc">{{this.evaluate_info.sku_desc}}</div>
			</div>
			<div class="evaluate-img"></div>
			<div class="evaluate-admin" v-if="evaluate_info.parent_id !== 0">
				<span>&nbsp;&nbsp;&nbsp;&nbsp;岗隆数码：</span>

			</div>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {

						};
        },
        props:["evaluate_info"],
        created() {

        },
        methods: {},
    };
</script>

<style lang="scss" scoped>
	.evaluate-box{
		width: 95%;
		margin-left: 1%;
		box-shadow:0 0 4px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		padding: 5px 5px;
		background-color: white;
		margin-top: 5px;
		.evaluate-user{
			.evaluate-user-head{
				display: flex;
				align-items: center;
				padding: 5px;
				.evaluate-user-head-l{
					flex: 1;
					border-radius: 50%;
					overflow: hidden;
					img{
						width: 100%;
					}
				}
				.evaluate-user-head-m{
					margin-left: 5px;
					flex: 4;
					.evaluate-user-name{
						font-size: 12px;
						font-weight: bold;
					}
				}
				.evaluate-user-head-r{
					flex: 4;
					text-align: right;
					font-size: 10px;
					color: #969799;
				}
			}
			.evaluate-user-body{
				padding: 5px;
				font-size: 13px;
				color: #323233;
			}
			.evaluate-desc{
				padding: 5px;
				font-size: 12px;
				color: rgb(150,150,150);
			}
		}
		.evaluate-admin{
			border-top: 1PX solid rgba(0,0,0,0.1);
			font-size: 13px;
			color: #7d7e80;
			padding: 5px;
			span{
				color:rgb(235,0,51) ;
			}
		}

	}
</style>