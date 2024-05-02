import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import CKEditor from '@ckeditor/ckeditor5-vue2';
import axios from 'axios'
import VueAxios from "vue-axios";
import { FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import './plugins/axios-config.ts'


Vue.config.productionTip = false

Vue.use(CKEditor);
Vue.use(VueAxios, axios)
Vue.component('font-awesome-icon', FontAwesomeIcon)
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_BASE_URL

// eslint-disable-next-line no-console
console.log(process.env.VUE_APP_BACKEND_BASE_URL)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
