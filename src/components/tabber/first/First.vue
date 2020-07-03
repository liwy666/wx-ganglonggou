<template>
  <div class="first-main">
    <first-page :api-base-url="apiBaseUrl"
                :head-open="false"
                :show-sys="false"
                @goods-card-click="goodsCardClick"
                @ad-location-click="adLocationClick"
                @search-click="searchClick"
                @more-classify-click="moreClassifyClick"
                @every-day-box-click="$router.push('/activity_every_day')"
    />
    <back-top-button/>
  </div>
</template>
<script>
    import {commonShare} from "../../../share";
    import backTopButton from "../../sub/backTopButton";

    export default {
        name: "first",
        data() {
            return {
                apiBaseUrl: process.env.VUE_APP_API_URL + '/',
            };
        },
        created() {

        },
        activated() {
            /*获取Url参数信息*/
            let goods_id = this.GetQueryString('gl_goods_id');
            if (goods_id != null && goods_id.length > 1) {
                if ((/(^[1-9]\d*$)/.test(parseInt(goods_id)))) {//验证正整数
                    this.$router.push('/goods/' + goods_id);
                }
            }
            commonShare(this, '岗隆购', this.$store.state.local_url, 'https://img-api.ganglonggou.com/wx_share_img.png', '江苏岗隆数码-您身边的数码产品服务商');
        },
        methods: {
            GetQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
            getObjectByUrl(url) {
                const keyRex = new RegExp("(\\?|&)([^=]*)(={1}[^&]*)", 'g');
                //const keyArray = keyRex.exec(url);
                const keyArray = url.match(keyRex);
                if (!keyArray || keyArray.length < 1) return null;
                const rex = new RegExp('^(\\?|&)(.*)={1}(.*)$');
                const object = {};
                keyArray.forEach(item => {
                    const resultArray = item.match(rex);
                    object[resultArray[2]] = decodeURIComponent(resultArray[3]);
                });
                return object;
            },
            getRouteByUrl(url) {
                let rex = new RegExp('#/(.*)(\\?)?');
                let resultArray = rex.exec(url);
                if (resultArray === null || resultArray.length < 2) return "";
                return resultArray[1];
            },
            goodsCardClick(goodsId) {
                if (goodsId && goodsId > 0) {
                    this.$router.push({path: 'goods/' + goodsId});
                }
            },
            adLocationClick(addressItemData) {
                switch (addressItemData.responseType) {
                    case "内部链接-U":
                        if (addressItemData.responseUrl) {
                            let routePath = this.getRouteByUrl(addressItemData.responseUrl);
                            let routeObj = this.getObjectByUrl(addressItemData.responseUrl);
                            this.$router.push({path: routePath, query: routeObj});
                        }
                        break;
                    case "外部链接-U":
                        if (addressItemData.responseUrl) {
                            window.location.href = addressItemData.responseUrl;
                        }
                        break;
                    case "商品详情页-G":
                        if (addressItemData.goodsId) {
                            this.$router.push({path: `/goods/${addressItemData.goodsId}`})
                        }
                        break;

                }
            },
            searchClick() {
                this.$router.push('search');
            },
            moreClassifyClick(parentId) {
                this.$router.push({path: 'activity_classify_page', query: {id: parentId}});
            },

        },
        components: {
            'back-top-button': backTopButton,
        },
    };
</script>
<style lang="scss" scoped>
</style>