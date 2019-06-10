<template>
	<div class="main">
		<myNarBar title="订单列表"></myNarBar>
		<van-tabs v-model="active" sticky>
			<van-tab title="全部">
				<div class="goods-box">
					<oneOrder v-for="(item) in all" :key="item.order_sn" :order_info="item"></oneOrder>
				</div>
			</van-tab>
			<van-tab title="待付款">
				<transition-group class="goods-box" name="flip-list">
					<oneOrder v-for="(item) in wait_pay" :key="item.order_sn" :order_info="item"></oneOrder>
				</transition-group>
			</van-tab>
			<van-tab title="待收货">
				<div class="goods-box">
					<oneOrder v-for="(item) in wait_sign" :key="item.order_sn" :order_info="item"></oneOrder>
				</div>
			</van-tab>
			<van-tab title="退货/售后">
				<div class="goods-box">
					<oneOrder v-for="(item) in after_sale" :key="item.order_sn" :order_info="item"></oneOrder>
				</div>
			</van-tab>
		</van-tabs>
	</div>
</template>


<script>
    import myNarBar from '../../../sub/my-nav-bar';
    import oneOrder from './sub/my-one-order';

    export default {
        data() {
            return {
                active: 0,
                wait_pay: [],
                all: [],
                wait_sign: [],
                after_sale: [],
            };
        },
        computed: {},
        watch: {
            '$store.state.order_list': function () {
                this.filterOrderList();
            }
        },
        created() {
            console.log(this.$route.params.type_name);
            switch (this.$route.params.type_name) {
                case '全部':
                    this.active = 0;
                    break;
                case '待付款':
                    this.active = 1;
                    break;
                case '待收货':
                    this.active = 2;
                    break;
                case '售后':
                    this.active = 3;
                    break;
                default:
                    this.active = 0;

            }

            if (this.$store.state.order_list.length < 1) {
                /*获取订单信息*/
                this.$store.dispatch("getOrderList", this.$store.getters.getUserToken);
            } else {
                this.filterOrderList();
            }

        },
        methods: {
            /**
             * 数组排序
             * @param property
             * @returns {function(*, *): number}
             */
            compare(property) {
                return function (a, b) {
                    let value1 = a[property];
                    let value2 = b[property];
                    return value1 - value2;
                }
            },
            /**
             * 时间字符串转时间戳
             * @param date_str
             * @returns {number}
             */
            dateStringConvert(date_str) {
                date_str = date_str.substring(0, 19);
                date_str = date_str.replace(/-/g, '/');
                return parseInt(new Date(date_str).getTime());
            }

            /**
             * 筛选订单
             * @param order_list
             * @param type_name
             * @returns {Array}
             */
            , filterOrderList() {
                let order_list = this.$store.state.order_list;
                //进行冒泡排序
                if (order_list.length > 0) {
                    for (let i = 0; i < order_list.length - 1; i++) {
                        for (let j = 0; j < order_list.length - i - 1; j++) {
                            if (this.dateStringConvert(order_list[j].upd_time) < this.dateStringConvert(order_list[j + 1].upd_time)) {
                                let max = order_list[j];
                                order_list[j] = order_list[j + 1];
                                order_list[j + 1] = max;
                            }
                        }
                    }
                }
                order_list.forEach(item => {
                    this.all.push(item);
                    if (item.order_state === 1) {
                        this.wait_pay.push(item);
                    } else if (item.order_state >= 2 && item.order_state <= 3) {
                        this.wait_sign.push(item);
                    } else if (item.order_state >= 6) {
                        this.after_sale.push(item);
                    }
                });
            }

        },
        components: {
            myNarBar,//头部组件
            oneOrder,//单个订单
        },
    };
</script>

<style lang="scss" scoped>
	.main {
		.van-tabs--line {
			padding-top: 0 !important;
			z-index: 9999 !important;
		}
	}
</style>