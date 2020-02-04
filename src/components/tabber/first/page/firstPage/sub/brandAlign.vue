<template>
	<div class="brand-align-main">
		<div :class="[i===0||i===6? 'two':'three']" v-for="(item,i) in data" :key="item.id"><img :src="item.ad_img"
			@click="toSonControl(item)"></div>
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
			width: 32%;
			margin-top: 2px;

			img {
				width: 100%;
			}
		}
	}
</style>