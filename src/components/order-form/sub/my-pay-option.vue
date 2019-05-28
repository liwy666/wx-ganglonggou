<template>
	<div class="mian">
		<van-cell title="支付方式" :label="pay_desc" is-link @click="show = !show"/>
		<van-popup v-model="show" position="bottom" @open="iniIndex">
			<van-nav-bar
				right-text="收起"
				@click-right="show = !show"
				title="支付方式选择"
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
			<van-button type="danger" size="large" @click="preservePay"> 确 认</van-button>
		</van-popup>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                pay_code_index: 0,
                pay_desc: ''
            };
        },
        computed: {

            pay_list_: {
                get: function () {
                    return this.$store.state.pay_list;
                }
            },

            pay_list: {
                get: function () {
                    let result = [];
                    let user_info = this.$store.state.user_info;
                    /* wx_0_balance;
					 wx_235_balance*/
                    if (this.pay_list_.length > 0) {
                        this.pay_list_.forEach((item) => {
                            if (item.pay_name.indexOf('余额') !== -1) {
                                item.ByStages.forEach(item2 => {
                                    if (item2.bystages_code === 'wx_0_balance') {
                                        item2.bystages_val = item2.bystages_val + '(剩余' + user_info.wx_0_balance + '元)'
                                    } else if (item2.bystages_code === 'wx_235_balance') {
                                        item2.bystages_val = item2.bystages_val + '(剩余' + user_info.wx_235_balance + '元)'
                                    }
                                })
                            }
                            result.push(item)
                        });
                    }
                    return result;
                }
            },
            pay_byStages_index: {
                get: function () {
                    var result = [];
                    if (this.pay_list_ != null) {
                        this.pay_list_.forEach((item, i) => {
                            this.$set(result, i, 0);
                        });
                    }
                    return result;
                }
            },
            switch_index: {
                get: function () {
                    var result = [];
                    result["pay_code_key"] = 0;
                    result["pay_byStages_key"] = [];
                    if (this.pay_list_ != null) {
                        this.pay_list_.forEach((item, i) => {
                            this.$set(result["pay_byStages_key"], i, 0);
                        });
                    }
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
                this.switch_index["pay_byStages_key"].forEach((item, i) => {
                    this.pay_byStages_index[i] = item;
                });
                this.$forceUpdate();
            },
            preservePay() {
                this.switch_index["pay_code_key"] = this.pay_code_index;
                this.pay_byStages_index.forEach((item, i) => {
                    this.switch_index["pay_byStages_key"][i] = item;
                });
                this.getPayDescAndIniPayInfo();
                this.$forceUpdate();
                this.show = false;
            },
            getPayDescAndIniPayInfo() {
                this.pay_desc = this.pay_list_[this.switch_index["pay_code_key"]].pay_name;
                this.pay_desc += this.pay_list_[this.switch_index["pay_code_key"]].ByStages[this.switch_index["pay_byStages_key"][this.switch_index["pay_code_key"]]].bystages_val;
                let pay_info = {};
                pay_info.pay_id = this.pay_list_[this.switch_index["pay_code_key"]].pay_id;
                pay_info.pay_code = this.pay_list_[this.switch_index["pay_code_key"]].pay_code;
                pay_info.pay_name = this.pay_list_[this.switch_index["pay_code_key"]].pay_name;
                pay_info.bystages_id = this.pay_list_[this.switch_index["pay_code_key"]].ByStages[this.switch_index["pay_byStages_key"][this.switch_index["pay_code_key"]]].bystages_id;
                pay_info.bystages_val = this.pay_list_[this.switch_index["pay_code_key"]].ByStages[this.switch_index["pay_byStages_key"][this.switch_index["pay_code_key"]]].bystages_val;
                pay_info.bystages_code = this.pay_list_[this.switch_index["pay_code_key"]].ByStages[this.switch_index["pay_byStages_key"][this.switch_index["pay_code_key"]]].bystages_code;
                pay_info.bystages_fee = this.pay_list_[this.switch_index["pay_code_key"]].ByStages[this.switch_index["pay_byStages_key"][this.switch_index["pay_code_key"]]].bystages_fee;
                pay_info.bystages_stage = this.pay_list_[this.switch_index["pay_code_key"]].ByStages[this.switch_index["pay_byStages_key"][this.switch_index["pay_code_key"]]].bystages_stage;
                pay_info.bystages_cat_id = this.pay_list_[this.switch_index["pay_code_key"]].ByStages[this.switch_index["pay_byStages_key"][this.switch_index["pay_code_key"]]].bystages_cat_id;
                //保存支付信息到pay_info
                this.$store.commit("setPayInfo", pay_info);
            }
        },
    };
</script>

<style lang="scss" scoped>
	.mian {
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