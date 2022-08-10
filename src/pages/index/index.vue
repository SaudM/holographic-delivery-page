<template>
  <div class="wrapper">
    <div class="dialogBox" @click="centerDialogVisible = false" v-if="centerDialogVisible">
      <div class="dialogCase" @click.stop="() => { }">
        <img class="closeDialog" @click="centerDialogVisible = false" src="@/assets/layout_close.png"
          draggable="false" />
        <div class="dialogTitle">请添加助理微信</div>
        <div class="dialogTitle" @mousedown="touchstart('copyText')" @mouseup="touchend"
          @touchstart="touchstart('copyText')" @touchend="touchend">复制微信号:quanxi-shuju</div>
        <div class="dialogTitle">扫一扫二维码加好友</div>
        <img class="dialogQrcord" :src="qrCodeImg" draggable="false" @mousedown="touchstart" @mouseup="touchend"
          @touchstart="touchstart" @touchend="touchend" />
      </div>
    </div>
    <div class="contentBox">
      <img class="oneImg" v-for="(item, index) in 4" :key="index" :src="require(`@/assets/img${index}.jpg`)"
        draggable="false" />
      <div class="submitFormBox" v-if="!isMobile">
        <div class="submitOne" v-for="(item, index) in ['您的名字', '您的电话']" :key="index">
          {{ item }}<span class="submitMark">*</span><input class="submitInput" type="text" v-model="submitArr[index]"
            :placeholder="`请输入${item}`">
        </div>
      </div>

      <div class="yhys">
        同意并查看
        <a href="https://web.fulitimes.com/web/yhys.html">《个人信息授权与保护声明》</a>
        授权范围
      </div>
      <div class="companyIntroduce">
        <div class="introduceOne" v-for="(item, index) in companyArr" :key="index">
          <span class="introduceText">{{ item.title }}</span>
          <span class="introduceCont">{{ item.cont }}</span>
        </div>
      </div>
    </div>
    <button class="showQrcord" @click="clickSubmitButton">{{ isMobile ? '立即咨询' : '提 交' }}</button>

  </div>
</template>
<script>
import { Message } from 'element-ui'
export default {

  data() {
    return {
      longProssTimer: null,
      centerDialogVisible: false,
      qrCodeImg: 'https://fuli-img.oss-cn-beijing.aliyuncs.com/avatar/cq-v3.png',
      isMobile: ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"].some(value => navigator.userAgent.includes(value)),
      submitArr: [],
      companyArr: [
        { title: '公司：', cont: '厦门小尺子集团股份有限公司' },
        { title: '地址：', cont: '中国(福建)自由贸易试验区厦门片区翔云一路40号盛通中心之二A区1212单元' },
        { title: '电话：', cont: '18599001010' },
      ]
    }
  },
  components: {
  },
  props: [],
  watch: {

  },
  computed: {

  },
  methods: {
    touchstart(type) {
      this.longProssTimer = setTimeout(() => {
        if (type === 'copyText') {
          const inputEl = document.createElement('input')
          inputEl.setAttribute('readonly', 'readonly')
          inputEl.value = 'quanxi-shuju'
          document.body.appendChild(inputEl)
          inputEl.select()
          document.execCommand('copy')
          Message.success('复制成功')
          document.body.removeChild(inputEl)
          _ks_trace.push({
            event: 'form', convertId: 473566, cb: function () {
              // console.log('Your callback function here!')
            }
          })
          return false
        }

        window.wx.previewImage({
          current: this.qrCodeImg,
          urls: [this.qrCodeImg],
        });

      }, 300);
    },
    touchend() {
      clearTimeout(this.longProssTimer)
    },
    clickSubmitButton() {
      if (this.isMobile) {
        this.centerDialogVisible = true
        return false
      }
      if (!this.submitArr[0] || !this.submitArr[1]) {
        Message.error(!this.submitArr[0] ? '请输入姓名' : '请输入电话')
        return false
      }
      Message.success('提交成功')
      this.submitArr = []
    },
  },
  created() {

  },
  mounted() {

  }
}
</script>
<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .dialogBox {
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    .dialogCase {
      width: calc(~"100% - 100px");
      max-width: 500px;
      background: #fff;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 0 50px;
      position: relative;

      .closeDialog {
        position: absolute;
        width: 40px;
        height: 40px;
        padding: 10px;
        right: 10px;
        top: 10px;

      }

      .dialogTitle {
        color: #333;
        margin-bottom: 10px;
        font-size: 20px;
      }

      .dialogQrcord {
        width: 140px;
        height: 140px;
      }


    }
  }

  .contentBox {
    width: 100%;
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    .oneImg {
      width: 100%;
      display: block;
    }

    .yhys {
      padding: 24px;
      color: #000000;
      text-align: start;

      a:link {
        font-size: 15px;

        color: #0455e2;
        text-decoration: none;
        text-decoration-line: none
      }

      a:visited {
        font-size: 15px;
        color: #033da0;
        text-decoration: none;
      }

      a:hover {
        font-size: 15px;
        color: #999999;
        text-decoration: underline;
      }
    }

    .submitFormBox {
      width: 100%;
      background: #fff;
      padding: 24px;

      .submitOne {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 14px;

        .submitMark {
          color: #f66;
          margin: 0 4px 0 6px;
          height: 12px;
        }

        .submitInput {
          flex: 1;
          height: 40px;
          color: #999;
          border-bottom: 1px solid #ccc;
        }
      }
    }

    .companyIntroduce {
      width: 100%;
      background: #eee;
      padding: 12px 24px;

      .introduceOne {
        line-height: 17px;
        font-size: 15px;
        margin: 8px 0;
        color: #999;
        display: inline-block;
        width: 100%;
        text-align: left;
      }
    }
  }



  .showQrcord {
    width: calc(~"100% - 80px");
    margin: 10px auto 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(15, 34, 222);
    color: #fff;
    font-size: 20px;
    border: none;
    border-radius: 25px;
  }

}
</style>