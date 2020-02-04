<template>
	<div class="activity-01-main">
		<myNarBar title="现货专区"></myNarBar>
		<div class="bar-img">
			<img :src="bar_img" alt="">
		</div>
		<div class="goods-list-box">
			<goodsCard v-for="item in goods_list" :key="item.goods_id" :goods_info_="item"></goodsCard>
		</div>
	</div>
</template>
<script>
    import myNarBar from '../../sub/my-nav-bar';
    import goodsCard from '../../sub/my-one-less-goods'
    export default {
        data() {
            return {
                goods_list: [],
                bar_img:null,
            };
        },
        computed: {
        },
        created() {
			this.getIndexAd();
        },
        methods: {
            getIndexAd() {
                this.$fetch("get_index_info", {into_type: this.$store.getters.getIntoType}).then((index_info) => {
                    if (index_info) {
                        index_info.goods_list.forEach((goods_item) => {
                            if (goods_item.goods_name.indexOf('现货专区')!== -1) {
                                this.goods_list.push(goods_item);
                            }
                        });
                        console.log(index_info);
                    }
                });
                this.$fetch("user_get_classify_ad_list", {into_type: this.$store.getters.getIntoType}).then((classify_list) => {
                    if (classify_list) {
                        classify_list.forEach((classify_item)=>{
                            if(classify_item.classify_name==='现货专区'){
								this.bar_img = classify_item.bar_img;
							}
						});
                    }
                });
            },
        },
        components: {
            myNarBar,
            goodsCard,
        }
    };
</script>
<style lang="scss" scoped>
	.activity-01-main {
		.goods-list-box {
			display: flex;
			flex-wrap: wrap;
		}
		.bar-img{
			width: 100%;
			img{
				width: 100%;
			}
		}
	}
</style>