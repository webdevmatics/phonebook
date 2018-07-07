import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import store from '../store/index'

Vue.use(Router)
const router=new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
});

const openRoutes=['Login','Signup'];

router.beforeEach((to, from, next) => {
    
    if(openRoutes.includes(to.name)  ){
      next()
    } else if (store.getters.isAuthenticated){
      next()
    }else{
      next('/login')
    }

})



export default router
