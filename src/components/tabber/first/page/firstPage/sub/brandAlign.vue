<template>
	<div class="brand-align-main">
		<div :class="[i===0||i===6?'two':'three']" v-for="(item,i) in data" :key="item.id"><img :src="item.ad_img" @click="toSonControl(item)">
		</div>
	</div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props: {
            data: Array,
            toControl: Function,
        },
        computed: {},
        mounted() {

        },
        methods: {
            toSonControl(ad_info) {
                this.toControl(ad_info)
            }
        },
    };
</script>
<style lang="scss" scoped>
	.brand-align-main {
		box-sizing: border-box;
		/*background-color: rgb(205,239,255);*/
		/*border: 1px solid rgb(57,131,238);*/
		border-radius: 10px;
		padding: 3px;
		width: 95%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		
		.two {
			width: 66%;
			margin-top: 2px;
			img {
				width: 100%;
			}
		}
		
		.three {
			margin-top: 2.5px;
			width: 32%;
			img {
				width: 100%;
			}
		}
	}
</style>