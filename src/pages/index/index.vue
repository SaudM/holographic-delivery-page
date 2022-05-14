<template>
  <div class="wrapper">
    <div class="dialogBox" @click="centerDialogVisible = false" v-if="centerDialogVisible">
      <div class="dialogCase" @click.stop="() => {}">
        <img class="closeDialog" @click="centerDialogVisible = false" src="@/assets/layout_close.png" draggable="false" />
        <div class="dialogTitle">咨询请添加“助理”</div>
        <div class="dialogTitle" @mousedown="touchstart('copyText')" @mouseup="touchend" @touchstart="touchstart('copyText')" @touchend="touchend">微信：quanxi-shuju</div>
        <div class="dialogTitle">或长按识别下方二维码</div>
        <img class="dialogQrcord" :src="qrCodeImg"  draggable="false" @mousedown="touchstart" @mouseup="touchend" @touchstart="touchstart" @touchend="touchend" />
      </div>
    </div>
    <div class="imgBox">
      <img class="oneImg" v-for="(item, index) in 3" :key="index" :src="require(`@/assets/img${index}.jpg`)" draggable="false" />
    </div>
    <button class="showQrcord" @click="centerDialogVisible = true">立即咨询</button>

  </div>
</template>
<script>
import { Message } from 'element-ui'
  export default {
    data () {
      return {
        longProssTimer: null,
        centerDialogVisible: false,
        qrCodeImg: 'https://fuli-img.oss-cn-beijing.aliyuncs.com/avatar/cq_weixin.png'
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
      touchstart (type) {
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
            return false
          }
          
          window.wx.previewImage({
          current: this.qrCodeImg,
          urls: [this.qrCodeImg]
        })
          
        }, 300);
      },
      touchend() {
        clearTimeout(this.longProssTimer)
      },

    },
    created () {
      
    },
    mounted () {

    }
  }
</script>
<style scoped lang="less">
  .wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .dialogBox{
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
      
      .dialogCase{
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

        .closeDialog{
          position: absolute;
          width: 40px;
          height: 40px;
          padding: 10px;
          right: 10px;
          top: 10px;
          
        }

        .dialogTitle{
          color: #333;
          margin-bottom: 10px;
          font-size: 20px;
        }
        .dialogQrcord{
          width: 140px;
          height: 140px;
        }


      }
    }
    .imgBox{
      width: 100%;
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .oneImg{
        width: 100%;
        display: block;
      }
    }
    .showQrcord{
      width: calc(~"100% - 80px");;
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