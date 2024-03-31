import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router';
import SearchPage from './pages/SearchPage.vue'
import LibraryPage from './pages/LibraryPage.vue'
import ArticleInfoPage from './pages/ArticleInfoPage.vue'
import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import SignupPage from './pages/SignupPage.vue'
import CreateEntryPage from './pages/CreateEntryPage.vue'
import EditEntryPage from './pages/EditEntryPage.vue';
//import { initializeApp} from "firebase/app";


// Function to check if the user is logged in

//Router to manage page pathing
createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
        path: '/search',
        component: SearchPage,
    },{
        //Make requiresAuth: true
        path: '/library',
        component: LibraryPage,
    },{
        path: '/search/:entryId',
        component: ArticleInfoPage,
    },{
        path: '/home',
        component: HomePage,
    },{
        path: '/login',
        component: LoginPage,
    },{
        path:'/signup',
        component: SignupPage,
    },{
        path:'/createentry',
        component: CreateEntryPage,
    },{
        path:'/search/:entryId/editEntryPage',
        component: EditEntryPage,
    }]
}))
.mount('#app')
