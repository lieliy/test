import axios from 'axios'
import Message from 'muse-ui-message'
import qs from 'qs'

// axios.defaults.baseURL = 'http://test.cqfuyuan.cn:8089'
// axios.defaults.timeout = 5000
var cancel;
var service = axios.create({
    baseURL: 'http://test.cqfuyuan.cn:8089',
    timeout: 5000
})

let token = localStorage.getItem('token')
axios.defaults.withCredentials = false
axios.defaults.headers.common['token'] = token
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'//配置请求头
const CancelToken = axios.CancelToken


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    return response;
}, function (error) {
    // Do something with response error
    // console.dir(error);
    Message.alert("服务器连接失败");
    return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    const res = response.data
    if (res.code === 2) {
        Message.alert("token失效，请重新登录").then(() => {
            this.$router.push('/login')
        })
    }
    return response
}, function (error) {
    // 对响应错误做点什么
    Message.alert(error.message)
    return Promise.reject(error)
});

export default {
    //get请求
    get(url, param) {
        //promise示例
        //   axios.post('/user', {
        //     firstName: 'Fred',
        //     lastName: 'Flintstone'
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   }); 
        return new Promise((resolve, reject) => {
            service({
                method: 'get',
                url,
                params: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {  //axios返回的是一个promise对象
                resolve(res.data)  //resolve在promise执行器内部 
            }).catch(err => {
                console.log(err, '异常')
            })

        })
    },
    //post请求
    post(url, param) {
        return new Promise((resolve, reject) => {
            service({
                method: 'post',
                url,
                data: qs.stringify(param),
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                // console.log(res)
                resolve(res.data)
            }).catch(err => {
                Message.alert(err.message)
                console.log(err, '异常')
            })
        })
    }
}