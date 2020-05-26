<template>
  <div class="recommend-page">
    <my-nav-bar title="推荐好货"/>
    <recommend-page :api-base-url="apiBaseUrl"
                    :head-open="false"
                    @ad-location-click="adLocationClick"
                    @goods-card-click="goodsCardClick"
    />
  </div>
</template>

<script>
    import myNavBar from '../sub/my-nav-bar'
    /*推荐好货*/
    export default {
        name: "ActivityRecommendPage",
        data() {
            return {
                apiBaseUrl: process.env.VUE_APP_API_URL + '/',
            }
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
            goodsCardClick(goodsId) {
                this.$router.push(`goods/${goodsId}`);
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
        },
        components: {
            'my-nav-bar': myNavBar,
        }
    }
</script>

<style scoped lang="scss">
  .recommend-page {

  }
</style>