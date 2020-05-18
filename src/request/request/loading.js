import { Loading } from 'element-ui'
let loadNums = 0
let loadingInstance = null

function loadingShow() {
  loadNums++
  loadingInstance = Loading.service({
    fullscreen: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.8)'
  })
}

function loadingHide() {
  loadNums--;
  loadNums === 0 && loadingInstance && loadingInstance.close();
}

function loadingHideAll() {
  loadNums = 0;
  loadingInstance && loadingInstance.close()
}

function loadingShowLong(t) {
  loadingShow();
  setTimeout(() => {
    loadingHide();
  }, t || 0)
}
export {
  loadingShow,
  loadingHide,
  loadingHideAll,
  loadingShowLong
}

