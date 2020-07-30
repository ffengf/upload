
import Vue from 'vue';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue';
import router from './router';
import store from './store';
import "@/assets/css/reset.css"

import { ElMessageBoxShortcutMethod } from 'element-ui/types/message-box';
import { ElNotification } from 'element-ui/types/notification';
import { ElMessage } from 'element-ui/types/message';

Vue.use(Element)

Vue.config.productionTip = false;
declare module 'vue/types/vue' {
	interface Vue {
		$message: ElMessage,
		$alert:ElMessageBoxShortcutMethod,
		$notify: ElNotification
	}
  }
export const app = new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
