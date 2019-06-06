<template>
	<div class="main">
		<div class="order-list-body">
			<p class="title">
				<van-icon name="bars" :color="$MyCommon.$main_color0"/>
				<span>物流详情</span></p>
			<van-row>
				<van-col span="12"><p class="list-name">快递类型：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.logistics.logistics_code_name}}</p></van-col>
			</van-row>
			<van-row>
				<van-col span="6"><p class="list-name">快递单号：</p></van-col>
				<van-col span="18">
					<p class="list-price"><span class="sn">{{this.logistics.logistics_sn}}</span>
						<van-tag :color="$MyCommon.$main_color0" plain @click="viewLogistics">查看物流信息</van-tag>
					</p>
				</van-col>
			</van-row>
			<van-row>
				<van-col span="12"><p class="list-name">发货时间：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.logistics.deliver_goods_time}}</p></van-col>
			</van-row>
			<van-row v-if="this.logistics.invalid_sign_goods_time !=null">
				<van-col span="12"><p class="list-name">签收时间：</p></van-col>
				<van-col span="12"><p class="list-price">{{this.logistics.invalid_sign_goods_time}}</p></van-col>
			</van-row>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: ["logistics"],
        computed: {},
        created() {

        },
        methods: {
            viewLogistics(){
                if(this.logistics.logistics_code === 'shunfeng'){
                    let url = 'https://www.sf-express.com/mobile/cn/sc/dynamic_functions/waybill/detail/'+ this.logistics.logistics_sn;
                    this.$router.push({
						path:'/myIframe',
						query:{
                            src:url,
						}
					})
				}else {
                    this.$notify('抱歉，暂不支持该物流的信息查看');
				}
			}
		},
    };
</script>

<style lang="scss" scoped>
	.main {
		.order-list-body {
			background-color: white;
			padding-top: 20px;
			padding-bottom: 20px;

			.title {
				padding-left: 10px;
				font-size: 14px;
				height: 18px;
				line-height: 18px;
				margin-bottom: 10px;

				span {
					margin-left: 5px;
					color: rgb(50, 50, 50);
					font-weight: bolder;
				}
			}

			p {
				font-size: 14px;
			}

			.list-price {
				padding-right: 50px;
				text-align: right;
			}

			.list-name {
				padding-left: 20px;
				text-align: left;
			}
		}
	}
</style>