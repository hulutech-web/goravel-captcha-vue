import GoravelCaptchaVue from './components/Captcha.vue';
export { GoravelCaptchaVue };

export default {
  install(app) {
    app.component('GoravelCaptchaVue', GoravelCaptchaVue);
  }
};