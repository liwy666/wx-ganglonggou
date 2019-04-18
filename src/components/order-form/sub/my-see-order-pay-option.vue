<template>
	<div class="mian">
		<van-cell title="支付方式" :label="pay_desc" is-link @click="show = !show"/>
		<van-popup v-model="show" position="bottom" @open="iniIndex">
			<van-nav-bar
							right-text="收起"
							@click-right="show = !show"
							title="支付方式切换"
			/>
			<div class="pay-option-body">
				<p class="pay-title">支付方式：</p>
				<div class="pay-code">
					<span :class="['pay-code-row-item row-item',i===pay_code_index ? 'xz':'']"
					      v-for="(item,i) in pay_list" :key="item.pay_id"
					      @click="payCodeSwitch(i)"
					>{{item.pay_name}}</span>
				</div>
				<p class="pay-title">分期方式：</p>
				<div class="pay-byStages" v-for="(item,i) in pay_list" :key="item.pay_id" v-show="pay_code_index === i">
					<span :class="['pay-byStages-row-item row-item',i2===pay_byStages_index[i] ? 'xz':'']"
					      v-for="(item2,i2) in item.ByStages"
					      :key="item2.bystages_id"
					      @click="payByStagesSwitch(i,i2)"
					>{{item2.bystages_val}}</span>
				</div>
			</div>
			<van-button type="danger" size="large" @click="preservePay">确认更换支付方式</van-button>
		</van-popup>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                pay_desc: '',
                pay_code_index: 0
            };
        },
        props: ["order_info"],
        computed: {
            pay_list: {
                get: function () {
                    return this.$store.state.pay_list;
                }
            },
            pay_byStages_index: {
                get: function () {
                    var result = [];
                    if (this.pay_list.length > 0) {
                        this.pay_list.forEach((item, i) => {
                            this.$set(result, i, 0);
                        });
                    }
                    return result;
                }
            },
            switch_index: {
                get: function () {
                    let result = [];
                    result["pay_code_key"] = 0;
                    result["pay_byStages_key"] = [];
                    if (this.pay_list.length > 0) {
                        this.pay_list.forEach((item, i) => {
                            if (item.pay_code === this.order_info.pay_code) {
                                result["pay_code_key"] = i;
                            }
                            let flag = true;
                            item.ByStages.forEach((item2, i2) => {
                                if (item2.bystages_id === this.order_info.bystages_id) {
                                    this.$set(result["pay_byStages_key"], i, i2);
                                    flag = false;
                                }
                            });
                            if (flag) {
                                this.$set(result["pay_byStages_key"], i, 0);
                            }
                        });
                    }
                    console.log(result);
                    return result;
                },
                set: function () {
                    this.pay_code_index = this.switch_key['pay_code_key']
                }
            },

        },
        created() {
            this.getPayDescAndIniPayInfo();
        },
        methods: {
            payCodeSwitch(i) {
                this.pay_code_index = i
            },
            payByStagesSwitch(i, i2) {
                this.pay_byStages_index[i] = i2;
                this.$forceUpdate();
            },
            iniIndex() {
                this.pay_code_index = this.switch_index["pay_code_key"];
                console.log(this.switch_index);
                this.switch_index["pay_byStages_key"].forEach((item, i) => {
                    this.pay_byStages_index[i] = item;
                });
                this.$forceUpdate();
            },
            preservePay() {
                if (parseFloat(this.order_info.original_order_price) <= 50 && this.pay_list[this.pay_code_index].ByStages[this.pay_byStages_index[this.pay_code_index]].bystages_stage !== 0) {
                    this.$toast('订单金额小于50元，不能使用分期付款');
                    return false;
                }
                this.$dialog.confirm({
                    title: '确认切换支付方式?',
                    message: '我们将重新为您计算订单价格'
                }).then(() => {
                    let toast1 = this.$toast.loading({
                        mask: true,
                        message: '切换中',
                        duration: 0
                    });
                    this.$post('user_upd_order_pay_mode', {
                        user_token: this.$store.getters.getUserToken,
                        order_sn: this.order_info.order_sn,
                        pay_code: this.pay_list[this.pay_code_index].pay_code,
                        bystages_id: this.pay_list[this.pay_code_index].ByStages[this.pay_byStages_index[this.pay_code_index]].bystages_id
                    })
                        .then(() => {
                            //计算订单价格
                            let after_using_pay_price = this.order_info.after_using_integral_price * this.pay_list[this.pay_code_index].ByStages[this.pay_byStages_index[this.pay_code_index]].bystages_fee;
                            this.order_info.after_using_pay_price = after_using_pay_price;
                            this.order_info.pay_name = this.pay_list[this.pay_code_index].pay_name;
                            this.order_info.pay_code = this.pay_list[this.pay_code_index].pay_code;
                            this.order_info.bystages_val = this.pay_list[this.pay_code_index].ByStages[this.pay_byStages_index[this.pay_code_index]].bystages_val;
                            this.switch_index["pay_code_key"] = this.pay_code_index;
                            this.pay_byStages_index.forEach((item, i) => {
                                this.switch_index["pay_byStages_key"][i] = item;
                            });
                            this.getPayDescAndIniPayInfo();
                            this.$forceUpdate();
                            this.show = false;
                            toast1.clear();
                        });
                }).catch(() => {
                    this.show = false;
                });
            },
            getPayDescAndIniPayInfo() {
                this.pay_desc = this.order_info.pay_name + this.order_info.bystages_val;
            }
        },
    };
</script>

<style lang="scss" scoped>
	.main {
		margin-top: 10px;
		
		.pay-option-body {
			width: 100%;
			height: 400px;
			padding: 10px;
			
			.pay-title {
				font-size: 14px;
				margin-top: 20px;
			}
			
			.pay-code {
				margin-top: 10px;
				display: flex;
				flex-wrap: wrap;
			}
			
			.pay-byStages {
				margin-top: 10px;
				display: flex;
				flex-wrap: wrap;
			}
			
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
	}
</style>