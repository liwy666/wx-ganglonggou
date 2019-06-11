export default {
    //公共常量
    //岗隆
    /* $main_color0: '#cc0001',
     $main_color1: 'rgba(251,0,0,0.1)',
     $main_color2: 'rgb(238,175,61)',
     $main_color4: 'rgba(251,0,0,0.6)',
     $main_color5: 'rgba(251,0,0,0.7)',*/

    //农行
    $main_color0: 'rgb(49,156,140)',
    $main_color1: 'rgba(49, 156, 140, 0.1)',
    $main_color2: 'rgb(123, 162, 63)',
    $main_color4: 'rgba(49, 156, 140, 0.6)',
    $main_color5: 'rgba(93, 172, 129)',

    /**
     * 时间戳格式化
     * @param fmt
     * @param date
     * @returns {*}
     */
    dateFtt(fmt, date) { //author: meizz
        let o = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },

    /**
     * 格式化时间字符串转时间戳
     * @param str
     * @param type
     * @returns {number}
     */
    strToDateTime(str, type) {
        let date = str.substring(0, 19);
        date = str.replace(/-/g, '/');
        let timestamp = 0;
        if (type === 's') {
            timestamp = parseInt(new Date(date).getTime()) / 1000;
        } else if (type === 'ms') {
            timestamp = parseInt(new Date(date).getTime());
        }
        return timestamp;
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
    },
    /**
     * 筛选重复
     * @param bigArray
     * @returns {Array}
     */
    merge(bigArray) {
        let array = [];
        if (bigArray.length > 1) {
            const middeleArray = bigArray.reduce((a, b) => {
                return a.concat(b);
            });
            middeleArray.sort((this.compare('coupon_id')));
            for (let i = 0; i < middeleArray.length;) {
                let count = 0;
                for (let j = i; j < middeleArray.length; j++) {
                    if (middeleArray[i].coupon_id === middeleArray[j].coupon_id) {
                        count++;
                    }
                }
                if (count > 1) {
                    array.push(middeleArray[i]);
                }
                i += count;
            }
        } else {
            array = bigArray;
        }
        return array;
    },
    /**
     * 筛选不重复
     * @param arr1
     * @param arr2
     * @returns {*}
     */
    getArrDifference(arr1, arr2) {
        if (arr1.length > 0 && arr2.length > 0) {
            return arr1.concat(arr2).filter(function (v, i, arr) {
                return arr.indexOf(v) === arr.lastIndexOf(v);
            });
        } else {
            return [];
        }
    },
    /**
     * 筛选不重复
     * @param array1
     * @param array2
     * @returns {*}
     */
    getArrDifference2(array1, array2) {
        let result = [];
        if (array1.length > 0 && array2.length > 0) {
            for (let i = 0; i < array2.length; i++) {
                let obj = array2[i];
                let num = obj.coupon_id;
                let isExist = false;
                for (let j = 0; j < array1.length; j++) {
                    let aj = array1[j];
                    let n = aj.coupon_id;
                    if (n === num) {
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    result.push(obj);
                }
            }
        }
        return result;
    },

}