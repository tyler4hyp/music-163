// router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../pages/home/index.vue')
const Me = () => import('../pages/me/index.vue')
const MusicLists = () => import('../pages/music-lists/index.vue')
const Musics = () => import('../pages/musics/index.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
        { path: '/home', component: Home },
        { path: '/me', component: Me},
        { path: '/music-lists', component: MusicLists},
        { path: '/musics/:id', component: Musics},
        { path: '/', redirect: '/home' }
    ]
  })
}