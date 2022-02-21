import Vue from 'vue';
import VueRouter from 'vue-router';
///<inject_import>
Vue.use(VueRouter);

const routes = [
    ///<inject_routes>
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
