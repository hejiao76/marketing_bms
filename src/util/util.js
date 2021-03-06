/**
 * Created by jsb-cpyy on 2017/7/21.
 */
/**
 * 格式化时间
 *
 * @param {String} str
 * @returns 格式化后的时间
 */
export function getCommonParam () {
  let param = {common : {
    userid:localStorage.getItem("userid"),
    username:localStorage.getItem("username"),
    token:localStorage.getItem("token")
  }} ;
  return param;
}
// export function getCommonParam () {
//   let param = {common : {
//     userid:localStorage.getItem("userid"),
//     username:localStorage.getItem("username"),
//     token:localStorage.getItem("token")
//   }} ;
//   return param;
// }
export function getPostParam (data,paramHead){
  let newPostData={};
  if(data){
    if(paramHead){
      newPostData={paramHead:JSON.stringify(data)};
    }else{
      newPostData={"jsonData":JSON.stringify(data)}
    }
  }
  return newPostData;
}
/**
 * 日期类型转换成时间(yyyy-MM-dd)
 */
export function dateObjToString(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  // var hour = date.getHours();
  // var minute = date.getMinutes();
  // var second = date.getSeconds();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  // hour = hour < 10 ? "0" + hour : hour;
  // minute = minute < 10 ? "0" + minute : minute;
  // second = second < 10 ? "0" + second : second;
  return ( year+"-"+month + "-" + day);
}
/**
 * 日期转换成时间(yyyy-MM-dd hh:mm:ss)
 */
export function dateObjToFullString(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return ( year+"-"+month + "-" + day + " " + hour + ":" + minute+":"+second);
}
/**
 * 长整型转换成时间(yyyy-MM-dd)
 */
export function toDateString(l_date) {
  var date = new Date();
  date.setTime(l_date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  // var hour = date.getHours();
  // var minute = date.getMinutes();
  // var second = date.getSeconds();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  // hour = hour < 10 ? "0" + hour : hour;
  // minute = minute < 10 ? "0" + minute : minute;
  // second = second < 10 ? "0" + second : second;
  return ( year+"-"+month + "-" + day);
}
/**
 * 长整型转换成时间(yyyy-MM-dd hh:mm:ss)
 */
export function toFullDateString(l_date) {
  var date = new Date();
  date.setTime(l_date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return ( year+"-"+month + "-" + day + " " + hour + ":" + minute+":"+second);
}
/**
 * 解析URL参数
 * @param url
 * @param name
 * @returns {*}
 */
export function getUrlParam (url, name) {
  var pattern = new RegExp("[?&]" + name + "=([^&^#]+)", "g");
  var matcher = pattern.exec(url);
  var items = null;
  if (null != matcher) {
    try {
      items = decodeURIComponent(decodeURIComponent(matcher[1]));
    } catch (e) {
      try {
        items = decodeURIComponent(matcher[1]);
      } catch (e) {
        items = matcher[1];
      }
    }
  }
  return items;
}
export function checkMobile(phone){
  if(!(/^1[34578]\d{9}$/.test(phone))){
    return false;
  }
  return true;
}
