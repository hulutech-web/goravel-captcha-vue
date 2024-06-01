import GoravelCaptchaVue from './components/Captcha.vue';
import 'ant-design-vue/dist/reset.css';
export { GoravelCaptchaVue };

export default {
  install(app) {
    app.component('GoravelCaptchaVue', GoravelCaptchaVue);
  }
};