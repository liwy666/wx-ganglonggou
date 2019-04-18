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
                areaList,
                address_edit: ""
            };
        },
        computed: {
            address_info: {
                get: function () {
                    var result = {};
                    if (!this.address_edit.is_add) {
                        result.id = this.address_edit.address_info.address_id;
                        result.name = this.address_edit.address_info.name;
                        result.tel = this.address_edit.address_info.phone;
                        result.province = this.address_edit.address_info.province;
                        result.city = this.address_edit.address_info.city;
                        result.county = this.address_edit.address_info.town;
                        result.areaCode = this.address_edit.address_info.area_code;
                        result.addressDetail = this.address_edit.address_info.address_list;
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
                    this.$post('userinsaddress', {
                        user_token: this.$store.getters.getUserToken,
                        name: content.name,
                        phone: content.tel,
                        province: content.province,
                        city: content.city,
                        town: content.county,
                        address_list: content.addressDetail,
                        area_code: content.areaCode
                    })
                        .then((msg) => {
                            //push到地址列表之中
                            this.$store.commit('addAddress', msg);
                            toast1.clear();
                            this.$router.go(-1);
                        })

                } else {
                    //修改收货地址
                    let toast1 = this.$toast.loading({
                        mask: true,
                        message: '保存中',
                        duration: 0
                    });
                    this.$post('userupdaddress', {
                        user_token: this.$store.getters.getUserToken,
                        address_id: content.id,
                        name: content.name,
                        phone: content.tel,
                        province: content.province,
                        city: content.city,
                        town: content.county,
                        address_list: content.addressDetail,
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
                this.$post('userdeladdress', {
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
	/*.van-picker__columns{
		height: 200px !important;
			.van-picker-column{
				height: 200px !important;
				ul{
					li{
						height: 44px !important;;
						line-height: 44px !important;
					}
				}
			}
		.van-picker__frame{
			height: 44px !important;
			position:absolute!important;
		}
	}*/
	.van-picker__columns {
		.van-picker__frame {
			position: absolute !important;
		}
	}

</style>