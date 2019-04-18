<template>
	<div class="main">
		<van-cell title="充值类型" :label="desc" is-link @click="show = true"/>
		<van-popup v-model="show" position="bottom">
			<van-nav-bar
							right-text="收起"
							@click-right="show = false"
							title="充值类型"
			/>
			<div class="body">
				<p class="title">充值类型</p>
				<div class="switch_body">
					<span :class="['row-item',i=== 0 ? 'xz':'']" @click="TypeSwitch(0,'wx_0_balance','全场余额')">全场余额</span>
					<span :class="['row-item',i===1 ? 'xz':'']" @click="TypeSwitch(1,'wx_235_balance','文具类余额')">文具类余额</span>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                i: 0,
                desc: '全场余额',
            };
        },
        computed: {},
        created() {

        },
        methods: {
            TypeSwitch(i,type,desc) {
								this.i = i;
								this.desc = desc;
								this.$set(this.$store.state.recharge_info,'recharge_type',type);
            }
        },
    };
</script>

<style lang="scss" scoped>
	.main{
		.body{
			width: 100%;
			height: 450px;
			padding: 10px;
			overflow-y: auto;
			.title{
				font-size: 14px;
				margin-top: 10px;
			}
			.switch_body{
				margin-top: 10px;
				display: flex;
				flex-wrap: wrap;
				.row-item{
					height: 28px;
					line-height: 28px;
					font-size: 14px;
					margin-top: 5px;
					border-radius: 50px;
					margin-left: 20px;
					justify-content: flex-start;
					background-color: rgba(0,0,0,.1);
					padding-left: 20px;
					padding-right: 20px;
					box-sizing: border-box;
					border: 1PX solid rgba(0,0,0,0);
					transition: all ease 0.3s;
				}
				.xz{
					border: 1PX solid $main-color0;
					background-color: $main-color1;
					color: $main-color0;
				}
			}
			.form-box{
				height: 200px;
			}
			
		}
	}
</style>