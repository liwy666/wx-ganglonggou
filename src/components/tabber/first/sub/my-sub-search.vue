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
                search_value:"",
            };
        },
        created() {

        },
        mounted(){
        
        },
        methods: {
            onSearch(){
                this.$router.push('/search');
            }
        },
    };
</script>

<style lang="scss" scoped>
	.van-search{
		background-color: $main-color0!important;
		width: 100%;
		top: 0;
		position: fixed;
		z-index: 999;
		box-shadow: 0px 0px 10px 0px rgba(0,0,0,.6);
	}
	.support{
		width: 100%;
		height:50px;
	}
</style>