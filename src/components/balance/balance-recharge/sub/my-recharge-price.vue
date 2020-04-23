<template>
	<div class="main">
		<van-collapse v-model="activeNames" accordion>
			<van-collapse-item :title="'充值金额：' + recharge_price + '元'" name="1">
				<van-row>
					<van-col span="12">充值金额（元）</van-col>
					<van-col span="12">
						<van-stepper v-model="recharge_price" integer  min="1" @change="rechargePrice"/>
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
                recharge_price:100,
            };
        },
        computed: {},
        created() {

        },
        methods: {
            rechargePrice(){
                if (this.recharge_price >= 1) {
                    this.$store.state.recharge_info.recharge_price = parseInt(this.recharge_price);
                }
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>