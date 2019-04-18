<template>
	<div class="main">
		<oneGoods v-for="(item) in spike_list" :key="item.goods_id" :goods_info="item"></oneGoods>
	</div>
</template>

<script>
    import oneGoods from './sub/my-one-goods';
    export default {
        data() {
            return {
            };
        },
        computed: {
            spike_list: {
                get: function () {
                    let result = [];
                    if (this.$store.state.goods_list.length > 0) {
                        this.$store.state.goods_list.forEach(item => {
                            if (item.is_promote > 0 && parseInt(item.promote_price)> 0 && parseInt(item.promote_start_date * 1000) < parseInt( new Date().getTime()) && parseInt(item.promote_end_date * 1000) > parseInt( new Date().getTime())) {
                                result.push(item);
                            }
                        })
                    }
                    return result;
                }
            }
        },
        created() {

        },
        activated() {
            /*获取商品列表*/
            if (this.$store.state.goods_list.length < 1) {
                this.$store.dispatch("getGoodsList", this.$store.getters.getLoginType);
            }
        },
        methods: {},
        components: {
            oneGoods,//单个商品
        },
    };
</script>

<style lang="scss" scoped>

</style>