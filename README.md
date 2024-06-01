# goravel-captcha-vue
基于[go-captcha-vue](https://github.com/wenlng/go-captcha-vue)的二次开发,

## 一、安装
`npm install goravel-captcha-vue`
## 二、配置
导入组件`import GoravelCaptchaVue from 'goravel-captcha-vue'`
确保样式文件被引入`import 'goravel-captcha-vue/dist/style.css';`
## 三、功能概述,与后端[goravel-captcha](https://github.com/hulutech-web/goravel-captcha)搭配使用
demo
```
<script setup>
import {ref} from 'vue'
import GoravelCaptchaVue from 'goravel-captcha-vue';
import 'goravel-captcha-vue/dist/style.css'; // 确保样式文件被引入
const checkCaptOk = ref(false);
const authLogin = () => {
  if (checkCaptOk.value) {
    console.log("success")
  } else {
    console.log("fail")
  }
};

const checkCaptcallback = (e) => {
  e == "success" ? (checkCaptOk.value = true) : (checkCaptOk.value = false);
};
</script>

<template>
  <div>
    <GoravelCaptchaVue @checkCapt="checkCaptcallback" :baseUrl="'http://localhost:3000'" />
  </div>
</template>

<style scoped></style>

```
### 六、预览效果，前端由[goravel-captcha-vue](https://github.com/wenlng/go-captcha-vue)提供，无需自行实现
![image](https://github.com/hulutech-web/goravel-captcha-vue/blob/master/images/default.png?raw=true)
![image](https://github.com/hulutech-web/goravel-captcha-vue/blob/master/images/success.png?raw=true)
![image](https://github.com/hulutech-web/goravel-captcha-vue/blob/master/images/validated.png?raw=true)
![image](https://github.com/hulutech-web/goravel-captcha-vue/blob/master/images/validating.png?raw=true)
