<template>
  <div class="go-captcha-wrap">
    <GoCaptchaBtnDialog class="go-captcha-btn" v-model="captStatus" width="100%" height="50px"
      :image-base64="captBase64" :thumb-base64="captThumbBase64" @confirm="handleConfirm"
      @refresh="handleRequestCaptCode" />
  </div>
</template>
<script>
import GoCaptchaBtnDialog from './GoCaptchaBtnDialog.vue'
import { ref } from 'vue'
import { message } from "ant-design-vue";
import axios from 'axios'
import lodash from "lodash";
export default {
  emits: ["checkCapt"],
  components: {
    GoCaptchaBtnDialog
  },
  props:{
    baseUrl: {
      type: String,
      default: "http://localhost:3000"
    }
  },
  setup(props, ctx) {
    const needCapt = ref(false);
    const popoverVisible = ref(true);
    const captBase64 = ref("");
    const captThumbBase64 = ref("");
    const captKey = ref("");
    const captStatus = ref("default");
    const captExpires = ref(0);
    const captAutoRefreshCount = ref(0);

    const handleRequestCaptCode = async () => {
      captBase64.value = "";
      captThumbBase64.value = "";
      captKey.value = "";
      const { data } = await axios.get(`${props.baseUrl}/api/captcha`)
      if ((data.code || 0) === 0) {
        if (lodash.isEmpty(data)) {
          return;
        }
        captBase64.value = data["image"] || "";
        captThumbBase64.value = data["thumb_image"] || "";
        captKey.value = data["key"] || "";
      } else {
        messageApi.info("获取人机验证数据失败");
      }
    };

    const handleConfirm = async (dots) => {
      if (lodash.size(dots) <= 0) {
        messageApi.error("请进行人机验证再操作");
        return;
      }

      let dotArr = [];
      lodash.forEach(dots, (dot) => {
        dotArr.push(dot.x, dot.y);
      });
      const formData = {
        dots: dotArr.join(","),
        key: captKey.value,
      };
      const {data} = await axios.post(`${props.baseUrl}/api/captcha`,formData);
      if (data["code"] && data["code"] === 200) {
        captStatus.value = "success";
        captAutoRefreshCount.value = 0;
      } else {
        if (captAutoRefreshCount.value > 5) {
          message.success("人机验证失败，请重新尝试")
          captAutoRefreshCount.value = 0;
          captStatus.value = "over";
        }
        handleRequestCaptCode();
        captAutoRefreshCount.value += 1;
        captStatus.value = "error";
      }
      ctx.emit("checkCapt", captStatus.value);
    };

    return {
      needCapt,
      popoverVisible,
      captBase64,
      captThumbBase64,
      captKey,
      captStatus,
      captExpires,
      captAutoRefreshCount,
      handleRequestCaptCode,
      handleConfirm,
    };
  },
};
</script>
<style>
body {
  margin: 0;
  position: relative;
  /* padding-bottom: 1200px; */
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}

.go-captcha-btn {
  width: 300px !important;
  margin: 0 auto !important;
}

.wg-cap-tip {
  padding: 50px 0 100px;
  font-size: 13px;
  color: #76839b;
  text-align: center;
  line-height: 180%;
  width: 100%;
  max-width: 680px;
}

.wg-cap-tip a {
  display: inline-block;
  margin: 0 5px;
}

.wg-cap-tip a img {
  height: 28px;
}

.wg-cap-tip>span {
  margin: 0 5px;
}
</style>
