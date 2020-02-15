<template>
	<div class="main">
		<div class="head-box">
			<div class="logo"><img :src="supplier_preview_info.logo_img" alt=""></div>
			<div class="name">
				<p class="supplier-name">{{this.supplier_preview_info.supplier_name}}</p>
				<p class="company-name">{{this.supplier_preview_info.company_name}}</p>
			</div>
			<div class="button">
				<van-button type="danger" size="small" round @click="toHome">商城首页</van-button>
			</div>
		</div>
		<div class="read-box">
			<van-row>
				<van-col span="8">宝贝描述: <span>{{this.supplier_preview_info.describe_rate}}</span></van-col>
				<van-col span="8">卖家服务: <span>{{this.supplier_preview_info.service_rate}}</span></van-col>
				<van-col span="8">物流服务: <span>{{this.supplier_preview_info.logistics_rate}}</span></van-col>
			</van-row>
		</div>
		<div class="goods-list-box">
			<p class="title">店铺推荐</p>
			<div class="base">
				<div class="goods-cart" v-for="(item) in supplier_preview_info.goods_list" :key="item.goods_id"
					@click="$router.push({ path: '/goods/'+item.goods_id, query: { goods_info: JSON.stringify(item) }})">
					<div class="goods-img"><img v-lazy="item.goods_img" alt=""></div>
					<div class="goods-name">{{item.goods_name}}</div>
					<div class="goods-price">￥{{item.shop_price}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

    export default {
        data() {
            return {};
        },
        props: ['supplier_preview_info'],
        computed: {},
        created() {

        },
        methods: {
            toSupplier() {
                let supplier_info = JSON.parse(JSON.stringify(this.supplier_preview_info));
                delete supplier_info.goods_list;
                this.$router.push({path: '/supplier', query: {supplier_info: JSON.stringify(supplier_info)}})
            },
			toHome() {
				let goods_id = this.GetQueryString('gl_goods_id');
				if (goods_id != null && goods_id.length > 1 && (/(^[1-9]\d*$)/.test(parseInt(goods_id)))) {
					/* 直接跳转*/
					window.location.href = this.$store.state.local_url;
				} else {
					this.$router.push('/')
				}
			},
			GetQueryString(name) {
				let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				let r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			},
        },
    };
</script>
<style lang="scss" scoped>
	.main {
		padding: 5px;
		background-color: white;
		margin-top: 10px;
		border-top: 1px solid rgba(0, 0, 0, .1);
		border-bottom: 1px solid rgba(0, 0, 0, .1);
		overflow: hidden;

		.head-box {
			display: flex;
			height: 100px;
			justify-content: space-around;
			align-items: center;

			.logo {
				width: 80px;
				height: 80px;
				overflow: hidden;

				img {
					width: 100%;
				}
			}

			.name {
				.supplier-name {
					font-size: 14px;
					font-weight: bold;
					color: #323233;
				}

				.company-name {
					font-size: 12px;
					color: gray;
				}
			}
		}

		.read-box {
			margin-top: -15px;

			span {
				color: red;
			}
		}

		.goods-list-box {
			.title {
				padding: 10px;
				font-size: 14px;
				font-weight: bold;
				color: #323233;
			}

			.base {
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				width: 100%;

				.goods-cart {
					width: 30%;
					margin-left: 3%;

					.goods-img {
						width: 100%;
						overflow: hidden;

						img {
							width: 100%;
						}
					}

					.goods-name {
						border: 0px solid black;
						position: relative;
						box-sizing: border-box;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						flex-direction: column;
						align-content: flex-start;
						flex-shrink: 0;
						font-size: 11px;
						text-align: left;
						line-height: 17px;
						height: 36px;
						color: rgb(62, 62, 62);
						-webkit-line-clamp: 2;
						overflow: hidden;
					}

					.goods-price {
						padding-left: 5px;
						font-size: 12px;
						height: 18px;
						line-height: 18px;
					}
				}
			}
		}
	}
</style>