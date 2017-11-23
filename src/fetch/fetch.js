/**
 * Created by jsb-cpyy on 2017/8/22.
 */
import axios from 'axios'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL ='/action'; // '/action';

//POST传参序列化
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
     config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  // _.toast("错误的传参", 'fail');
  return Promise.reject(error);
});

//返回状态判断 返回状态拦截器
axios.interceptors.response.use((res) =>{
  if(!res.data.status){
    // _.toast(res.data.msg);
    return Promise.reject(res);
  }else if(res.data.status==999){
      window.location.href=window.location.href.split("#")[0]+"#/login";
  }
  return res;
}, (error) => {
  console.log("网络异常", 'fail');
  return Promise.reject(error);
});

// export function fetch(url, params) {
//   return new Promise((resolve, reject) => {
//     let token = localStorage.getItem("token");
//     let config= {headers:{}};
//     if (token ){
//       config.headers.token=token;
//     }
//     axios.post(url, params,config)
//       .then(response => {
//         resolve(response.data);
//       }, err => {
//         reject(err);
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }
export function fetch(url, params,methodType) {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    let config = {token:token};
    var axiosConfig={
      method: methodType || "post",
      headers:config,
      url:url
    }
    if(methodType == "get"){
      axiosConfig.params=params
    }else {
      axiosConfig.data=params
    }
    axios(axiosConfig).then(response => {
      resolve(response.data);
    }, err => {
      reject(err);
    })
      .catch((error) => {
        reject(error)
      });
  })
}
