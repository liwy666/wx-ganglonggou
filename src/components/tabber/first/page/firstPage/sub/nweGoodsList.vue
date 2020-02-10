<template>
	<div class="new-goods-list-main">
		<swiper :options="swiper_option" ref="mySwiper">
			<swiper-slide v-for="(item,i) in data" :key="item.id" :data_index="i">
				<goodsCard :goods_info="item"></goodsCard>
			</swiper-slide>
		</swiper>
	</div>
</template>
<script>
    import goodsCard from './newGoodsCard';

    export default {
        data() {
            return {
                swiper_option: {
                    loop: true,
                    loopAdditionalSlides: 1,
                    slidesPerView: 3,
                    spaceBetween : 8,
                    autoplay: {
                        delay: 3500,
                        disableOnInteraction: false,
                    },
                }
            };
        },
        props: {
            data: Array,
            toControl: Function,
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        },
        mounted() {
            let _this = this;
            this.swiper.on('click', function () {
                _this.toSonControl(_this.data[this.clickedSlide.getAttribute('data_index')]);
            })
        },
        methods: {
            toSonControl(ad_info) {
                this.toControl(ad_info);
            }
        },
        components: {
            goodsCard
        }
    };
</script>
<style lang="scss" scoped>
	.new-goods-list-main {
		width: 95%;
		margin:0 auto;
		height: 180px;
	}
</style>