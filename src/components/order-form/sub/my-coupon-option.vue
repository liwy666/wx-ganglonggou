<template>
	<div class="main">
		<!-- 优惠券单元格 -->
		<van-coupon-cell
			:coupons="coupons"
			:chosen-coupon="chosen_coupon"
			@click="show = true"
		/>
		<!-- 优惠券列表 -->
		<van-popup v-model="show" position="bottom">
			<van-coupon-list
				show-close-button
				:show-exchange-bar="show_exchange_bar"
				:coupons="coupons"
				:chosen-coupon="chosen_coupon"
				:disabled-coupons="disabled_coupons"
				:close-button-text="coupons.length >0 ? '任性，不使用优惠券': '关闭' "
				@change="onChange"
			/>
		</van-popup>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                show_exchange_bar: false,
                chosen_coupon: -1,
                coupon_list: this.$store.getters.getCouponList,
                goods_list: this.$store.getters.getCartsSelected,
                coupons: [],//可用优惠券
                disabled_coupons: []//不可用优惠券
            };
        },
        created() {
            this.screenCouponList()
        },
        methods: {
            onChange(index) {
                this.chosen_coupon = index;
                this.show = false;
                let coupon_info_ = {
                    coupon_id: -1,
                    coupon_info: {}
                };
                if (index === -1) {
                    this.$store.commit("setCouponInfo", coupon_info_);
                } else {
                    coupon_info_.coupon_id = this.coupons[index].coupon_id;
                    coupon_info_.coupon_info = this.coupons[index];
                    this.$store.commit("setCouponInfo", coupon_info_);
                }
            },
            screenCouponList() {
                if (this.coupon_list.length < 1) {
                    return false
                }
                //1.检查是否符合优惠券使用金额
                let carts_selected_price = parseFloat(this.$store.getters.getCartsSelectedPrice);
                let coupons_id_array = {
                    legal: []//合法的
                    , insufficient_amount: []//金额不满足
                    , insufficient_goods: []//商品类型不满足
                };

                //检查订单金额
                this.coupon_list.forEach(item => {
                    if (parseFloat(item.found_sum) > carts_selected_price) {
                        coupons_id_array.insufficient_amount.push(item.coupon_id)
                    }
                    coupons_id_array.legal.push(item.coupon_id)
                });
                coupons_id_array.legal = this.getArrDifference1D(coupons_id_array.legal, coupons_id_array.insufficient_amount);
                //格式化
                let coupons_array = this.formatCoupon(coupons_id_array);
                //检查类型
                let idl_legal = [];
                this.goods_list.forEach((goods_item) => {
                    coupons_array.legal.forEach(legal_item => {
                        if (legal_item.grant_type === 'all') {
                            idl_legal.push(legal_item.coupon_id);
                        } else if (legal_item.grant_type === 'classify' && legal_item.classify.indexOf(parseInt(goods_item.cat_id)) >= 0) {
                            idl_legal.push(legal_item.coupon_id);
                        } else if (legal_item.grant_type === 'solo' && legal_item.solo.indexOf(parseInt(goods_item.goods_id)) >= 0) {
                            idl_legal.push(legal_item.coupon_id);
                        }
                    })
                });
                idl_legal = this.getArrRepeated1D(idl_legal,this.goods_list.length);
                let insufficient_goods = this.getArrDifference1D(coupons_id_array.legal, idl_legal); //筛选出来商品类型不满足的
                idl_legal = this.getArrEqual1D(coupons_id_array.legal, idl_legal);//筛选出最终符合要求的优惠券
                coupons_id_array.legal = idl_legal;
                coupons_id_array.insufficient_goods = insufficient_goods;
                coupons_array = this.formatCoupon(coupons_id_array);//格式化优惠券
                this.$set(this,'coupons',coupons_array.legal);
                this.$set(this,'disabled_coupons',coupons_array.insufficient_goods.concat(coupons_array.insufficient_amount));
            },
            /**
             * 1维数组筛选不重复
             * @param arr1
             * @param arr2
             * @returns {Uint8Array | T[] | *}
             */
            getArrDifference1D(arr1, arr2) {
                return arr1.concat(arr2).filter(function (v, i, arr) {
                    return arr.indexOf(v) === arr.lastIndexOf(v);
                });
            },

			/*取出两个数组的相同元素*/
            getArrEqual1D(arr1, arr2) {
                let newArr = [];
                for (let i = 0; i < arr2.length; i++) {
                    for (let j = 0; j < arr1.length; j++) {
                        if(arr1[j] === arr2[i]){
                            newArr.push(arr1[j]);
                        }
                    }
                }
                return newArr;
            }

			/*获取重复次数*/
            , getArrRepeated1D(arr, number) {
                function arrValnumber(val_name) {
                    let count = 0;
                    for (let i = 0; i < arr.length; i++) {
                        for (let j = 0; j < arr.length; j++) {
                            if (arr[j] == val_name) {
                                count++;
                                arr[j] = -1;
                            }
                        }
                    }
                    return count
                }
                let result = [];
                arr.forEach(item => {
                    if( arrValnumber(item) === number ){
                        result.push(item)
					}
				});
               return result;
            }
            /**
             * 格式化优惠券
             * @param obj
             */
            , formatCoupon(obj) {
                let resutl = {
                    legal: []//合法的
                    , insufficient_amount: []//金额不满足
                    , insufficient_goods: []//商品类型不满足
                };
                obj.legal.forEach(item => {
                    this.coupon_list.forEach(coupon_itme => {
                        if (item === coupon_itme.coupon_id) {
                            resutl.legal.push({
                                id: coupon_itme.coupon_id
                                , name: coupon_itme.coupon_name
                                , cut_sum: coupon_itme.cut_sum
                                , found_sum: coupon_itme.found_sum
                                , solo: coupon_itme.solo
                                , classify: coupon_itme.classify
                                , grant_type: coupon_itme.grant_type
                                , coupon_id: coupon_itme.coupon_id
                                , condition: '单笔订单满' + coupon_itme.found_sum + '元'
                                , startAt: this.$MyCommon.strToDateTime(coupon_itme.start_use_time, 's')
                                , endAt: this.$MyCommon.strToDateTime(coupon_itme.end_use_time, 's')
                                , description: coupon_itme.coupon_desc
                                , value: parseFloat(coupon_itme.cut_sum) * 100
                                , valueDesc: "减" + parseFloat(coupon_itme.cut_sum)
                                , unitDesc: "元"
                            })
                        }
                    });

                });
                obj.insufficient_amount.forEach(item => {
                    this.coupon_list.forEach(coupon_itme => {
                        if (item === coupon_itme.coupon_id) {
                            resutl.insufficient_amount.push({
                                id: coupon_itme.coupon_id
                                , name: coupon_itme.coupon_name
                                , cut_sum: coupon_itme.cut_sum
                                , found_sum: coupon_itme.found_sum
                                , grant_type: coupon_itme.grant_type
                                , solo: coupon_itme.solo
                                , classify: coupon_itme.classify
                                , coupon_id: coupon_itme.coupon_id
                                , condition: '单笔订单满' + coupon_itme.found_sum + '元'
                                , startAt: this.$MyCommon.strToDateTime(coupon_itme.start_use_time, 's')
                                , endAt: this.$MyCommon.strToDateTime(coupon_itme.end_use_time, 's')
                                , description: coupon_itme.coupon_desc
                                , value: parseFloat(coupon_itme.cut_sum) * 100
                                , valueDesc: "减" + parseFloat(coupon_itme.cut_sum)
                                ,reason:'订单金额不满足'
                                , unitDesc: "元"
                            })
                        }
                    });

                });
                obj.insufficient_goods.forEach(item => {
                    this.coupon_list.forEach(coupon_itme => {
                        if (item === coupon_itme.coupon_id) {
                            resutl.insufficient_goods.push({
                                id: coupon_itme.coupon_id
                                , name: coupon_itme.coupon_name
                                , cut_sum: coupon_itme.cut_sum
                                , found_sum: coupon_itme.found_sum
                                , grant_type: coupon_itme.grant_type
                                , solo: coupon_itme.solo
                                , classify: coupon_itme.classify
                                , coupon_id: coupon_itme.coupon_id
                                , condition: '单笔订单满' + coupon_itme.found_sum + '元'
                                , startAt: this.$MyCommon.strToDateTime(coupon_itme.start_use_time, 's')
                                , endAt: this.$MyCommon.strToDateTime(coupon_itme.end_use_time, 's')
                                , description: coupon_itme.coupon_desc
                                , value: parseFloat(coupon_itme.cut_sum) * 100
                                , valueDesc: "减" + parseFloat(coupon_itme.cut_sum)
                                ,reason:'所结算商品中存在不符合条件的商品'
                                , unitDesc: "元"
                            })
                        }
                    });

                });
                return resutl;
            }
        },
    };
</script>

<style lang="scss">
	.van-coupon-list__list {
		height: 500px !important;
	}
</style>