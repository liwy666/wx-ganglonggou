<template>
	<transition name="top-switch-main"
		enter-active-class="animated fadeInDown faster"
		leave-active-class="animated fadeOutUp faster">
	<div class="top-switch-main" v-show="!isFixed">
		<swiper :options="swiper_options" ref="mySwiper">
			<swiper-slide v-for="(item,i) in classify_list" :key="i">
				<li :class="{'top-xz':i===switch_index,'animated tada infinite slow show-item':item==='现货专区'&&switch_index!==i} " @click="_updateSwitchIndex(i)">
					{{item}}
					<div v-show="i===switch_index" class="bottom-tag"></div>
				</li>
			</swiper-slide>
		</swiper>
	</div>
	</transition>
</template>
<script>
    export default {
        data() {
            return {
                swiper_options: {
                    slidesPerView: 5.5,
                }
            };
        },
        props: {
            parents_classify_list: Array,
            switch_index: Number,
            updateSwitchIndex: Function,
            isFixed:Boolean,
        },
        computed: {
            classify_list: {
                get: function () {
                    let result = [];
                    this.parents_classify_list.forEach(item => {
                        result.push(item.classify_name);
                    });
                    result.splice(0, 0, '首页');
                    return result;
                }
            }
        },
        created() {

        },
        methods: {
            _updateSwitchIndex(val) {
                this.$emit('updateSwitchIndex', val)
            }
        },
    };
</script>
<style lang="scss" scoped>
	.top-switch-main {
		li {
			text-align: center;
			height: 35px;
			line-height: 28px;
			color: white;
			font-size: 14px;
			transition: all 0.1s ease;

			.bottom-tag {
				margin: 0 auto;
				width: 65%;
				height: 3px;
				background-color: white;
				border-radius: 5px;
			}
		}
		.show-item{
			font-weight: bolder;
			font-size: 16px;
		}
		.top-xz {
			/*font-weight: bolder;*/
			/*font-size: 15px;*/
		}
	}
</style>