import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "./views/Home.vue";
import Dashboard from './views/Dashboard.vue';
import Card from "./views/Card.vue";
import dashboardProducteur from './views/dashboardProducteur.vue';
//import dashboardClient from './views/dashboardClient.vue';
import Basket from './views/Basket.vue';
import Login from "./login/Login.vue";
import { Role } from './_helpers/role';
import { authenticationService } from '../dashboard/_services/authentication.service'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/confitures',
            name: 'confitures',
            component: Card,
        },

         {
            path: '/login',
            name: 'login',
            component: Login,
       
        },

        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: { authorize: [Role.Admin] }
        },

        {
            path: '/dashboardProducteur',
            name: 'producteur',
            component: dashboardProducteur,
            meta: { authorize: [Role.Producteur] }
        },
        /*  {
            path: '/dashboardClient',
            name: 'client',
            component: dashboardClient,
            meta: { authorize: [Role.Producteur] }
        },  */
        {
            path:'/basket',
            name: 'basket',
            component: Basket,
        },
    ]
})


router.beforeEach((to, from, next) => {

    // redirect to login page if not logged in and trying to access a restricted page
    const { authorize } = to.meta;

    if (authorize && !_.isEmpty(authorize)) {

        const currentUser = authenticationService.currentUserValue;

        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return next({ path: "/login", query: { returnUrl: to.path } });
        }

        // check if route is restricted by role
        if (authorize.length && !authorize.includes(currentUser.role.name)) {
            // role not authorised so redirect to home page
            return next({ path: "/" });
        }

    }

    return next();
});




export default router;



