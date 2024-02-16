<template>
    <!-- <div class="nav-bar">
        <router-link to="/home">
            <div class="logo-wrap">
            <img :src="logo"/>
        </div>
        </router-link>
        <router-link to="/library">
            <button>My Library</button>
        </router-link>
    </div> -->
    <!-- <img class="logo" :src="logo" alt="logo"/> -->
    <nav class="nav-bar">
        <ul class="nav__links">
            <router-link to="/home">
                <li>Home</li>
            </router-link>
            <router-link to="/search">
                <li>Search</li>
            </router-link>
            <router-link to="/library">
                <li>My Library</li>
            </router-link>
        </ul>
        <!-- Add Link to Sign Up/Sign in Page -->
    <a class="cta" href="./login">
        <button>Sign In</button>
    </a>
    </nav>
    
</template>

<script>
import logo from '@/assets/logo.png';

export default{
    name: "NavBar",
    data(){
        return{
            logo,
        }
    }
}
</script>