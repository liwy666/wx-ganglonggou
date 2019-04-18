<template>
	<div class="main">
		<myNarBar :title="title"></myNarBar>
		<oneOrder v-for="(item) in order_list" :key="item.order_id" :order_info="item"></oneOrder>
	</div>
</template>


<script>
    import myNarBar from '../../../sub/my-nav-bar';
    import oneOrder from './sub/my-one-order';
    export default {
        data() {
            return {};
        },
        computed: {
            title: {
                get: function () {
                    return this.$router.history.current.params.type_name + '订单';
                }
            },
            order_list: {
                get: function () {
                    let order_list = this.$store.state.order_list;
                    let result = [];
                    //进行冒泡排序
                    if (order_list.length > 0) {
                        for (let i = 0; i < order_list.length - 1; i++) {
                            for (let j = 0; j < order_list.length -i-1; j++) {
                                if (this.dateStringConvert(order_list[j].order_time_new) < this.dateStringConvert(order_list[j+1].order_time_new)) {
                                    let max = order_list[j];
                                    order_list[j] = order_list[j+1];
                                    order_list[j+1] = max;
                                }
                            }
                        }
                    }
                    result = this.filterOrderList(order_list,this.title);
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
            ,filterOrderList(order_list,type_name){
                let result = [];
                if(type_name==='待付款订单'){
                    order_list.forEach( item => {
                        if(item.order_state === 1){
                            result.push(item);
                        }
                    });
                }else if(type_name === '待收货订单'){
                    order_list.forEach( item => {
                        if(item.order_state >= 2 && item.order_state <= 3){
                            result.push(item);
                        }
                    });
                }else if(type_name === '待评价订单'){
                    order_list.forEach( item => {
                        if(item.order_state === 4 && item.evaluate_is === 0){
                            result.push(item);
                        }
                    });
                }else if(type_name === '售后订单'){
                    order_list.forEach( item => {
                        if(item.order_state === 5){
                            result.push(item);
                        }
                    });
                }else {
                    result = order_list;
                }
                
                return result;
                
            }
            
        },
        components: {
            myNarBar,//头部组件
            oneOrder,//单个订单
        },
    };
</script>

<style lang="scss" scoped>

</style>