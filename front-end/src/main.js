import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router';
import SearchPage from './pages/SearchPage.vue'
import LibraryPage from './pages/LibraryPage.vue'
import ArticleInfoPage from './pages/ArticleInfoPage.vue'
import HomePage from './pages/HomePage.vue'

createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
        path: '/search',
        component: SearchPage,
    },{
        path: '/library',
        component: LibraryPage,
    },{
        path: '/search/:articleId',
        component: ArticleInfoPage,
    },{
        path: '/home',
        component: HomePage,
    }]
}))
.mount('#app')
