<template>
	<div class="main">
		<md-bill
						title="电子票据"
						:no="recharge_order_info.recharge_sn"
						water-mark="岗隆数码科技有限公司"
		>
			<md-detail-item title="充值金额">
				&yen;{{this.recharge_order_info.old_recharge_price}}
			</md-detail-item>
			<md-detail-item title="赠送金额">
				&yen;{{this.recharge_order_info.give_recharge_price}}
			</md-detail-item>
			<md-detail-item title="到账金额">
				&yen;{{this.recharge_order_info.ssa_recharge_price}}
			</md-detail-item>
			<md-detail-item title="充值日期">
				{{this.recharge_order_info.recharge_time}}
			</md-detail-item>
		</md-bill>
	</div>
</template>

<script>
    import {Bill, DetailItem, Icon, Tag} from 'mand-mobile'

    export default {
        data() {
            return {};
        },
        props:["recharge_order_info"],
        computed: {},
        created() {

        },
        methods: {},
        components: {
            [Bill.name]: Bill,
            [DetailItem.name]: DetailItem,
            [Icon.name]: Icon,
            [Tag.name]: Tag,
        },
    };
</script>

<style lang="scss">
	.md-water-mark {
		background-color: white;
		margin-top: 10px;
		box-shadow: 0 0 1px 0 rgba(0,0,0,.3);
		.md-bill-header {
			padding: 20px 30px 5px;
			
			.md-bill-title {
				font-size: 16px;
			}
			
			.md-bill-no {
				font-size: 10px;
			}
		}
		
		.md-bill-neck {
			height: 5px;
			
			&:before, &:after {
				content: '';
				position: absolute;
				top: 0;
				width: 36px;
				height: 36px;
				border-radius: 18px;
				background-color: #F3F4F5;
			}
			
			&:before {
				left: -46px
			}
			
			&:after {
				right: -46px
			}
			
		}
		
		.md-bill-content {
			padding: 0 30px 5px;
			
			.md-detail-item {
				padding-top: 5px;
				padding-bottom: 5px;
				
				.md-detail-title {
					font-size: 14px;
				}
				
				.md-detail-content {
					font-size: 14px;
				}
			}
		}
		
	}
	
	.water-mark-list {
		li {
			font-size: 15px;
		}
	}
</style>