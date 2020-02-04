<template>
	<div class="main">
		<myNarBar title="地址编辑"></myNarBar>
		<van-address-edit
			:area-list="areaList"
			:address-info="address_info"
			:show-delete="!this.address_edit.is_add"
			@save="onSave"
			@delete="onDelete"
		/>
	</div>

</template>

<script>
    import myNarBar from '../../sub/my-nav-bar';
    import areaList from './area'

    export default {
        data() {
            return {
                areaList,//地址数据库
                address_edit: {},
            };
        },
        computed: {
            address_info: {
                get: function () {
                    var result = {};
                    if (!this.address_edit.is_add) {
                        result.id = this.address_edit.address_info.address_id;//id
                        result.name = this.address_edit.address_info.name;//收件人
                        result.tel = this.address_edit.address_info.tel;//电话
                        result.province = this.address_edit.address_info.province;//省份
                        result.city = this.address_edit.address_info.city;//市
                        result.county = this.address_edit.address_info.county;//县
                        result.areaCode = this.address_edit.address_info.area_code;//编号
                        result.addressDetail = this.address_edit.address_info.address_detail;//地址详情
                    }
                    return result;
                }
            }
        },
        created() {
            this.address_edit = JSON.parse(this.$route.query.address_edit);
        },
        methods: {
            AddressEditShow() {
                this.$emit('AddressEditShow', false);
            }
            , onSave(content) {
                if (this.address_edit.is_add) {
                    //新建收货地址
                    let toast1 = this.$toast.loading({
                        mask: true,
                        message: '保存中',
                        duration: 0
                    });
                    let post_info = {
                        user_token: this.$store.getters.getUserToken,
                        name: content.name,
                        tel: content.tel,
                        province: content.province,
                        city: content.city,
                        county: content.county,
                        address_detail: content.addressDetail,
                        area_code: content.areaCode
                    };
                    this.$post('user_add_address', post_info)
                        .then((msg) => {
                            //这里会返回地址id
                            if (msg) {
                                toast1.clear();
                                this.$router.go(-1);
                            }
                        })
                } else {
                    //修改收货地址
                    let toast1 = this.$toast.loading({
                        mask: true,
                        message: '保存中',
                        duration: 0
                    });
                    this.$post('user_upd_address', {
                        user_token: this.$store.getters.getUserToken,
                        address_id: content.id,
                        name: content.name,
                        tel: content.tel,
                        province: content.province,
                        city: content.city,
                        county: content.county,
                        address_detail: content.addressDetail,
                        area_code: content.areaCode
                    })
                        .then(() => {
                            toast1.clear();
                            this.$router.go(-1);
                        })

                }

            }
            , onDelete(content) {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '正在删除',
                    duration: 0
                });
                this.$post('user_del_address', {
                    user_token: this.$store.getters.getUserToken,
                    address_id: content.id
                })
                    .then(() => {
                        toast1.clear();
                        this.$router.go(-1);
                    })
            }
        },
        components: {
            myNarBar,//头部组件
        },
    };
</script>

<style lang="scss">
	.van-picker__columns {
		.van-picker__frame {
			position: absolute !important;
		}
	}

</style>