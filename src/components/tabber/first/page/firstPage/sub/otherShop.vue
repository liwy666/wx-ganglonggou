<template>
	<div class="other-shop-main">
		<swiper :options="swiper_option" ref="mySwiper">
			<swiper-slide v-for="(item,i) in data" :key="item.id" :data_index="i">
				<otherShopItem :goods_info="item"></otherShopItem>
			</swiper-slide>
		</swiper>
	</div>
</template>
<script>
    import otherShopItem from './otherShopItem';

    export default {
        data() {
            return {
                swiper_option: {
                    loop: true,
                    loopAdditionalSlides: 1,
                    slidesPerView: 3,
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
            this.swiper.on('tap', function () {
                _this.toSonControl(_this.data[this.clickedSlide.getAttribute('data_index')]);
            })
        },
        methods: {
            toSonControl(ad_info) {
                this.toControl(ad_info)
            }
        },
        components: {
            otherShopItem
        }
    };
</script>
<style lang="scss" scoped>
	.other-shop-main {
		width: 100%;
		padding-top: 10px;
		padding-bottom: 10px;
	}
</style>