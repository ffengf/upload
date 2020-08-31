
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';


Vue.use(VueRouter);

const routes: RouteConfig[] = [
	{
		path: '/',
		redirect: '/uploadVideo',
		component: () => import('@/components/global/index.vue'),
		children: [
			{
				path: 'uploadVideo',
				component: () => import('@/views/uploadVideo/index.vue'),
				meta: {
					cache: true,
					title: '发布视频'
				}
			},
			{
				path: 'uploadArticle',
				component: () => import('@/views/uploadArticle/index.vue'),
				meta: {
					cache: true,
					title: '发布文章'
				}
			},
			{
				path: 'content',
				component: () => import('@/views/content/index.vue'),
				redirect:'/content/video',
				meta: {
					cache: true,
					title: '内容管理'
				},
				children: [
					{
						path: 'video',
						component: () => import('@/views/content/video/index.vue'),
						meta: {
							cache: true,
							title: '视频管理'
						}
					},
					{
						path: 'article',
						component: () => import('@/views/content/article/index.vue'),
						meta: {
							cache: true,
							title: '文章管理'
						}
					}
				]
			},
			{
				path: 'interaction',
				component: () => import('@/views/interaction/index.vue'),
				redirect:'/interaction/concern',
				meta: {
					cache: true,
					title: '互动管理'
				},
				children:[
					{
						path: 'concern',
						component: () => import('@/views/interaction/concern/index.vue'),
						meta: {
							cache: true,
							title: '关注列表'
						}
					},
					{
						path: 'fans',
						component: () => import('@/views/interaction/fans/index.vue'),
						meta: {
							cache: true,
							title: '关注列表'
						}
					}
				]
			},
			{
				path: 'data',
				component: () => import('@/views/data/index.vue'),
				redirect:'/data/video',
				meta: {
					cache: true,
					title: '数据管理'
				},
				children: [
					{
						path: 'video',
						component: () => import('@/views/data/video/index.vue'),
						meta: {
							cache: true,
							title: '视频数据'
						}
					},
					{
						path: 'article',
						component: () => import('@/views/data/article/index.vue'),
						meta: {
							cache: true,
							title: '文章数据'
						}
					}
				]
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			cache: false,
			title: '登录'
		}
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
