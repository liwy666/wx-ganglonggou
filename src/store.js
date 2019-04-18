import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import {fetch} from './http'

import {Toast} from 'vant';

Vue.use(Vuex);

var carts_ = JSON.parse(localStorage.getItem('carts') || '[]');
var carts_selected_ = [];
var user_token_ = VueCookies.get("gl_user_token");
/*初始化选中购物车*/
if (carts_.length > 0) {
    carts_.forEach(item => {
        if (item.selected === true) {
            carts_selected_.push(item);
        }
    })
}
/*初始化搜索历史*/
var hits_keyword_ = JSON.parse(localStorage.getItem('hits_keyword') || '[]');

let store = new Vuex.Store({
    state: {
        user_token: user_token_,//用户token
        login_type: "wxgllogin"//登录方式
        ,api_url:"https://api.ganglonggou.com"
        , parent_id: 203//主类
        ,goods_list:[]//商品列表
        , goods_info: {}//单个商品信息
        , goods_sku: []//单个商品规格
        , carts: carts_//购物车
        , carts_selected: carts_selected_ //选中的购物车
        , coupon_list: []//优惠券列表
        , address_list: []//地址列表
        , user_info: {}//用户信息
        , pay_list: []//支付列表
        , write_order_info: {
            pay_info: {},//提交订单时用户选中的支付方式信息
            invoice_info: {
                invoice_head: "",
                invoice_khh: "",
                invoice_kpdz: "",
                invoice_nsrsbh: "",
                invoice_phone: "",
                invoice_qymc: "",
                invoice_type: "不开票",
                invoice_yhzh: "",
                invoice_zj: "",
            },//提交订单时用户选中的开票方式信息
            coupon_info: {},//提交订单时用户选中的优惠券信息
            coupon_id: -1,//提交订单时用户选中的优惠券id
            use_integral: 0,//使用积分数量
            order_price: '0'//订单价格
        }//提交订单的页面信息
        , integral_name: "优点"//积分名称
        , order_list: []//订单列表
        ,cmd_keyword:['苹果','Mix3','平衡车','vivo','车载手机支架','华为nova4','mate20','mate20pro','iphone xs']//推荐搜索关键词
        ,hits_keyword:hits_keyword_//搜索历史记录
        ,recharge_info:{
            recharge_type : 'wx_0_balance',
            pay_code : '',
            bystages_id:'',
            bystages_code:'',
            recharge_price:100
        }//充值信息
        ,balance_list:[]//余额表单
    },
    mutations: {
        /**
         * 初始化商品详情
         * @param state
         * @param new_goods_info
         */
        setGoodsInfo(state, new_goods_info) {
            state.goods_info = {};
            if (new_goods_info !== "" && new_goods_info !== null) {
                Vue.set(state.goods_info, 'goods_name', new_goods_info.goods_name);
                Vue.set(state.goods_info, 'goods_id', new_goods_info.goods_id);
                Vue.set(state.goods_info, 'goods_sn', new_goods_info.goods_sn);
                Vue.set(state.goods_info, 'goods_morn_price', parseFloat(new_goods_info.shop_price));//商品底价
                Vue.set(state.goods_info, 'goods_stock', parseInt(new_goods_info.goods_number));//商品库存
                Vue.set(state.goods_info, 'one_goods_price', parseFloat(new_goods_info.shop_price));//当前商品单价
                Vue.set(state.goods_info, 'goods_price', parseFloat(new_goods_info.shop_price));//当前商品价格
                Vue.set(state.goods_info, 'promote_price', parseFloat(new_goods_info.promote_price));//预计库存
                Vue.set(state.goods_info, 'promote_start_date', parseFloat(new_goods_info.promote_start_date));//开始时间
                Vue.set(state.goods_info, 'promote_end_date', parseFloat(new_goods_info.promote_end_date));//结束时间
                Vue.set(state.goods_info, 'is_promote', parseFloat(new_goods_info.is_promote));//是否秒杀
                Vue.set(state.goods_info, 'goods_attribute_img', "");//当前属性图片
                Vue.set(state.goods_info, 'goods_number', 1);//所选商品数量
                Vue.set(state.goods_info, 'attr_desc', "");//所选属性详情
                Vue.set(state.goods_info, 'goods_attr_id', []);//所选属性id
                Vue.set(state.goods_info, 'give_integral', new_goods_info.give_integral);//购买商品可得积分
                Vue.set(state.goods_info, 'integral', new_goods_info.integral);//此件商品可用积分
                Vue.set(state.goods_info, 'give_integral_desc', "");//展现在页面上的此件商品可用积分
                Vue.set(state.goods_info, 'cat_id', new_goods_info.cat_id);//商品分类id
            }
        },
        /**
         * 初始化商品Sku
         * @param state
         * @param new_goods_info
         */
        initGoodsSku(state, new_goods_info) {
            state.goods_sku = [];
            if (new_goods_info !== "" && new_goods_info !== null) {
                if (new_goods_info.attr !== "" && new_goods_info.attr !== null && new_goods_info.attr.length !== 0) {//有规格
                    //遍历规格
                    Object.values(new_goods_info.attr).forEach(item => {
                        let idl1 = [];//临时容器
                        idl1.sku_title = item[0].attribute[0].attr_name;
                        idl1.sku_info = [];
                        item.forEach((item2, i) => {
                            let idl2 = {};//临时容器2
                            idl2.xz_flag = i === 0 ? true : false;
                            idl2.goods_attr_id = item2.goods_attr_id;
                            idl2.attr_id = item2.attr_id;
                            idl2.attr_value = item2.attr_value;
                            idl2.attr_price = item2.attr_price === "" ? 0 : parseFloat(item2.attr_price);
                            idl2.goods_attr_img = item2.goods_gallery === null ?
                                new_goods_info.goods_gallery[0].img_url : item2.goods_gallery.img_url;
                            idl1.sku_info.push(idl2);
                        });
                        state.goods_sku.push(idl1);
                    });
                    //遍历goods_sku得到最终商品价格
                    state.goods_sku.forEach((item, i) => {
                        if (i === 0) {
                            state.goods_info.attr_desc += item.sku_info[0].attr_value;
                        } else {
                            state.goods_info.attr_desc += "," + item.sku_info[0].attr_value;
                        }
                        item.sku_info.forEach((item2, i2) => {
                            if (i2 === 0) {
                                state.goods_info.goods_price = state.goods_info.goods_price
                                    + item2.attr_price;
                            }
                        });
                    });
                    state.goods_info.one_goods_price = (state.goods_info.goods_price).toFixed(2);
                    state.goods_info.goods_price = (state.goods_info.goods_price).toFixed(2);
                    state.goods_info.goods_attribute_img = state.goods_sku[0].sku_info[0].goods_attr_img;
                } else {//没有规格
                    state.goods_info.goods_attribute_img = new_goods_info.goods_gallery[0].img_url;
                    state.goods_info.goods_price = (parseFloat(new_goods_info.shop_price)).toFixed(2);
                }

                if (new_goods_info.give_integral === -1) {
                    state.goods_info.give_integral_desc = '购买可得' + parseInt(state.goods_info.goods_price) + state.integral_name;
                } else if (new_goods_info.give_integral > 0) {
                    state.goods_info.give_integral_desc = '购买可得' + parseInt(new_goods_info.give_integral) + state.integral_name;
                } else {
                    state.goods_info.give_integral_desc = '';
                }

            }
            //更新goods_info
            this.dispatch('updGoodsInfo');

        },
        /**
         * 切换商品属性
         * @param state
         * @param key
         */
        updGoodsSkuAttr(state, key) {
            if (state.goods_sku.length > 0) {
                //遍历对应goods_sku,将所有xz_flag赋值为false
                state.goods_sku[key.key1].sku_info.forEach((item2, i2) => {
                    Vue.set(state.goods_sku[key.key1].sku_info[i2], 'xz_flag', false)
                });
                //赋值对应xz_flag为true
                Vue.set(state.goods_sku[key.key1].sku_info[key.key2], 'xz_flag', true);
                let goods_sku_ = state.goods_sku;
                state.goods_sku = [];
                state.goods_sku = goods_sku_;
                //更新goods_info
                this.dispatch('updGoodsInfo');
            }
        },
        /**
         * 切换商品数量
         * @param state
         * @param number
         */
        updGoodsSkuNumber(state, number) {
            let data = {};
            data.goods_number = parseInt(number);
            let obj = Object.assign({}, state.goods_info, data);
            state.goods_info = {};
            state.goods_info = obj;
            //更新goods_info
            this.dispatch('updGoodsInfo');
        },

        /**
         * 添加购物车
         * @param state
         * @param goods_info
         */
        addCart(state, goods_info) {
            let data = JSON.parse(JSON.stringify(state.carts));
            // 假设 在购物车中，没有找到对应的商品
            let flag = false;

            /* 购物车初始化*/
            goods_info.cart_is = true;//购物车有效
            goods_info.selected = true;//购物车被选中

            data.some(item => {
                if (item.goods_id === goods_info.goods_id && item.attr_desc === goods_info.attr_desc) {
                    item.goods_number = parseInt(item.goods_number) + parseInt(goods_info.goods_number);
                    flag = true;
                    return true
                }
            });
            // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
            if (!flag) {
                data.unshift(goods_info)
            }
            //假设数量检测通过
            let check_flag = true;
            //检查购物商品数量是否大于商品库存符合标准
            data.forEach(item => {
                if (item.goods_number > item.goods_stock) {
                    check_flag = false;
                }
            });
            if (check_flag) {
                state.carts = JSON.parse(JSON.stringify(data));
                //更新购物车价格
                state.carts_selected = [];
                state.carts.forEach(item => {
                    Vue.set(item,'goods_price', (item.goods_number * item.one_goods_price).toFixed(2));
                    //遍历购物车，puse到carts_selected中
                    if (item.selected) {
                        state.carts_selected.push(item);
                    }
                });
                // 当 更新 carts 之后，把 carts 数组，存储到 本地的 localStorage 中
                localStorage.setItem('carts', JSON.stringify(state.carts));
                // 当 更新 carts 之后，把 carts 数组，存储到 本地的 localStorage 中
                localStorage.setItem('carts', JSON.stringify(state.carts));
                Toast.success({
                    message: '添加成功',
                    duration: 800
                });
            } else {
                Toast.fail({
                    message: '哎呀，库存不足了',
                    duration: 800
                });
            }
            return check_flag;
        },

        /**
         * 更新购物车
         * @param state
         * @param item
         */
        updCart(state, item) {
            let attr_desc = "";
            let attr_price = 0;
            if (item.goods_attr.length > 0) {
                item.goods_attr.forEach((item2, i2) => {
                    if (i2 === 0) {
                        attr_desc = item2.attr_value;
                    } else {
                        attr_desc += ',' + item2.attr_value;
                    }
                    attr_price += item2.attr_price === "" ? 0 : parseFloat(item2.attr_price);
                })
            } else {
                attr_desc = item.attr_desc;
            }
            //更新购物车
            let data = JSON.parse(JSON.stringify(state.carts));
            data.forEach((item3, i3) => {
                if (item3.goods_id === item.goods_id && item3.attr_desc === attr_desc) {
                    data[i3].cart_is = item.cart_is;
                    data[i3].goods_stock = parseInt(item.goods_stock);
                    data[i3].goods_morn_price = parseFloat(item.goods_morn_price);
                    data[i3].goods_name = item.goods_name;
                    data[i3].attr_desc = attr_desc;
                    data[i3].give_integral = item.give_integral;
                    data[i3].integral = item.integral;
                    data[i3].goods_price = parseFloat(item.goods_morn_price) + attr_price;
                    data[i3].one_goods_price = parseFloat(item.goods_morn_price) + attr_price;
                    data[i3].goods_price = data[i3].goods_price * data[i3].goods_number;
                    data[i3].goods_price = (data[i3].goods_price).toFixed(2);
                }
            });
            state.carts = JSON.parse(JSON.stringify(data));
            // 当 更新 carts 之后，把 carts 数组，存储到 本地的 localStorage 中
            localStorage.setItem('carts', JSON.stringify(state.carts));

        },

        /**
         * 更新购物车数量
         * @param state
         */
        updCartNumber(state, cart_info) {

            let index = (state.carts.findIndex(item => item.goods_id === cart_info.goods_id && item.attr_desc === cart_info.attr_desc));
            Vue.set(state.carts[index],'goods_number',cart_info.goods_number);
            //更新购物车价格
            state.carts.forEach(item => {
                Vue.set(item,'goods_price', (item.goods_number * item.one_goods_price).toFixed(2));
            });

            //遍历购物车，puse到carts_selected中
            state.carts_selected = [];
            state.carts.forEach(item => {
                if (item.selected) {
                    state.carts_selected.push(item);
                }
            });

            // 当 更新 carts 之后，把 carts 数组，存储到 本地的 localStorage 中
            localStorage.setItem('carts', JSON.stringify(state.carts));
        },

        /**
         * 删除购物车
         * @param state
         * @param cart_info
         */
        delCart(state, cart_info) {

            state.carts.splice(state.carts.findIndex(item => item.goods_id === cart_info.goods_id && item.attr_desc === cart_info.attr_desc), 1);

            // 当 更新 carts 之后，把 carts 数组，存储到 本地的 localStorage 中
            localStorage.setItem('carts', JSON.stringify(state.carts));

            //遍历购物车，puse到carts_selected中
            state.carts_selected = [];
            state.carts.forEach(item => {
                if (item.selected) {
                    state.carts_selected.push(item);
                }
            })

        },

        /**
         * 切换购物车选中状态
         * @param state
         * @param cart_info
         */
        updCartSelected(state, cart_info) {
            let index = (state.carts.findIndex(item => item.goods_id === cart_info.goods_id && item.attr_desc === cart_info.attr_desc));
            cart_info.selected = !cart_info.selected;
            state.carts[index].selected = cart_info.selected;

            //遍历购物车，puse到carts_selected中
            state.carts_selected = [];
            state.carts.forEach(item => {
                if (item.selected) {
                    state.carts_selected.push(item);
                }
            });

            // 当 更新 carts 之后，把 carts 数组，存储到 本地的 localStorage 中
            localStorage.setItem('carts', JSON.stringify(state.carts));

        },

        /**
         * 开启购物车选中状态
         * @param state
         * @param cart_info
         */
        openCartSelected(state, cart_info) {
            let index = (state.carts.findIndex(item => item.goods_id === cart_info.goods_id && item.attr_desc === cart_info.attr_desc));
            cart_info.selected = true;
            state.carts[index].selected = cart_info.selected;

            //遍历购物车，puse到carts_selected中
            state.carts_selected = [];
            state.carts.forEach(item => {
                if (item.selected) {
                    state.carts_selected.push(item);
                }
            });

            // 当 更新 carts 之后，把 carts 数组，存储到 本地的 localStorage 中
            localStorage.setItem('carts', JSON.stringify(state.carts));

        },

        /**
         * 保存token
         * @param state
         * @param user_token
         */
        setUserToken(state, user_token) {
            state.user_token = user_token;
            VueCookies.set("gl_user_token", user_token, '43200s');
        },

        /**
         * 修改默认地址
         * @param state
         * @param address_id
         */
        setIsDefaultAddress(state, address_id) {
            if (state.address_list.length > 0) {
                state.address_list.forEach(item => {
                    item.is_default = 0;
                });
                state.address_list.forEach(item => {
                    if (item.address_id === address_id) {
                        item.is_default = 1;
                    }

                })
            }
        },

        /**
         * 保存用户填写订单时选中支付信息
         * @param state
         * @param pay_info
         */
        setPayInfo(state, pay_info) {
            state.write_order_info.pay_info = pay_info;
        },
        /**
         * 保存用户填写开票信息
         * @param state
         * @param invoice_info
         */
        setInvoiceInfo(state, invoice_info) {
            state.write_order_info.invoice_info = invoice_info;
        },
        /**
         * 保存用户选择优惠券信息
         * @param state
         * @param coupon_info
         */
        setCouponInfo(state, coupon_info) {
            state.write_order_info.coupon_info = coupon_info.coupon_info;
            state.write_order_info.coupon_id = coupon_info.coupon_id;
        },
        /**
         * 保存用户使用积分数量
         * @param state
         * @param use_integral
         */
        setUseIntegral(state, use_integral) {
            state.write_order_info.use_integral = use_integral;
        },
        /*订单提交页面，保存最终订单价格*/
        setOrderPrice(state, val) {
            state.write_order_info.order_pric = JSON.parse(JSON.stringify(val));
        }
        /**
         * 新建收货地址
         * @param state
         * @param address_info
         */
        , addAddress(state, address_info) {
            state.address_list.push(address_info);
        }
    },
    actions: {
        /**
         * 更新商品信息
         * @param context
         */
        updGoodsInfo(context) {
            let data = {};
            data.goods_price = context.state.goods_info.goods_morn_price;
            data.give_integral_desc = '';
            data.goods_attr_id = [];
            context.state.goods_sku.forEach((item, i) => {
                item.sku_info.forEach((itme2) => {
                    if (itme2.xz_flag === true) {
                        //改变sku头部图片
                        data.goods_attribute_img = itme2.goods_attr_img;
                        //改变属性详情
                        if (i === 0) {
                            data.attr_desc = itme2.attr_value;
                        } else {
                            data.attr_desc += ',' + itme2.attr_value;
                        }
                        //改变商品价格
                        data.goods_price += parseFloat(itme2.attr_price);
                        //改变商品属性id
                        data.goods_attr_id.push(itme2.goods_attr_id);
                    }

                })
            });
            //格式化商品价格和乘以数量
            data.goods_price = (data.goods_price * parseInt(context.state.goods_info.goods_number)).toFixed(2);

            if (context.state.goods_info.give_integral === -1) {
                data.give_integral_desc = '购买可得' + parseInt(data.goods_price) + context.state.integral_name;
            } else if (context.state.give_integral > 0) {
                data.give_integral_desc = '购买可得' + parseInt(context.state.goods_info.give_integral) + context.state.integral_name;
            } else {
                data.give_integral_desc = '';
            }

            let obj = Object.assign({}, context.state.goods_info, data);
            context.state.goods_info = {};
            context.state.goods_info = obj;
        }

        /**
         * 数组深拷贝
         * @param arr
         * @returns {*}
         */
        , coppyArray(context, arr) {
            return arr.map((e) => {
                if (typeof e === 'object') {
                    return Object.assign({}, e);
                } else {
                    return e;
                }
            })
        }

        /**
         * 数组排序
         * @param property
         * @returns {function(*, *): number}
         */
        , compare(property) {
            return function (a, b) {
                let value1 = a[property];
                let value2 = b[property];
                return value1 - value2;
            }
        }

        /**
         * 获取地址列表
         * @param state
         */
        , getAddressList(context, user_token) {
            let toast1 = Toast.loading({
                mask: true,
                message: '获取地址列表',
                duration: 0
            });
            fetch('usergetaddress', {user_token: user_token})
                .then((msg) => {
                    Vue.set(context.state, 'address_list', msg);
                    toast1.clear();
                })
        }

        /**
         * 获取优惠券列表
         * @param state
         */
        , getCouponList(context, user_token) {
            let toast1 = Toast.loading({
                mask: true,
                message: '获取优惠券列表',
                duration: 0
            });
            fetch('user_coupon_list', {user_token: user_token})
                .then((msg) => {
                    Vue.set(context.state, 'coupon_list', msg);
                    toast1.clear();
                })
        }
        /**
         * 获取用户信息
         * @param context
         * @param user_token
         */
        , getUserInfo(context, user_token) {
            let toast1 = Toast.loading({
                mask: true,
                message: '获取用户信息',
                duration: 0
            });
            fetch('user_info', {user_token: user_token})
                .then((msg) => {
                    Vue.set(context.state, 'user_info', msg);
                    toast1.clear();
                })

        }
        /**
         * 获取支付列表
         * @param context
         * @param login_type
         */
        , getPayList(context, login_type) {
            let toast1 = Toast.loading({
                mask: true,
                message: '获取支付列表',
                duration: 0
            });
            fetch('user_get_pay_list', {login_type: login_type})
                .then((msg) => {
                    Vue.set(context.state, 'pay_list', msg);
                    toast1.clear();
                })

        }
        /**
         * 获取订单列表
         * @param context
         * @param user_token
         */
        , getOrderList(context, user_token) {
            let toast1 = Toast.loading({
                mask: true,
                message: '获取订单列表',
                duration: 0
            });
            fetch('user_get_all_order', {user_token: user_token})
                .then((msg) => {
                    Vue.set(context.state, 'order_list', msg);
                    toast1.clear();
                })
        }
        /**
         * 获取商品列表
         * @param context
         * @param user_token
         */
        , getGoodsList(context,index_type) {
            let toast1 = Toast.loading({
                mask: true,
                message: '获取商品列表',
                duration: 0
            });
            fetch('get_goods_list', {index_type:index_type})
                .then((msg) => {
                    Vue.set(context.state, 'goods_list', msg);
                    toast1.clear();
                })
        }

        /**
         * 获取余额列表
         * @param context
         * @param user_token
         */
        , getBalanceList(context,user_token) {
            let toast1 = Toast.loading({
                mask: true,
                message: '获取余额列表',
                duration: 0
            });
            fetch('user_get_balance_list', {user_token:user_token})
                .then((msg) => {
                    console.log(msg);
                    Vue.set(context.state, 'balance_list', msg);
                    toast1.clear();
                })
        }

    },
    getters: {
        getLoginType(state) {
            return state.login_type;
        },
        getParentId(state) {
            return state.parent_id;
        },
        getGoodsSku(state) {
            return state.goods_sku;
        },
        getGoodsInfo(state) {
            return state.goods_info;
        },
        /**
         * 返回购物车中商品总数量
         * @param state
         * @returns {number}
         */
        getCartsGoodsNumberCount(state) {
            let c = 0;
            if (state.carts.length > 0) {
                state.carts.forEach(item => {
                    c += item.goods_number
                });
            }
            return c
        },

        /**
         * 返回购物车总数
         * @param state
         * @returns {number}
         */
        getCartsCount(state) {
            let c = 0;
            if (state.carts.length > 0) {
                state.carts.forEach(function () {
                    c++;
                });

            }
            return c
        },

        /**
         * 返回选中购物车总数
         * @param state
         * @returns {number}
         */
        getCartsSelectedCount(state) {
            let c = 0;
            if (state.carts_selected.length > 0) {
                state.carts_selected.forEach(function () {
                    c++;
                });
            }
            return c
        },

        /**
         * 返回选中商品总价
         * @param state
         * @returns {string}
         */
        getCartsSelectedPrice(state) {
            let c = 0;
            if (state.carts.length > 0) {
                state.carts.forEach(item => {
                    if (item.selected === true) {
                        c += parseFloat(item.goods_price);
                    }
                });
            }
            return parseFloat(c).toFixed(2);
        }

        /**
         * 返回用户token
         * @param state
         * @returns {string}
         */
        , getUserToken(state) {

            let result = state.user_token;
            if (result === "" || result === null || typeof (result) === "undefined") {
                Toast("未获取到有效用户信息，建议您重新进入商城");
                return false;
            } else {
                return result;
            }
        }

        /**
         * 返回默认收货地址
         * @param state
         * @returns {string}
         */
        , getDefaultAddress(state) {

            let result = "";
            if (state.address_list.length > 0) {
                state.address_list.forEach(item => {
                    if (item.is_default === 1) {
                        result = item;
                    }
                })
            }

            return result;
        }

        /**
         * 返回收货地址
         * @param state
         * @returns {string}
         */
        , getAddressList(state) {
            return state.address_list;
        }
        /**
         * 返回选中商品
         * @param state
         * @returns {Array}
         */
        , getCartsSelected(state) {
            return state.carts_selected;
        }
        /**
         * 返回选中商品
         * @param state
         * @returns {Array}
         */
        , getCouponList(state) {
            return state.coupon_list;
        }
    }
});

// 把对象暴露出去
export default store
