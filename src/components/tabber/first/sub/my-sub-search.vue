<template>
	<div class="main">
		<van-search
			v-model="search_value"
			placeholder="请输入搜索关键词"
			shape="round"
			@focus="onSearch"
		>
		</van-search>
		<div class="support"></div>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                search_value: "",
            };
        },
        created() {

        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
            console.log(document.querySelector('.van-search '));
        },
        methods: {
            onSearch() {
                this.$router.push('/search');
            }
            , handleScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                let s = scrollTop/1000;
                document.querySelector('.van-search ').style.cssText = 'background-color:rgba(204, 0, 1, '+s+') !important';
            }
        },
    };
</script>
<style lang="scss" scoped>
	.van-search {
		background-color: rgba(0,0,0,0) !important;
		width: 100%;
		top: 0;
		position: fixed;
		z-index: 999;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0);
	}
</style>