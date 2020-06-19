<template>
  <div class="button-bar-main">
    <div class="button-item"
         v-for="(item,i) in buttonList"
         @click="switchButton(i)"
         :class="activityIndex=== i?'activity':''"
         :key="i">
      <div class="name">{{item.name}}</div>
      <img class="icon" :src="item.icon" :alt="item.name">
    </div>
  </div>
</template>

<script>
    export default {
        name: "ButtonBar",
        data() {
            return {
                activityIndex: 0,
                buttonList: [
                    {
                        name: "综合",
                        icon: require("../../../assets/images/icon-synthesize.png"),
                    },
                    {
                        name: "价格",
                        icon: require("../../../assets/images/icon-price-rise.png"),
                    },
                    {
                        name: "销量",
                        icon: require("../../../assets/images/icon-sales-rise.png"),
                    },
                    {
                        name: "新品",
                        icon: require("../../../assets/images/icon-new.png"),
                    },
                ],
            }
        },
        props: {
            sortType: {
                type: String,
                required: true,
            }
        },
        methods: {
            switchButton(index) {
                switch (index) {
                    case 0:
                        if (index !== this.activityIndex) {
                            this.$emit('update:sortType', 'synthesize');
                        }
                        break;
                    case 1:
                        if (index !== this.activityIndex) {
                            this.$emit('update:sortType', 'priceRise');
                            this.buttonList[1].icon = require('../../../assets/images/icon-price-rise.png');
                        } else {
                            if (this.sortType === 'priceRise') {
                                this.$emit('update:sortType', 'priceDown');
                                this.buttonList[1].icon = require('../../../assets/images/icon-price-down.png');
                            } else {
                                this.$emit('update:sortType', 'priceRise');
                                this.buttonList[1].icon = require('../../../assets/images/icon-price-rise.png');
                            }
                        }
                        break;
                    case 2:
                        if (index !== this.activityIndex) {
                            this.$emit('update:sortType', 'salesRise');
                        }
                        break;
                    case 3:
                        if (index !== this.activityIndex) {
                            this.$emit('update:sortType', 'new');
                        }
                        break;
                }
                this.activityIndex = index;
            }
        }
    }
</script>

<style scoped lang="scss">
  .button-bar-main {
    display: flex;
    justify-content: center;
    overflow: hidden;
    background-color: $main-color0;
    padding-bottom: 8px;

    .button-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 22px;
      box-sizing: border-box;

      .name {
        color: white;
        font-size: 15px;
      }

      .icon {
        width: 13px;
        height: 13px;
        display: block;
        margin-left: 5px;
      }
    }

    .activity {
      .name {
        transform: scale(1.1, 1.1);
        transition: all .2s;
      }
    }

    .button-item:nth-child(1) {
      border-right: 1px solid white;
    }

    .button-item:nth-child(2) {
      border-right: 1px solid white;
    }

    .button-item:nth-child(3) {
      border-right: 1px solid white;
    }
  }
</style>