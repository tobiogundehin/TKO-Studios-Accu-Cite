<template>
    <div>
        <h1>My Library</h1>
        <div>
            <router-link to="/createentry">
                <button class="create-entry">Create Entry</button>
            </router-link>
        </div>
        <div v-if="libraryItems.length > 0">
            <table class="library-table">
                <thead>
                    <tr>
                        <th>AUTHOR(S)</th>
                        <th>YEAR</th>
                        <th>TITLE</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="entry in libraryItems" :key="entry.id">
                        <td>{{ entry.authors}}</td>
                        <td>{{ entry.year }}</td>
                        <router-link :to="'/search/' + entry.id">
                            <td>{{ entry.title }}</td>
                        </router-link>
                        <td><button @click="removeFromLibrary(entry.id)">Remove</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else>
            You have no entries in your Library
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    name: "LibraryPage",
    setup() {
        const isLoggedIn = ref(false);
        const libraryItems = ref([]); // Define libraryItems as a ref array
        const router = useRouter();
        let auth;

        onMounted(() => {
            auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                isLoggedIn.value = !!user;
                if (user) {
                    const userEmail = user.email; // Get the email of the logged-in user
                    // Fetch user's library items from the backend using the user's email
                    axios.get(`http://localhost:8000/api/users/${userEmail}/library`)
                        .then(response => {
                            // Clean up the authors property by removing brackets
                            libraryItems.value = response.data.map(entry => {
                                entry.authors = entry.authors.replace(/^\[|\]$/g, '');
                                return entry;
                            });
                        })
                        .catch(error => {
                            console.error("Error fetching user's library:", error);
                        });
                }
            });
        });

        const handleSignOut = () => {
            signOut(auth).then(() => {
                console.log("Signed Out Success");
                router.push('/home');
            });
        };

        return { isLoggedIn, libraryItems, handleSignOut };
    }
};

</script>
