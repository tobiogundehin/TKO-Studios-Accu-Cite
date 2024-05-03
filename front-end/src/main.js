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
import DOIPage from './pages/DOISearch.vue';
import { initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBrs9eYqifDe1KqAzgPBXjM0LLSRQlLRds",
    authDomain: "accu-cite-eb5a4.firebaseapp.com",
    projectId: "accu-cite-eb5a4",
    storageBucket: "accu-cite-eb5a4.appspot.com",
    messagingSenderId: "1018716575610",
    appId: "1:1018716575610:web:1e900cfd551311ae0428c3",
    measurementId: "G-MNPZCS0M15"
  };
  
initializeApp(firebaseConfig);

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
        path:'/DOI',
        component: DOIPage,
    },]
}))
.mount('#app')
