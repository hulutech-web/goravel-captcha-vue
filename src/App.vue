<script setup>
import {ref} from 'vue'
import Captcha from './components/Captcha.vue'
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
    <Captcha @checkCapt="checkCaptcallback" :baseUrl="'http://localhost:3000'" />
  </div>
</template>

<style scoped></style>
