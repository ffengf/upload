/*
 * @Author: your name
 * @Date: 2020-07-28 11:41:45
 * @LastEditTime: 2020-07-29 13:26:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myapp\src\router\index.ts
 */
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	// base: process.env.BASE_URL,
	routes,
});

export default router;
