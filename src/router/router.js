import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});


router.beforeEach((to, from, next) => {
    // console.log( ' routerBeforeEach from ', from );
    // console.log( ' routerBeforeEach to ', to );
    if( to.meta.check ){
        console.log( ' 需要检测 ');
        switch(from.path){
            case '/order':
                next();
                break;
            default:
                next('NotFound');
                break;
        }
    }else{
        next();
    }
})


export default router;