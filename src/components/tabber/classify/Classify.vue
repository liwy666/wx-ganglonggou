<template>
  <div class="classify-main-base">
    <!--搜索框-->
    <!--		<mySearch></mySearch>-->
    <div class="classify-main">
      <div class="bar-box">
        <van-sidebar :active-key="active_key" @change="onChange">
          <van-sidebar-item v-for="(item) in classify_list" :key="item.id" :title="item.classify_name"/>
        </van-sidebar>
      </div>
      <div class="base-box">
        <div class="base" v-for="(item,i) in classify_list" :key="item.id" v-show="i===active_key">
          <div class="title" v-if="item.bar_img"><img :src="item.bar_img" alt="" @click="toSearch(item)">
          </div>
          <div style="height:1rem" v-if="!item.bar_img"></div>
          <div class="body">
            <div class="one-classify" v-for="(item3) in item.children" :key="item3.id"
                 @click="toSearch(item3)">
              <div class="img"><img v-lazy="item3.logo_img" alt=""></div>
              <div class="name">{{item3.classify_name}}</div>
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
        name: "classify",
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
                        result = this.getTrees(classify_list, 0);
                        //分组
                        // classify_list.forEach((item, i) => {
                        //     classify_list[i].children = this.arrayGroup(item.children)
                        // });
                        // result = classify_list;
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
            , toSearch(info) {
                if (info.click_type === '商品ID' && info.goods_id > 0) {
                    this.$router.push(`/goods/${info.goods_id}`);
                } else {
                    let key_word = '';
                    if (info.key_word !== '' && info.key_word != null) {
                        key_word = info.key_word;
                    } else {
                        key_word = info.classify_name;
                    }
                    key_word = key_word.toUpperCase();
                    key_word = key_word.replace(/\s*/g, "");
                    this.$router.push({
                        path: 'goodsList', query: {
                            type: 'search',
                            cat_id: -1,
                            keyword: key_word,
                        }
                    });
                }

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
    top: 0px;
    bottom: 50px;

    .bar-box {
      position: absolute;
      left: 0px;
      top: 0px;
      bottom: 0px;
      overflow-x: hidden;
      overflow-y: auto;
      width: 100px;
    }

    .base-box {
      width: 314px;
      background-color: white;
      position: absolute;
      overflow-y: auto;
      left: 100px;
      top: 0;
      right: 0;
      bottom: 0;

      .base {
        width: 100%;

        .title {
          width: 90%;
          margin: 21px auto;

          img {
            width: 100%;
          }
        }

        .body {
          width: 292px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;

          .one-classify {
            width: 70px;
            margin: 0 13.66px 21px 13.66px;

            .img {
              width: 70px;
              height: 70px;
              text-align: center;
              margin-bottom: 5px;

              img {
                width: 100%;
              }
            }

            .name {
              text-align: center;
              font-size: 13px;
              font-weight: bolder;
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .classify-main-base {
    .classify-main {
      .bar-box {
        .van-sidebar {
          width: 100px;
        }
      }
    }
  }
</style>