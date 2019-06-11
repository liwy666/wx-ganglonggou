<template>
	<div class="main">
		<van-search
						v-model="search_value"
						placeholder="请输入搜索关键词"
						show-action
						shape="round"
						@cancel="onCancel"
						@search="onSearch"
		>
		</van-search>
		<div class="key-word-box">
			<p>搜索推荐</p>
			<div class="key-word-body">
				<span v-for="(item,i) in cmd_keyword" :key="i" @click="clickSearch(item)">{{item}}</span>
			</div>
		</div>
		<div class="key-word-box" v-if="hits_keyword.length > 0">
			<p>搜索历史</p>
			<div class="key-word-body">
				<span v-for="(item,i) in hits_keyword" :key="i" @click="clickSearch(item)">{{item}}</span>
			</div>
			<p class="clear" @click="clear">清除搜索记录</p>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                search_value: ''
            };
        },
        computed: {
            cmd_keyword: {
                get: function () {
                    return this.$store.state.cmd_keyword;
                }
            },
            hits_keyword: {
                get: function () {
                    return this.$store.state.hits_keyword;
                }
            }
        },
        created() {
        },
        methods: {
            /*关闭搜索*/
            onCancel() {
                this.$router.go(-1);
            },
            /*手动搜索*/
            onSearch() {
                if (this.search_value.length > 0 && this.search_value.length < 20) {
                    //保存关键词
                    let data = this.hits_keyword;
                    data.push(this.search_value);
                    this.$set(this.$store.state, 'hits_keyword', data);
                    //存储到 本地的 localStorage 中
                    localStorage.setItem('hits_keyword', JSON.stringify(data));
                    let keyword = this.search_value.toUpperCase();
                    keyword = keyword.replace(/\s*/g, "");
                    this.search_value = "";
                    this.$router.push({path: 'goodsList', query: {type: 'search', cat_id: -1, keyword: keyword}});
                }
            },
            /*单击关键词搜索*/
            clickSearch(keyword_) {
                let keyword = keyword_.toUpperCase();
                keyword = keyword.replace(/\s*/g, "");
                this.$router.push({path: 'goodsList', query: {type: 'search', cat_id: -1, keyword: keyword}});
            },
            /* 清除搜索历史记录*/
            clear() {
                this.$dialog.confirm({
                    title: '',
                    message: '确认清除全部历史记录吗？'
                }).then(() => {
                    this.$set(this.$store.state, 'hits_keyword', []);
                    //存储到 本地的 localStorage 中
                    localStorage.setItem('hits_keyword', JSON.stringify(this.$store.state.hits_keyword));

                }).catch(() => {
                    // on cancel
                });
            }
        },
    };
</script>

<style lang="scss">
	.van-search {
		background-color: $main-color0 !important;
		width: 100%;
		z-index: 999;
		box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, .6);
		
		.van-search__action {
			color: white;
		}
	}
</style>

<style lang="scss" scoped>
	.key-word-box {
		margin-bottom: 15px;
		p {
			padding-left: 5px;
			background-color: white;
			height: 30px;
			line-height: 30px;
			font-size: 12px;
			color: #323233;
		}
		
		.clear {
			text-align: center;
			color: #c8c9cc;
		}
		
		.key-word-body {
			background-color: white;
			margin-top: 1px;
			padding: 5px;
			display: flex;
			flex-wrap: wrap;
			
			span {
				height: 25px;
				line-height: 25px;
				font-size: 11px;
				margin-top: 5px;
				border-radius: 5px;
				margin-left: 10px;
				background-color: rgba(0, 0, 0, .1);
				padding-left: 18px;
				padding-right: 18px;
				transition: all ease 0.3s;
				color: #051B28;
			}
		}
	}
</style>