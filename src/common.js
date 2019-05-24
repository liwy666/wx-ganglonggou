export default {
    //公共常量
    $main_color0: '#cc0001',
    //$main_color0:'rgb(49,156,140)';
    $main_color1: 'rgba(251,0,0,0.1)',
    $main_color2: 'rgb(238,175,61)',
    $main_color4: 'rgba(251,0,0,0.6)',
    $main_color5: 'rgba(251,0,0,0.7)',
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
}