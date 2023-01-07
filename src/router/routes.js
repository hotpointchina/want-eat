
// import home from '../views/home'

export default [
    {
        path:'/',
        component: resolve => require(['../views/Home.vue'], resolve),
    },
    {
        path:'/Home',
        name:'Home',
        alias:'home',
        component: resolve => require(['../views/Home.vue'], resolve),
    },
    // {
    //     path:'/home',
    //     component: resolve => require(['../views/Home.vue'], resolve),
    // },
    {
        path:'/order',
        name:'order',
        component: resolve => require(['../views/order/order.vue'], resolve),
    },
    {
        path:'/success',
        name:'success',
        component: resolve => require(['../views/order/success.vue'], resolve),
        meta:{check:true}
    },
    
	
	
	
	
	
	
	
	
    {
        path:'*',
        name:'NotFound',
        component: resolve => require(['../views/NotFound.vue'], resolve),
    }
];
