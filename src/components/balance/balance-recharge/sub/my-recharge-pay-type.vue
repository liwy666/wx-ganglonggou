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
				<p class="title">支付方式</p>
				<div class="switch_body">
					<span :class="['row-item',i=== i1 ? 'xz':'']" v-for="(item,i) in pay_list" :key="item.pay_id"
					      @click="TypeSwitch(i,0)">{{item.pay_name}}</span>
				</div>
				<div v-show="i=== i1" v-for="(item,i) in pay_list" :key="item.pay_id" style="visibility: hidden">
					<p class="title">分期方式</p>
					<div class="switch_body">
						<span :class="['row-item',i2=== i02 ? 'xz':'']" v-for="(item2,i02) in item.ByStages" :key="item2.i02"
						      @click="TypeSwitch(i,i02)">{{item2.bystages_val}}</span>
					</div>
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
                i1: 0,
                i2: 0,
            };
        },
        props: ["pay_list"],
        computed: {
            desc: {
                get: function () {
                    this.$store.state.recharge_info.pay_code = this.pay_list[this.i1].pay_code;
                    this.$store.state.recharge_info.bystages_id = this.pay_list[this.i1].ByStages[this.i2].bystages_id;
                    //return this.pay_list[this.i1].pay_name + this.pay_list[this.i1].ByStages[this.i2].bystages_val;
                    return this.pay_list[this.i1].pay_name;
                }
            }
        },
        created() {

        },
        methods: {
            TypeSwitch(i, i2) {
                this.i1 = i;
                this.i2 = i2;
            }
        },
    };
</script>

<style lang="scss" scoped>
	.main {
		.body {
			width: 100%;
			height: 450px;
			padding: 10px;
			overflow-y: auto;
			
			.title {
				font-size: 14px;
				margin-top: 10px;
			}
			
			.switch_body {
				margin-top: 10px;
				display: flex;
				flex-wrap: wrap;
				
				.row-item {
					height: 28px;
					line-height: 28px;
					font-size: 14px;
					margin-top: 5px;
					border-radius: 50px;
					margin-left: 20px;
					justify-content: flex-start;
					background-color: rgba(0, 0, 0, .1);
					padding-left: 20px;
					padding-right: 20px;
					box-sizing: border-box;
					border: 1PX solid rgba(0, 0, 0, 0);
					transition: all ease 0.3s;
				}
				
				.xz {
					border: 1PX solid $main-color0;
					background-color: $main-color1;
					color: $main-color0;
				}
			}
			
			.form-box {
				height: 200px;
			}
			
		}
	}
</style>