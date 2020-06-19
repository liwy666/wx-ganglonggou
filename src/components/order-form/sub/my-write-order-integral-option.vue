<template>
  <div class="main">
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item :title="title" name="1">
        <van-row>
          <van-col span="4">使用</van-col>
          <van-col span="12">
            <van-stepper v-model="useIntegralNumber"
                         integer
                         :max="maxIntegralNumber"
                         min="0"
                         @change="useIntegral"
                         input-width="80px"/>
          </van-col>
          <van-col span="4">
            <van-button size="mini" v-show="maxIntegralNumber>0" @click="allIn">全部</van-button>
          </van-col>
          <van-col span="4">
            <van-button size="mini" v-show="maxIntegralNumber>0" @click="rest">清零</van-button>
          </van-col>
        </van-row>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                activeNames: '0',
                integralName: this.$store.state.integral_name,
                useIntegralNumber: 0,
            };
        },
        created() {
            if (this.maxIntegralNumber > 0) {
                this.allIn();
                this.useIntegral();
            }
        },
        props: {
            userIntegralNumber: {
                type: Number,
                default: 0,
            },
            maxIntegralNumber: {
                type: Number,
                default: 0,
            },
        },
        computed: {
            title: {
                get: function () {
                    return '您现有' + this.userIntegralNumber + this.integralName + ' 本单可使用' + this.maxIntegralNumber + this.integralName;
                }
            }
        },
        methods: {
            useIntegral() {
                if (this.useIntegralNumber <= this.maxIntegralNumber) {
                    this.$store.commit("setUseIntegral", this.useIntegralNumber)
                }
            },
            allIn() {
                this.useIntegralNumber = this.maxIntegralNumber;
            },
            rest() {
                this.useIntegralNumber = 0;
            }
        },
    };
</script>

<style scoped>

</style>