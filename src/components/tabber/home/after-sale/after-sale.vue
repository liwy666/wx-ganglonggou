<template>
	<div class="main">
		<myNarBar title="售后申请"></myNarBar>
		<div class="goods-list">
			<van-card
							v-for="(item,i) in order_info.midorder" :key="i"
							:num="item.goods_number"
							:price="item.goods_price"
							:desc="item.attr_desc"
							:title="item.goods_name"
							:thumb="item.goods_attribute_img ==null ? './img/goods-img-invalid.jpg' : item.goods_attribute_img "
			/>
		</div>
		<div class="form-box">
			<p class="title">售后类型</p>
			<van-radio-group v-model="after_sale_type">
				<van-radio name="全额退款">全额退款</van-radio>
			</van-radio-group>
		</div>
		<div class="form-box">
			<p class="title">售后原因</p>
			<van-radio-group v-model="after_sale_cause">
				<van-radio name="卖家发错货">卖家发错货</van-radio>
				<van-radio name="包装/商品破损/污渍">包装/商品破损/污渍</van-radio>
				<van-radio name="质量问题">质量问题</van-radio>
				<van-radio name="少件/漏发">少件/漏发</van-radio>
				<van-radio name="发票问题">发票问题</van-radio>
				<van-radio name="其它">其它</van-radio>
			</van-radio-group>
		</div>
		<div class="form-box">
			<van-cell-group>
				<van-field
								v-model="after_sale_text"
								label="售后说明"
								type="textarea"
								placeholder="选填(280字)"
								rows="1"
								autosize
				/>
			</van-cell-group>
		</div>
		<van-button size="large" type="danger" @click="putForm">提交申请</van-button>
	
	</div>
</template>

<script>
    import myNarBar from '../../../sub/my-nav-bar';

    export default {
        data() {
            return {
                order_sn: '',
                after_sale_type: '全额退款',
                after_sale_cause: '其他',
                after_sale_text: ''
            };
        },
        computed: {
            order_info: {
                get: function () {
                    let result = {};
                    if (this.$store.state.order_list.length > 1) {
                        this.$store.state.order_list.forEach(item => {
                            if (item.order_sn === this.order_sn) {
                                result = item;
                            }
                        })
                    }
                    return result;
                }
            }
        },
        watch: {
            'after_sale_text': function (newVal, oldVal) {
                if (newVal.length >= 280) {
                    this.after_sale_text = oldVal;
                }
            }
        },
        created() {
            this.order_sn = this.$route.params.order_sn;
            if (this.$store.state.order_list.length < 1) {
                /*获取订单信息*/
                this.$store.dispatch("getOrderList", this.$store.getters.getUserToken);
            }
        },
        activated() {
        },
        methods: {
            /*提交表单*/
            putForm() {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '提交中',
                    duration: 0
                });
                this.$post('user_submit_after_sale', {user_token: this.$store.getters.getUserToken,
                    after_sale_type:this.after_sale_type,
                    after_sale_cause:this.after_sale_cause,
                    after_sale_text:this.after_sale_text,
                    order_sn:this.order_sn
                    })
                    .then((msg) => {
                        toast1.clear();
                        if (msg) {
                            /*获取订单信息*/
                            this.$store.dispatch("getOrderList", this.$store.getters.getUserToken);
                            this.$router.push('/home');
                        } else {
                            this.$toast('提交售后失败')
                        }
                    })
            }
        },
        components: {
            myNarBar,//导航栏
        },
    };
</script>

<style lang="scss" scoped>
	.main {
		.goods-list {
			margin-top: 10px;
		}
		
		.form-box {
			margin-top: 10px;
			background-color: white;
			padding: 10px;
			
			.title {
				height: 30px;
				line-height: 30px;
				padding-left: 10px;
			}
		}
	}
</style>