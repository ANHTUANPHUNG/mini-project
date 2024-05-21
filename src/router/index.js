import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
	{
		name: 'register-login',
		path: '/',
		component: () => import('./../components/register-login'),
		redirect: {
			name: 'register-login.login',
		},
		children: [
			{
				name: 'register-login.login',
				path: '/login',
				component: () => import('./../components/register-login/login'),
			},
		]
	},
	{
		name: 'admin.dashboard',
		path: '/dashboard',
		component: () => import('./../components/dashboard'),
		redirect: {
			name: 'admin.dashboard.home',
		},
		children: [
			{
				name: 'admin.dashboard.home',
				path: '/admin/home',
				component: () => import('./../components/dashboard/list'),
			},
		]
	},
	{
		name: 'admin.food-menu.drink',
		path: '/admin/food-menu/drink',
		component: () => import('./../components/food-menu/drink'),
		redirect: {
			name: 'admin.food-menu.drink.list',
		},
		children: [
			{
				path: 'list',
				name: 'admin.food-menu.drink.list',
				component: () => import('./../components/food-menu/drink/list'),
			},
			{
				path: 'create',
				name: 'admin.food-menu.drink.create',
				component: () => import('./../components/food-menu/drink/create'),
			},
			{
				path: 'update/:id',
				name: 'admin.food-menu.drink.update',
				component: () => import('./../components/food-menu/drink/update'),
			},
		],
	},
	{
		name: 'admin.food-menu.food',
		path: '/admin/food-menu/food',
		component: () => import('./../components/food-menu/food'),
		redirect: {
			name: 'admin.food-menu.food.list',
		},
		children: [
			{
				path: 'list',
				name: 'admin.food-menu.food.list',
				component: () => import('./../components/food-menu/food/list'),
			},
			{
				path: 'create',
				name: 'admin.food-menu.food.create',
				component: () => import('./../components/food-menu/food/create'),
			},
			{
				path: 'update/:id',
				name: 'admin.food-menu.food.update',
				component: () => import('./../components/food-menu/food/update'),
			},
		],
	},
	{
		name: 'admin.food-menu.specialty',
		path: '/admin/food-menu/specialty',
		component: () => import('./../components/food-menu/specialty'),
		redirect: {
			name: 'admin.food-menu.specialty.list',
		},
		children: [
			{
				path: 'list',
				name: 'admin.food-menu.specialty.list',
				component: () => import('./../components/food-menu/specialty/list'),
			},
			{
				path: 'create',
				name: 'admin.food-menu.specialty.create',
				component: () => import('./../components/food-menu/specialty/create'),
			},
			{
				path: 'update/:id',
				name: 'admin.food-menu.specialty.update',
				component: () => import('./../components/food-menu/specialty/update'),
			},
		],
	},
	// {
	//   path: '/about',
	//   name: 'about',
	//   component: () => import('../views/AboutView.vue')
	// }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
