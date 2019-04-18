<template>
    <div class="main">
        <div class="float-search">
            <transition  name="img-transition"
                        enter-active-class="animated zoomIn"
                        leave-active-class="animated zoomOut">
            <div v-if="scrollTop < 100" class="search-logo"><img src="../../../../assets/search-logo4.jpg" alt=""></div>
            </transition>

            <van-search
              v-model="search_value"
              placeholder="请输入搜索关键词"
              show-action
              shape="round"
              @focus="onSearch"
            >
                <div slot="action" @click="onSearch"></div>
            </van-search>

        </div>
        <div class="support"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                search_value:"",
                scrollTop:0
            };
        },
        created() {
        
        },
        mounted(){
            window.addEventListener('scroll', this.handleScroll);
        },
        methods: {
            onSearch(){
                this.$router.go(-1);
            }
            ,handleScroll(){
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .search-logo{
        width: 100%;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .van-search{
        background-color: #c1101c!important;
        .van-search__action{
            text-align: center;
            div{
                color: white !important;
            }
        }
    }
    .float-search{
        background-color: #c1101c!important;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 999;
        overflow: hidden;
        box-shadow: 1px 1px 1px 2px rgba(0,0,0,0.3);
    }
    .support{
        width: 100%;
        height:95px;
    }
    .active{
        box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.3);
    }

</style>