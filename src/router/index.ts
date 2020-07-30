
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import transition from '@/components/transition/index.vue'

Vue.use(VueRouter);

const routes: RouteConfig[] = [
	{
		path: '/',
		redirect: '/home',
		component: transition,
		children: []
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '*',
		redirect: '/login'
	}
];

const router = new VueRouter({
	mode: 'history',
	// base: process.env.BASE_URL,
	routes,
});

export default router;
