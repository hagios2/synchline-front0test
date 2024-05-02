import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Vue from 'vue'
import Router from 'vue-router';
import Register from "@/views/Register.vue";


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/register",
            component: Register,
        }
    ]
})

export default router
