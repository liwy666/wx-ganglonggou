<template>
  <div class="pay-option-main">
    <van-cell title="支付方式" :label="payDesc" is-link @click="show = !show"/>
    <van-popup v-model="show" position="bottom">
      <van-nav-bar
          right-text="收起"
          @click-right="show = false"
          title="支付方式选择"
      />
      <div class="pay-option-body">
        <p class="pay-title">支付方式：</p>
        <div class="pay-code">
					<span :class="['pay-code-row-item row-item',i===payTypeIndex ? 'xz':'']"
                v-for="(item,i) in payList" :key="item.pay_id"
                @click="payTypeSwitch(i)"
          >{{item.pay_name}}</span>
        </div>
        <p class="pay-title">分期方式：</p>
        <div class="pay-byStages">
					<span :class="['pay-byStages-row-item row-item',i===byStagesIndex ? 'xz':'']"
                v-for="(item,i) in payList[payTypeIndex]['ByStages']"
                :key="item['bystages_id']"
                @click="byStagesSwitch(i)"
          >{{item.bystages_val}}</span>
        </div>
      </div>
      <van-button type="danger" size="large" @click="show = false"> 确 认</van-button>
    </van-popup>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                show: false,
                payTypeIndex: 0,
                byStagesIndex: 0,
                payDesc: '',
                integralPayCode: "IntegralPayment",
                inFullIntegralPayment: false,
            };
        },
        props: {
            payList: {
                type: Array,
                required: true,
            },
            orderPrice: {
                type: Number,
                required: true,
            }
        },
        watch: {
            "orderPrice": {
                immediate: true,
                handler: function (newVal) {
                    this.inFullIntegralPayment = newVal === 0;
                    let integralPayIndex = this.getIntegralPayIndex();
                    if (this.inFullIntegralPayment) {
                        if (integralPayIndex !== -1) {
                            this.payTypeIndex = integralPayIndex;
                            this.byStagesIndex = 0;
                            this.getPayDescAndIniPayInfo();
                        }
                    } else if (!this.inFullIntegralPayment && this.payTypeIndex === integralPayIndex) {
                        this.payTypeIndex = integralPayIndex === 0 ? 1 : 0;
                        this.byStagesIndex = 0;
                        this.getPayDescAndIniPayInfo();
                    }
                }
            },
            "show": function (newVal) {
                if (!newVal) {
                    this.getPayDescAndIniPayInfo();
                }
            }
        },
        created() {
            this.getPayDescAndIniPayInfo();
        },
        methods: {
            payTypeSwitch(index) {
                if (index === this.payTypeIndex) return;
                let integralPayIndex = this.getIntegralPayIndex();
                if (this.inFullIntegralPayment) return;
                if (!this.inFullIntegralPayment && index === integralPayIndex) return;
                this.payTypeIndex = index;
                this.byStagesIndex = 0;
            },
            byStagesSwitch(index) {
                if (index === this.byStagesIndex) return;
                this.byStagesIndex = index;
            },
            getPayDescAndIniPayInfo() {
                const payInfo = {
                    pay_id: this.payList[this.payTypeIndex].pay_id,
                    pay_code: this.payList[this.payTypeIndex].pay_code,
                    pay_name: this.payList[this.payTypeIndex].pay_name,
                    bystages_id: this.payList[this.payTypeIndex]['ByStages'][this.byStagesIndex].bystages_id,
                    bystages_val: this.payList[this.payTypeIndex]['ByStages'][this.byStagesIndex].bystages_val,
                    bystages_code: this.payList[this.payTypeIndex]['ByStages'][this.byStagesIndex].bystages_code,
                    bystages_fee: this.payList[this.payTypeIndex]['ByStages'][this.byStagesIndex].bystages_fee,
                    bystages_stage: this.payList[this.payTypeIndex]['ByStages'][this.byStagesIndex].bystages_stage,
                    bystages_cat_id: this.payList[this.payTypeIndex]['ByStages'][this.byStagesIndex].bystages_cat_id,
                };
                this.payDesc = `${payInfo.pay_name}${payInfo.bystages_val}`;
                //保存支付信息到pay_info
                this.$store.commit("setPayInfo", payInfo);
            },
            getIntegralPayIndex() {
                let integralPayIndex = -1;
                this.payList.map((item, index) => {
                    if (item.pay_code === this.integralPayCode) {
                        integralPayIndex = index;
                        return true;
                    }
                });
                return integralPayIndex;
            }
        },
    };
</script>
<style lang="scss" scoped>
  .pay-option-main {
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