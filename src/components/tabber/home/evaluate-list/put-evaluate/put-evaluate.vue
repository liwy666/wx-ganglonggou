<template>
	<div class="main">
		<myNarBar title="提交评价"></myNarBar>
		<van-card
						:desc="goods_info.attr_desc"
						:title="goods_info.goods_name"
						:thumb="goods_info.goods_attribute_img ==null ? './img/goods-img-invalid.jpg' : goods_info.goods_attribute_img "
		/>
		<van-row>
			<van-col span="12">商品评分：</van-col>
			<van-col span="12">
				<van-rate v-model="rate" color="red"/>
			</van-col>
		</van-row>
		<van-cell-group>
			<van-field
							v-model="evaluate_text"
							label="评价内容"
							type="textarea"
							placeholder="选填（480字）"
							rows="1"
							autosize
			/>
		</van-cell-group>
		<van-button size="large" type="danger" @click="putEvaluate">提交评价</van-button>
	</div>
</template>

<script>
    import myNarBar from '../../../../sub/my-nav-bar';

    export default {
        data() {
            return {
                goods_info: {},
                rate: 5,
                evaluate_text: ''
            };
        },
        computed: {},
        created() {
            this.goods_info = this.$route.query.goods_info;
            if (this.goods_info === '[object Object]') {
                this.$router.push('/evaluateList');
            }
        },
        methods: {
            putEvaluate() {
                if (this.evaluate_text.replace(/\s+/g, "") === '') {
                    this.evaluate_text = '该用户没有填写评价。'
                }
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '正在提交评价',
                    duration: 0
                });
                this.$post('user_ins_evaluate', {
                    user_token: this.$store.getters.getUserToken,
                    evaluate_text: this.evaluate_text,
                    rate: this.rate,
                    midorder_id: this.goods_info.midorder_id,
                    order_id: this.goods_info.order_id
                })
                    .then((msg) => {
                        toast1.clear();
                        if (msg) {
                            this.$store.dispatch("getUserInfo", this.$store.getters.getUserToken);
                            this.$router.push('/home');
                        } else {
                            this.$toast('提交评价失败')
                        }
                    })
            }
        },
        components: {
            myNarBar,//头部组件
        },
    };
</script>

<style lang="scss" scoped>
	.main {
		.van-card {
			background-color: white;
		}
		
		.van-row {
			.van-rate {
				i {
					font-size: 20px !important;
				}
			}
		}
		
	}
</style>