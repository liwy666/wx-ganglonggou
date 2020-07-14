<template>
  <div class="user-address-main">
    <myNarBar title="地址管理"></myNarBar>
    <van-address-list
        v-model="chosenAddressId"
        :list="address_list"
        @add="onAdd"
        @edit="onEdit"
    />
  </div>

</template>

<script>
    import myNarBar from '../sub/my-nav-bar';

    export default {
        data() {
            return {
                address_edit: {
                    address_info: {},
                    is_add: true
                },
            };
        },
        computed: {
            address_list: {
                get: function () {
                    let result = this.$store.getters.getAddressList;
                    let address_list = [];
                    if (result.length > 0) {
                        result.forEach(item => {
                            let data = item;
                            data.id = item.address_id;
                            data.name = item.name;
                            data.tel = item.tel;
                            data.address = item.province + item.city + item.county + item.address_detail;
                            address_list.push(data);
                        })
                    }

                    return address_list;
                }
            },
            chosenAddressId: {
                get: function () {
                    var result = this.$store.getters.getDefaultAddress;
                    return result.address_id;
                },
                set: function (address_id) {
                    let is_default = 0;
                    if (this.address_list.length > 0) {
                        this.address_list.forEach(item => {
                            if (item.address_id === address_id) {
                                is_default = item.is_default;
                            }
                        })
                    }
                    //只响应非默认地址的切换
                    if (is_default === 0) {
                        let toast1 = this.$toast.loading({
                            mask: true,
                            message: '切换中',
                            duration: 0
                        });
                        this.$post('user_upd_default_address', {
                            user_token: this.$store.getters.getUserToken,
                            address_id: address_id
                        })
                            .then(() => {
                                toast1.clear();
                                this.$store.commit("setIsDefaultAddress", address_id);
                                if (this.$route.query.go_back === true) {
                                    this.$router.go(-1);
                                }
                            })
                    }
                }
            }
        },
        created() {
            this.$store.dispatch("getAddressList", this.$store.getters.getUserToken);
        },
        methods: {
            onAdd() {
                this.address_edit.address_info = {};
                this.address_edit.is_add = true;
                let query = JSON.stringify(this.address_edit);
                this.$router.push({path: '/addressEdit', query: {address_edit: query}})
            },
            onEdit(item, index) {
                let address_list_ = this.$store.getters.getAddressList;
                this.address_edit.address_info = address_list_[index];
                this.address_edit.is_add = false;
                let query = JSON.stringify(this.address_edit);
                this.$router.push({path: '/addressEdit', query: {address_edit: query}})
            },
        },
        components: {
            myNarBar,//头部组件
        },
    };
</script>
<style lang="scss" scoped>
  .user-address-main {
		.van-address-item__edit{
			position: absolute !important;
		}
  }
</style>