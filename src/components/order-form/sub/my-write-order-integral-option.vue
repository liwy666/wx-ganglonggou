<template>
    <div class="main">
        <van-collapse v-model="activeNames" accordion>
            <van-collapse-item :title="title" name="1">
                <van-row>
                    <van-col span="12">使用</van-col>
                    <van-col span="12">
                        <van-stepper v-model="use_integral" integer :max="can_integral" min="0" @change="useIntegral"/>
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
                integral_name: this.$store.state.integral_name,
                goods_list: this.$store.getters.getCartsSelected,
                can_integral: 0,
                use_integral: 0,
            };
        },
        computed: {
            user_integral: {
                get: function () {
                    return parseInt(this.$store.state.user_info.integral);
                }
            },

            goods_can_integral: {
                get: function () {
                    let result = 0;
                    this.goods_list.forEach(item => {
                        result += parseInt(item.integral);
                    });
                    return result;
                }
            },
            title: {
                get: function () {
                    return '您现有' + this.user_integral + this.integral_name + ' 本单可使用' + this.can_integral + this.integral_name;
                }
            }
        },
        created() {
            this.iniCanIntegral()
        },
        methods: {
            iniCanIntegral() {
                if (this.user_integral === 0 || this.goods_can_integral === 0) {
                    this.can_integral = 0;
                } else if (this.user_integral <= this.goods_can_integral) {
                    this.can_integral = this.user_integral;
                } else (
                    this.can_integral = this.goods_can_integral
                );
            },
            useIntegral() {
                if (this.use_integral <= this.can_integral) {
                    this.$store.commit("setUseIntegral", this.use_integral)
                }

            },
        },
    };
</script>

<style scoped>

</style>