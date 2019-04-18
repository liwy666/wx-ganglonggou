<template>
	<div class="article-main">
		<myNarBar :title="article_info.title"></myNarBar>
		<div v-html="article_info.content"></div>
	</div>
</template>

<script>
    import myNarBar from '../sub/my-nav-bar';

    export default {
        data() {
            return {
                article_id: -1,
                article_info: {},
            };
        },
        computed: {},
        created() {
            this.article_id = this.$route.params.article_id;
            this.getInfo();
        },
        methods: {
            getInfo() {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '加载中',
                    duration: 0
                });
                this.$fetch('user_get_article', {article_id: this.article_id})
                    .then((msg) => {
                        this.article_info = msg;
                        console.log(msg);
                        toast1.clear();
                    })
            }
        },
        components: {
            myNarBar,//头部组件
        },
    };
</script>

<style lang="scss">

</style>