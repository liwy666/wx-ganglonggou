<template>
	<div class="main">
		<myNarBar title="评价中心"></myNarBar>
		<div class="evaluate-head"></div>
		<div class="evaluate-body-noEvaluate" v-if="evaluate_list.length <1">
			暂无需要评价商品~~
		</div>
		<div class="evaluate-body" v-if="evaluate_list.length >0">
			<oneEvaluate v-for="(item) in evaluate_list" :key="item.midorder_id" :goods_info="item"></oneEvaluate>
		</div>
	</div>
</template>

<script>
    import myNarBar from '../../../sub/my-nav-bar';
    import oneEvaluate from './sub/one-evaluate';

    export default {
        data() {
            return {};
        },
        computed: {
            order_list: {
                get: function () {
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
                    return order_list;
                }
            },
            evaluate_list: {
                get: function () {
                    let result = [];
                    if (this.order_list.length > 0) {
                        this.order_list.forEach(item => {
                            item.mid_order.forEach(item2 => {
                                if (item.order_state === 4 && item2.is_evaluate === 0) {
                                    result.push(item2);
                                }
                            })
                        })
                    }
                    return result;
                }
            }
        },
        created() {
            if(this.$store.state.order_list.length < 1){
                /*获取订单信息*/
                this.$store.dispatch("getOrderList", this.$store.getters.getUserToken);
            }
        },
        methods: {
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
        },
        components: {
            myNarBar,//头部组件
            oneEvaluate//单个评价组件
        },
    };
</script>

<style lang="scss" scoped>
	.evaluate-head {
		width: 100%;
		height: 135px;
		background-color: #c1101c;
		z-index: 1;
		background-image: url("../../../../assets/evaluate-head.jpg");
		background-repeat:no-repeat;
		background-size:cover;
	}
	
	.evaluate-body-noEvaluate {
		background-color: white;
		border-radius: 5px;
		width: 94%;
		margin-left: 3%;
		height: 400px;
		margin-top: -15px;
		line-height: 400px;
		text-align: center;
		box-shadow: 0 0 1px 0 rgba(0, 0, 0, .3);
		color: #7d7e80;
		z-index: 10;
	}
	.evaluate-body{
		background-color: white;
		border-radius: 5px;
		width: 94%;
		margin-left: 3%;
		margin-top: -15px;
		box-shadow: 0 0 1px 0 rgba(0, 0, 0, .3);
		overflow: hidden;
		z-index: 10;
	}

</style>