import Vue from 'vue'
import vueRouter from 'vue-router'

const home = () => import('../views/home/Home')
const cart = () => import('../views/cart/Cart')
const category = () => import('../views/category/Category')
const profile = () => import('../views/profile/Profile')
//1.通过Vue.use安装插件
Vue.use(vueRouter)
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:home
  },
  {
    path:'/cart',
    component:cart
  },
  {
    path:'/category',
    component:category
  },
  {
    path:'/profile',
    component:profile
  }
]

//2.注册路由对象
const router = new vueRouter({
  routes,
  mode:'history'
});

//3.导出路由对象在vue中
export default router;
