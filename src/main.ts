
import Vue, { VNode } from 'vue';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue';
import router from './router';
import store from './module';
import "@/assets/css/reset.css"

import { ElMessageBoxShortcutMethod } from 'element-ui/types/message-box';
import { ElNotification } from 'element-ui/types/notification';
import { ElMessage } from 'element-ui/types/message';
import VueRouter from 'vue-router';
import { UserModule } from './module/user';




Vue.use(Element)

//跳转相同路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: import("vue-router").RawLocation) {
	//@ts-ignore
	return originalPush.call(this, location).catch((err: any) => err)
}

router.afterEach((to) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}
	window.scrollTo(0, 0)
})

router.beforeEach((to, form, next) => {
	if (to.meta.without_auth === true) {
		return next()
	} else {
		if (UserModule.token !== null) {
			return next()
		} else {
			UserModule.logout()
			return next('/login')
		}
	}
})


Vue.config.productionTip = false;
declare module 'vue/types/vue' {
	interface Vue {
		$message: ElMessage,
		$alert: ElMessageBoxShortcutMethod,
		$notify: ElNotification,
	}
}
export const app = new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
