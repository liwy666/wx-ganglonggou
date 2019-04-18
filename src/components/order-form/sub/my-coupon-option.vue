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
                this.coupon_list.forEach(item => {
                    if (parseFloat(item.found_sum) <= carts_selected_price) {
                        this.coupons.push(item);
                    } else {
                        item.reason = "订单金额不满足";
                        this.disabled_coupons.push(item);
                    }
                });
                //2.检查是否符合优惠券使用范围
                let idl_coupons = [];
                this.goods_list.forEach((item, i) => {
                    idl_coupons[i] = [];
                    this.coupons.forEach(item2 => {
                        if (item2.grant_type === "all") {
                            idl_coupons[i].push(item2);
                        } else if (item2.grant_type === "classify") {
                            item2.coupon_info.forEach(item3 => {
                                if (item3.cat_id === item.cat_id) {
                                    idl_coupons[i].push(item2);
                                }
                            })
                        } else if (item2.grant_type === "solo") {
                            item2.coupon_info.forEach(item3 => {
                                if (item3.goods_id === item.goods_id) {
                                    idl_coupons[i].push(item2);
                                }
                            })
                        }
                    })
                });
                if (this.goods_list.length > 1) {
                    //2.1取出遍历结果重复的优惠券
                    let repeat_idl_coupons = this.merge(idl_coupons);
                    //2.2和this.coupons比对出不包含的，就不符合要求的
                    let distinct_arr = [];
                    if (repeat_idl_coupons.length > 1) {
                        distinct_arr = this.getArrDifference2(repeat_idl_coupons, this.coupons);
                    } else {
                        distinct_arr = this.coupons;
                    }

                    console.log(this.coupons);
                    if (distinct_arr.length > 0) {
                        distinct_arr.forEach(item => {
                            item.reason = "所结算商品中存在不符合条件的商品";
                            this.disabled_coupons.push(item);
                        })
                    }
                    //2.3重新赋值this.coupons
                    this.coupons = JSON.parse(JSON.stringify(repeat_idl_coupons));
                } else {
                    let idl_coupons_ = [];
                    if (idl_coupons[0].length > 0) {
                        idl_coupons[0].forEach(item => {
                            idl_coupons_.push(item);
                        });
                    }
                    //2.2和this.coupons比对出不包含的，就不符合要求的
                    let distinct_arr = [];
                    if (idl_coupons_.length > 1) {
                        distinct_arr = this.getArrDifference2(idl_coupons_, this.coupons);
                    } else {
                        distinct_arr = this.coupons;
                    }
                    if (distinct_arr.length > 0) {
                        distinct_arr.forEach(item => {
                            item.reason = "所结算商品中存在不符合条件的商品";
                            this.disabled_coupons.push(item);
                        })
                    }
                    //2.3重新赋值this.coupons
                    this.coupons = JSON.parse(JSON.stringify(idl_coupons_));
                }
                //格式化优惠券
                if (this.coupons.length > 0) {
                    this.coupons.forEach(item => {
                        item.id = item.coupon_id;
                        item.name = item.coupon_name;
                        item.condition = '单笔订单满' + item.found_sum + '元';
                        item.startAt = item.start_use_time;
                        item.endAt = item.end_use_time;
                        item.description = item.coupon_desc;
                        item.value = parseFloat(item.cut_sum) * 100;
                        item.valueDesc = "减" + parseFloat(item.cut_sum);
                        item.unitDesc = "元";
                    });
                }
                if (this.disabled_coupons.length > 0) {
                    this.disabled_coupons.forEach(item => {
                        item.id = item.coupon_id;
                        item.name = item.coupon_name;
                        item.condition = '单笔订单满' + item.found_sum + '元';
                        item.startAt = item.start_use_time;
                        item.endAt = item.end_use_time;
                        item.description = item.coupon_desc;
                        item.value = parseFloat(item.cut_sum) * 100;
                        item.valueDesc = "减" + parseFloat(item.cut_sum);
                        item.unitDesc = "元";
                    });
                }

            },
            /**
             * 数组排序
             * @param property
             * @returns {function(*, *): number}
             */
            compare(property) {
                return function (a, b) {
                    let value1 = a[property];
                    let value2 = b[property];
                    return value1 - value2;
                }
            },
            /**
             * 筛选重复
             * @param bigArray
             * @returns {Array}
             */
            merge(bigArray) {
                let array = [];
                if (bigArray.length > 1) {
                    const middeleArray = bigArray.reduce((a, b) => {
                        return a.concat(b);
                    });
                    middeleArray.sort((this.compare('coupon_id')));
                    for (let i = 0; i < middeleArray.length;) {
                        let count = 0;
                        for (let j = i; j < middeleArray.length; j++) {
                            if (middeleArray[i].coupon_id === middeleArray[j].coupon_id) {
                                count++;
                            }
                        }
                        if (count > 1) {
                            array.push(middeleArray[i]);
                        }
                        i += count;
                    }
                } else {
                    array = bigArray;
                }
                return array;
            },
            /**
             * 筛选不重复
             * @param arr1
             * @param arr2
             * @returns {*}
             */
            getArrDifference(arr1, arr2) {
                if (arr1.length > 0 && arr2.length > 0) {
                    return arr1.concat(arr2).filter(function (v, i, arr) {
                        console.log(arr.indexOf(v));
                        return arr.indexOf(v) === arr.lastIndexOf(v);
                    });
                } else {
                    return [];
                }
            },
            /**
             * 筛选不重复
             * @param array1
             * @param array2
             * @returns {*}
             */
            getArrDifference2(array1, array2) {
                let result = [];
                if (array1.length > 0 && array2.length > 0) {
                    for (let i = 0; i < array2.length; i++) {
                        let obj = array2[i];
                        let num = obj.coupon_id;
                        let isExist = false;
                        for (let j = 0; j < array1.length; j++) {
                            let aj = array1[j];
                            let n = aj.coupon_id;
                            if (n === num) {
                                isExist = true;
                                break;
                            }
                        }
                        if (!isExist) {
                            result.push(obj);
                        }
                    }
                }
                return result;
            },
        },
    };
</script>

<style lang="scss">
	.van-coupon-list__list {
		height: 500px !important;
	}
</style>