<template>
  <div class="activity-stationery-main">
    <my-nar-bar title="惠战开学季"></my-nar-bar>
    <img class="item" v-lazy="`${basePath}./img/activity_stationery/01.jpg`">
    <img class="item" v-lazy="`${basePath}./img/activity_stationery/02.jpg`">
    <img class="item" @click="toGoodsPage(679)" v-lazy="`${basePath}./img/activity_stationery/03.jpg`">
    <img class="item" @click="toGoodsPage(678)" v-lazy="`${basePath}./img/activity_stationery/04.jpg`">
    <img class="item" @click="toGoodsPage(677)" v-lazy="`${basePath}./img/activity_stationery/05.jpg`">
    <img class="item" @click="toGoodsPage(676)" v-lazy="`${basePath}./img/activity_stationery/06.jpg`">
    <img class="item" @click="toGoodsPage(675)" v-lazy="`${basePath}./img/activity_stationery/07.jpg`">
  </div>
</template>

<script>
    import myNarBar from '../../sub/my-nav-bar';

    export default {
        name: "ActivityStationery",
        data() {
            return {
                basePath: process.env.BASE_URL,
            }
        },
        created() {
            console.log(this.basePath);
        },
        methods: {
            toGoodsPage(goodsId) {
                this.$router.push({path: 'goods/' + goodsId})
            }
        },
        components: {
            "my-nar-bar": myNarBar,
        }
    }
</script>

<style scoped lang="scss">
  .activity-stationery-main {
    .item {
      width: 100%;
      display: block;
    }
  }
</style>