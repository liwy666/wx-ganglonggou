<template>
	<div class="mall-notice-main">
		<div class="left">岗隆商城</div>
		<div class="right">
			<div class="item" v-for="(item,i) in notice_list" :key="i"><i>{{item.slice(0,1)}}</i>{{item}}</div>
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props: {
            data: Object
        },
        computed: {
            notice_list: {
                get: function () {
                    return this.data.text.split('|');
                }
            }
        },
        created() {

        },
        methods: {},
    };
</script>
<style lang="scss" scoped>
	.mall-notice-main {
		box-sizing: border-box;
		width: 95%;
		margin: 0 auto;
		margin-top: 20px;
		display: flex;
		background-color: white;
		padding: 5px;
		height: 30px;
		line-height: 30px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;

		.left {
			width: 30%;
			font-size: 14px;
			font-weight: bolder;
			text-align: right;
			color: rgb(255, 55, 48);
			letter-spacing: 3px;
			//border-right: 1px solid rgb(200, 200, 200);
		}

		.right {
			display: flex;

			.item {
				font-size: 12px;
				display: flex;
				margin-left: 5px;

				i {
					border: 1px solid #007aff;
					color: #007aff;
					font-style: normal;
					border-radius: 50%;
					display: block;
					width: 15px;
					height: 15px;
					text-align: center;
					line-height: 15px;
					margin-top: 5px;
				}
			}
		}
	}
</style>