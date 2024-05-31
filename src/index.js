import GoravelCapchaVue from './components/Captcha.vue';
export { GoravelCapchaVue };

export default {
  install(app) {
    app.component('GoravelCapchaVue', GoravelCapchaVue);
  }
};