<template>
	<div class="main">
		<div class="my-skeleton" v-show="loading">
			<van-skeleton title :row="20" animate :loading="loading"/>
		</div>
		<div class="article-body" v-show="!loading">
			<img v-for="(item,i) in article_body" :key="i" v-lazy="item">
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                article_body: [],
                loading: true
            };
        },
        computed: {},
        created() {
            this.getArticle();
        },
        methods: {
            getArticle() {
                this.$fetch('user_get_article', {article_id: 1})
                    .then((msg) => {
                        if (msg) {
                            let imgReg = /<img.*?(?:>|\/>)/gi;
                            //匹配src属性
                            let srcReg = /src=['"]?([^'"]*)['"]?/i;
                            let arr = msg.article_body.match(imgReg);
                            for (let i = 0; i < arr.length; i++) {
                                let src = arr[i].match(srcReg);
                                //获取图片地址
                                if (src[1]) {
                                    this.article_body.push(src[1])
                                }
                            }
                            this.loading = false;
                        }
                    })
            }
        },
    };
</script>
<style lang="scss" scoped>
	.main {

		.my-skeleton {
			background-color: white;
			padding-top: 30px;
			padding-bottom: 30px;
		}

		.article-body {
			img {
				display: block;
				width: 100%;
			}
		}
	}
</style>