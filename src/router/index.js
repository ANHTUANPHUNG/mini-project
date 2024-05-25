import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
	{
		name: 'user',
		path: '/',
		component: () => import('./../components/user/index.vue'),
		redirect: {
			name: 'user.home',
		},
		children: [
			{
				name: 'user.home',
				path: 'user/home',
				component: () => import('./../components/user/partials/home.vue'),
			},
			{
				name: 'user.food',
				path: 'user/food',
				component: () => import('./../components/user/partials/food-user.vue'),
			},
			{
				name: 'user.drink',
				path: 'user/drink',
				component: () => import('./../components/user/partials/drink-user.vue'),
			},
			{
				name: 'user.specialty',
				path: 'user/specialty',
				component: () => import('./../components/user/partials/specialty-user.vue'),
			},
			{
				name: 'user.detail',
				path: 'user/detail/:id/:type',
				component: () => import('./../components/user/partials/detail-user.vue'),
			},
			{
				name: 'user.cart',
				path: 'user/cart',
				component: () => import('./../components/user/partials/cart-user.vue'),
			},
			{
				name: 'user.order',
				path: 'user/order',
				component: () => import('../components/user/partials/order-user.vue'),
			},
		]
	},
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
				path: '/register-login',
				component: () => import('./../components/register-login/login'),
			},
		]
	},
	{
		name: 'admin.dashboard',
		path: '/dashboard',
		component: () => import('./../components/app/index'),
		redirect: {
			name: 'admin.dashboard.home',
		},
		children: [
			{
				name: 'admin.dashboard.home',
				path: '/admin/home',
				component: () => import('./../components/app/dashboard/list'),
			},
			{
				name: 'admin.food-menu.drink',
				path: '/admin/food-menu/drink',
				component: () => import('./../components/app/food-menu/drink'),
				redirect: {
					name: 'admin.food-menu.drink.list',
				},
				children: [
					{
						path: 'list',
						name: 'admin.food-menu.drink.list',
						component: () => import('./../components/app/food-menu/drink/list'),
					},
					{
						path: 'create',
						name: 'admin.food-menu.drink.create',
						component: () => import('./../components/app/food-menu/drink/create'),
					},
					{
						path: 'update/:id',
						name: 'admin.food-menu.drink.update',
						component: () => import('./../components/app/food-menu/drink/update'),
					},
				],
			},
			{
				name: 'admin.food-menu.food',
				path: '/admin/food-menu/food',
				component: () => import('./../components/app/food-menu/food'),
				redirect: {
					name: 'admin.food-menu.food.list',
				},
				children: [
					{
						path: 'list',
						name: 'admin.food-menu.food.list',
						component: () => import('./../components/app/food-menu/food/list'),
					},
					{
						path: 'create',
						name: 'admin.food-menu.food.create',
						component: () => import('./../components/app/food-menu/food/create'),
					},
					{
						path: 'update/:id',
						name: 'admin.food-menu.food.update',
						component: () => import('./../components/app/food-menu/food/update'),
					},
				],
			},
			{
				name: 'admin.food-menu.specialty',
				path: '/admin/food-menu/specialty',
				component: () => import('./../components/app/food-menu/specialty'),
				redirect: {
					name: 'admin.food-menu.specialty.list',
				},
				children: [
					{
						path: 'list',
						name: 'admin.food-menu.specialty.list',
						component: () => import('./../components/app/food-menu/specialty/list'),
					},
					{
						path: 'create',
						name: 'admin.food-menu.specialty.create',
						component: () => import('./../components/app/food-menu/specialty/create'),
					},
					{
						path: 'update/:id',
						name: 'admin.food-menu.specialty.update',
						component: () => import('./../components/app/food-menu/specialty/update'),
					},
				],
			},
		]
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
