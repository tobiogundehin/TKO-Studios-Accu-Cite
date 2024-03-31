<template>
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
        <div>
            <span v-if="isLoggedIn">{{ userEmail }}</span>
            <button v-if="isLoggedIn" style="background-color: red;" @click="handleSignOut">Sign Out</button>
            <a v-else href="./login">
                <button>Sign In</button>
            </a>
        </div>
    </nav>
</template>

<script>
import logo from '@/assets/logo.png';
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'vue-router';

export default {
    name: "NavBar",
    data() {
        return {
            logo
        };
    },
    setup() {
        const isLoggedIn = ref(false);
        const userEmail = ref("");
        const router = useRouter();
        let auth;

        onMounted(() => {
            auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                isLoggedIn.value = !!user;
                if (user) {
                    userEmail.value = user.email; // Get the user's email
                }
            });
        });

        const handleSignOut = () => {
            signOut(auth).then(() => {
                console.log("Signed Out Success");
                router.push('/home');
            });
        };

        return { isLoggedIn, userEmail, handleSignOut };
    }
};
</script>
