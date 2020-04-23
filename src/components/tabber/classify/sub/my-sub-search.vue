<template>
	<div class="van-search-main">
		<van-search
			v-model="search_value"
			placeholder="请输入搜索关键词"
			shape="round"
			@focus="onSearch"
		>
		</van-search>
		<div class="van-search-support"></div>
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

        },
        methods: {
            onSearch() {
                this.$router.push('/search');
            }
        },
    };
</script>
<style lang="scss" scoped>
	.van-search {
		background-image: linear-gradient(45deg,$main-color0,$main-color2)!important;
		width: 100%;
		top: 0;
		z-index: 999;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0);
		position: absolute;
	}
</style>