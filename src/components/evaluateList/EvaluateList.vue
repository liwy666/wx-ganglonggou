<template>
  <div class="evaluate-list">
    <nar-bar title="评价列表"/>
    <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
    >
      <evaluate-item v-for="(item) in evaluate_list" :key="item.id" :evaluate_info="item"/>
    </van-list>
  </div>
</template>

<script>
    import EvaluateItem from "./EvaluateItem";
    import myNarBar from '../sub/my-nav-bar';

    export default {
        name: "EvaluateList",
        data() {
            return {
                loading: false,
                finished: false,
                error: false,
                page: 1,
                limit: 5,
                now_count: 0,
                evaluate_list: [],
                evaluate_count: 0,
                goods_id: 0,
            };
        },
        created() {
            console.log(this.$route.query);
            this.goods_id = this.$route.query.goodsId;
            this.evaluate_count = this.$route.query.evaluateCount;
            this.onLoad();
        },
        methods: {
            onLoad() {
                this.loading = true;
                this.$fetch('user_get_evaluate_by_goods_id_and_page'
                    , {
                        goods_id: this.goods_id
                        , page: this.page
                        , limit: this.limit
                    })
                    .then((msg) => {
                        this.page++;
                        this.now_count += this.limit;
                        this.count = parseInt(msg.count);
                        if (this.now_count >= this.evaluate_count) {
                            this.finished = true;
                        }
                        this.loading = false;
                        if (msg) {
                            msg.forEach((item) => {
                                this.evaluate_list.push(item);
                            })
                        }
                    })
            }
        },
        components: {
            [EvaluateItem.name]: EvaluateItem,//评论子组件
            'nar-bar': myNarBar,
        },
    };
</script>

<style scoped lang="scss">

</style>