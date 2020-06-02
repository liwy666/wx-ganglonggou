import axios from 'axios';
import Qs from 'qs'
import {Toast} from 'vant';
import VueCookies from 'vue-cookies'

axios.defaults.timeout = 5000;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
//axios.defaults.baseURL = 'https://test-api.ganglonggou.com/api/v1';
//axios.defaults.baseURL = 'http://192.168.0.37:8004/api/v1';


//http request 拦截器
axios.interceptors.request.use(
    config => {
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        config.validateStatus = function (status) {
            return status >= 200 && status <= 400; // 默认的
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.error_code !== undefined) {
            const tokenName = process.env.VUE_APP_USER_TOKEN_NAME;
            switch (response.data.error_code) {
                case 10002:
                    VueCookies.remove(tokenName);
                    Toast.clear();
                    Toast.fail({
                        message: '非常抱歉，我们不能获取到您的用户信息，请尝试重新进入商城',
                        duration: 4000
                    });
                    location.reload(true);
                    break;
                case 10006:
                    VueCookies.remove(tokenName);
                    let oldUrl = window.location.toString();
                    let url = oldUrl.replace(window.location.search, '');
                    window.location.href = url;
                    break;
                default:
                    Toast.fail({
                        message: response.data.msg,
                        duration: 2000
                    });
            }

            return false;
        } else {
            return response.data;
        }
    },
    error => {
        //Toast("发生未知错误" + error);
        console.log("发生未知错误" + error);
        return false;
    }
);


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装单个图片上传方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function imgUpload(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, Qs.stringify(data))
            .then(response => {
                resolve(response);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}