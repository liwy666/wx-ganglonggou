<template>
	<div class="goods-list-main">
		<van-sticky type="primary">
			<van-tabs v-model="top_tab_active" :color="$MyCommon.$main_color0" @click="switchPriceFlag">
				<van-tab>
					<div slot="title">
						<van-icon name="cluster-o"/>
						综合
					</div>
				</van-tab>
				<van-tab>
					<div slot="title">
						<van-icon :name="price_flag? 'ascending':'descending'"/>
						价格
					</div>
				</van-tab>
				<van-tab>
					<div slot="title">
						<van-icon name="chart-trending-o"/>
						销量
					</div>
				</van-tab>
				<van-tab>
					<div slot="title">
						<van-icon name="star-o"/>
						新品
					</div>
				</van-tab>
			</van-tabs>
		</van-sticky>
		<transition-group class="goods-list-box" name="flip-list">
			<goodsCard v-for="item in screen_goods_list" :key="item.goods_id" :goods_info_="item"></goodsCard>
		</transition-group>
	</div>
</template>
<script>
    import goodsCard from './my-one-goods'

    export default {
        data() {
            return {
                top_tab_active: 0,
                price_flag: false,
                screen_goods_list: [],
            };
        },
        props: {
            goods_list: Array,
        },
        computed: {
            default_goods_list: {
                get: function () {
                    let result = JSON.parse(JSON.stringify(this.goods_list));
                    if (result.length > 0) {
                        //冒泡排序
                        for (let i = 0; i < result.length - 1; i++) {
                            for (let j = 0; j < result.length - i - 1; j++) {
                                if ((result[j].goods_sales_volume + result[j].evaluate_count) < (result[j + 1].goods_sales_volume + result[j + 1].evaluate_count)) {
                                    let max = result[j];
                                    result[j] = result[j + 1];
                                    result[j + 1] = max;
                                }
                            }
                        }
                    }
                    return result;
                }
            },
            price_goods_list: {
                get: function () {
                    let result = JSON.parse(JSON.stringify(this.goods_list));
                    if (result.length > 0) {
                        //冒泡排序
                        if (this.price_flag) {
                            for (let i = 0; i < result.length - 1; i++) {
                                for (let j = 0; j < result.length - i - 1; j++) {
                                    if (parseFloat(result[j].shop_price) < parseFloat(result[j + 1].shop_price)) {
                                        let max = result[j];
                                        result[j] = result[j + 1];
                                        result[j + 1] = max;
                                    }
                                }
                            }
                        } else {
                            for (let i = 0; i < result.length - 1; i++) {
                                for (let j = 0; j < result.length - i - 1; j++) {
                                    if (parseFloat(result[j].shop_price) > parseFloat(result[j + 1].shop_price)) {
                                        let max = result[j];
                                        result[j] = result[j + 1];
                                        result[j + 1] = max;
                                    }
                                }
                            }
                        }

                    }
                    return result;
                }
            },
            sales_volume_goods_list: {
                get: function () {
                    let result = JSON.parse(JSON.stringify(this.goods_list));
                    if (result.length > 0) {
                        //冒泡排序
                        for (let i = 0; i < result.length - 1; i++) {
                            for (let j = 0; j < result.length - i - 1; j++) {
                                if (parseInt(result[j].goods_sales_volume) < parseInt(result[j + 1].goods_sales_volume)) {
                                    let max = result[j];
                                    result[j] = result[j + 1];
                                    result[j + 1] = max;
                                }
                            }
                        }
                    }
                    return result;
                }
            },
            new_goods_list: {
                get: function () {
                    let result = JSON.parse(JSON.stringify(this.goods_list));
                    if (result.length > 0) {
                        //冒泡排序
                        for (let i = 0; i < result.length - 1; i++) {
                            for (let j = 0; j < result.length - i - 1; j++) {
                                if (parseInt(result[j].add_time) < parseInt(result[j + 1].add_time)) {
                                    let max = result[j];
                                    result[j] = result[j + 1];
                                    result[j + 1] = max;
                                }
                            }
                        }
                    }
                    return result;
                }
            }
        },
        watch: {
            'top_tab_active': {
                'handler': function (new_val) {
                    switch (new_val) {
                        case 0:
                            this.$set(this, 'screen_goods_list', this.default_goods_list);
                            break;
                        case 1:
                            this.$set(this, 'screen_goods_list', this.price_goods_list);
                            break;
                        case 2:
                            this.$set(this, 'screen_goods_list', this.sales_volume_goods_list);
                            break;
                        case 3:
                            this.$set(this, 'screen_goods_list', this.new_goods_list);
                            break;
                    }
                },
                immediate: true,
            },
            'default_goods_list': {
                'handler': function () {
                    switch (this.top_tab_active) {
                        case 0:
                            this.$set(this, 'screen_goods_list', this.default_goods_list);
                            break;
                        case 1:
                            this.$set(this, 'screen_goods_list', this.price_goods_list);
                            break;
                        case 2:
                            this.$set(this, 'screen_goods_list', this.sales_volume_goods_list);
                            break;
                        case 3:
                            this.$set(this, 'screen_goods_list', this.new_goods_list);
                            break;
                    }
                },
                immediate: true,
            },
            'goods_list': {
                'handler': function () {
                    switch (this.top_tab_active) {
                        case 0:
                            this.$set(this, 'screen_goods_list', this.default_goods_list);
                            break;
                        case 1:
                            this.$set(this, 'screen_goods_list', this.price_goods_list);
                            break;
                        case 2:
                            this.$set(this, 'screen_goods_list', this.sales_volume_goods_list);
                            break;
                        case 3:
                            this.$set(this, 'screen_goods_list', this.new_goods_list);
                            break;
                    }
                },
                immediate: true,
            },
            'price_flag': {
                'handler': function () {
                    this.$set(this, 'screen_goods_list', this.price_goods_list);
                },
                immediate: true,
            },
        },
        created() {

        },
        mounted() {

        },
        methods: {
            switchPriceFlag() {
                if (this.top_tab_active === 1) {
                    this.$set(this, 'price_flag', !this.price_flag);
                }
            }
        },
        components: {
            goodsCard,
        }
    };
</script>
<style lang="scss" scoped>
	.goods-list-main {
		width: 100%;
		.goods-list-box {
			width: 95%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin: 0 auto;
		}
	}

	.flip-list-move {
		transition: transform 0.5s;
	}
</style>