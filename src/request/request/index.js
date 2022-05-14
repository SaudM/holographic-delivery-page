import axios from 'axios'
import { Message } from 'element-ui'
import { loadingShow, loadingHide } from './loading.js'
import cookies from '@/utils/cookies'
const errorCodeListLogout = [1003, 1006, 1007, 1009, 1012, 100300001, 100300002, 100300003];

function Axios (url, params, type = 'post', autoLoad = false, autoError = false, serviceUrl) {
  autoLoad && loadingShow()
  let headers = {
    "Content-Type": "application/json", 
    "x-web-grayscale-version": "grayscaleDefaultValue"
  }
  if(cookies.getItem('stuLogin') === 'yes'){
    headers.token = cookies.getItem('ptaxxsspc');
    headers.ptaxxsspc = cookies.getItem('ptaxxsspc');
    headers.ptaxxsspcUserId = cookies.getItem('uid');
  } else {
    headers.token = cookies.getItem('ptaxxssmainpc');
    headers.ptaxxssmainpc = cookies.getItem('ptaxxssmainpc');
    headers.ptaxxssmainpcUserId = cookies.getItem('uid');
  }
  let getOrPost = type === 'get' ? axios.get(serviceUrl || url, {headers} ) : axios.post(serviceUrl || url, params, {headers});
  getOrPost.then(res => {
    autoLoad && loadingHide()
    if (errorCodeListLogout.includes(res.errorCode) && autoError) {
      let message = res.errorMessage || '请求失败！';
      Message({
        type: 'error',
        message: message
      })
    }
  }).catch(error => {
    autoLoad && loadingHide();
    let message = '请求失败';
    error.response && error.response.status && error.response.status == 504 && (message = '服务器端错误');
    error.response && error.response.status && error.response.status == 404 && (message = '请求地址未找到');
    error.response && error.response.status && error.response.status == 403 && (message = '权限不足');
    autoError && Message({
      type: 'error',
      message: message
    })
  })
  return getOrPost;
}

export default Axios
