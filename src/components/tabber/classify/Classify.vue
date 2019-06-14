<template>
	<div class="classify-main-base">
		<!--搜索框-->
		<mySearch></mySearch>
		<div class="classify-main">
			<div class="bar-box">
				<van-sidebar :active-key="active_key" @change="onChange">
					<van-sidebar-item v-for="(item) in classify_list" :key="item.id" :title="item.classify_name"/>
				</van-sidebar>
			</div>
			<div class="base-box">
				<div class="base" v-for="(item,i) in classify_list" :key="item.id" v-show="i===active_key">
					<div class="title"><img v-lazy="item.img_url" alt=""></div>
					<div class="body">
						<div class="group-box" v-for="(item2,i2) in item.children" :key="i2">
							<p class="group-name">{{item2.group_name}}</p>
							<div class="base">
								<div class="one-classify" v-for="(item3) in item2.children" :key="item3.id">
									<div class="img"><img v-lazy="item3.img_url" alt=""></div>
									<div class="name">{{item3.classify_name}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import mySearch from "./sub/my-sub-search.vue";//搜索组件
    export default {
        data() {
            return {
                active_key: 0
            };
        },
        computed: {
            classify_list: {
                get: function () {
                    let result = [];
                    let classify_list = this.$store.state.classify_list;
                    if (classify_list.length > 1) {
                        classify_list = this.getTrees(classify_list, 0);
                        classify_list.forEach((item, i) => {
                            classify_list[i].children = this.arrayGroup(item.children)
                        });
                        result = classify_list;
                    }
                    return result;
                }
                , set: function () {

                }
            }
        },
        created() {
            if (this.$store.state.classify_list.length < 1) {
                this.getClassifyAd();
            }

        },
        methods: {
            getClassifyAd() {
                let toast1 = this.$toast.loading({
                    mask: true,
                    message: '马上就来',
                    duration: 0
                });
                this.$fetch("user_get_classify_ad_list", {into_type: this.$store.getters.getIntoType}).then((msg) => {
                    if (msg) {
                        this.$set(this.$store.state, 'classify_list', msg);
                    }
                    toast1.clear();
                })
            },
            /**
             * 树状的算法
             * @params list     代转化数组
             * @params parentId 起始节点
             */
            getTrees(list, parentId) {
                let items = {};
                // 获取每个节点的直属子节点，*记住是直属，不是所有子节点
                for (let i = 0; i < list.length; i++) {
                    let key = list[i].parent_id;
                    if (items[key]) {
                        items[key].push(list[i]);
                    } else {
                        items[key] = [];
                        items[key].push(list[i]);
                    }
                }
                return this.formatTree(items, parentId);
            },

            /**
             * 利用递归格式化每个节点
             */
            formatTree(items, parentId) {
                let result = [];
                if (!items[parentId]) {
                    return result;
                }
                for (let t of items[parentId]) {
                    t.children = this.formatTree(items, t.id);
                    result.push(t);
                }
                return result;
            }

            , arrayGroup(arr) {
                let newArr = [],
                    types = {},
                    i, j, cur;
                for (i = 0, j = arr.length; i < j; i++) {
                    cur = arr[i];
                    if (!(cur.group_name in types)) {
                        types[cur.group_name] = {group_name: cur.group_name, children: []};
                        newArr.push(types[cur.group_name]);
                    }
                    types[cur.group_name].children.push(cur);
                }
                return newArr;
            }
            , onChange(key) {
                this.active_key = key;
            }
            , getClientHeight() {
                let clientHeight = 0;
                if (document.body.clientHeight && document.documentElement.clientHeight) {
                    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
                } else {
                    clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
                }
                return clientHeight;
            }
        },
        components: {
            mySearch,//搜索组件
        },
    }
</script>
<style lang="scss" scoped>
	.classify-main {
		display: flex;
		position: absolute;
		width: 100%;
		top: 50px;
		bottom: 50px;

		.bar-box {
			position: absolute;
			left: 0px;
			top: 0px;
			bottom: 0px;
			overflow-x: hidden;
			overflow-y: auto;
			width: 24%;
		}

		.base-box {
			width: 78%;
			background-color: white;
			position: absolute;
			overflow-y: auto;
			left: 22%;
			top: 0px;
			right: 0px;
			bottom: 0px;
			.base {
				width: 100%;

				.title {
					width: 90%;
					margin-left: 7%;
					margin-top: 2%;

					img {
						width: 100%;
					}
				}

				.body {
					width: 90%;
					margin-left: 7%;
					margin-top: 2%;

					.group-box {
						margin-top: 20px;

						.group-name {
							font-size: 12px;
							font-weight: bolder;
							margin-bottom: 10px;
						}

						.base {
							display: flex;
							flex-wrap: wrap;

							.one-classify {
								width: 85px;
								margin-bottom: 10px;

								.img {
									width: 100%;
									text-align: center;
									margin-bottom: 5px;

									img {
										width: 75%;
									}
								}

								.name {
									text-align: center;
									font-size: 10px;
								}
							}
						}

					}
				}
			}
		}
	}
</style>