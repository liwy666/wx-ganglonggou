<template>
	<div class="main">
		<md-bill
						title="使用明细"
						water-mark="岗隆数码科技有限公司"
		>
			<md-detail-item title="使用金额">
				&yen;{{this.use_info.balance_use_price}}
			</md-detail-item>
			<md-detail-item title="剩余余额">
				&yen;{{this.use_info.surplus_balance}}
			</md-detail-item>
			<md-detail-item title="使用订单号">
				<router-link tag="p" :to="'/seeOrder/'+ use_info.order_sn" style="color:#007aff;text-decoration: underline">{{this.use_info.order_sn}}</router-link>
			</md-detail-item>
			<md-detail-item title="使用时间">
				{{this.use_info.balance_use_time}}
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
        props:["use_info"],
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
