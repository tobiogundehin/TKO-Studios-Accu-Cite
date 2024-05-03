<!-- Page User is redirected to after clicking on an article. Will be dynamically generated for every article based on information provided -->
<template>
    <div v-if="entry" class="article-details" >
        <h1>{{ entry.title }}</h1>
        <div>
            <h3 class="article-author">By: {{ entry.authors }}</h3>
            <h3 class="article-year">{{ entry.day }} {{ entry.month }} {{ entry.year }}</h3>
        </div>
        <h2>Abstract</h2>
        <h3 class="article-summary">{{ entry.summary }}</h3>
    </div>
    <div v-if="isLoggedIn">
        <router-link :to="'/search/'">
            <button @click="addtoLibrary" class="details-button">Add to Library</button>
        </router-link>
    </div>
    <div v-if="isLoggedIn">
        <router-link :to="'/search/'">
            <button @click="removefromLibrary" class="details-button" style="background-color: red;">DELETE ENTRY</button>
        </router-link>
    </div>
</template>


<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'vue-router';

export default {
    name: "ArticleInfoPage",
    setup() {
        const isLoggedIn = ref(false);
        const entry = ref(null); // Define entry as a ref
        const auth = getAuth();
        const router = useRouter();

        onMounted(() => {
            onAuthStateChanged(auth, (user) => {
                isLoggedIn.value = !!user;
            });
        });

        const addtoLibrary = async () => {
            const user = auth.currentUser;
            if (!user) {
                alert('Please sign in to add to the library');
                return;
            }

            const userEmail = user.email;

            try {
                await axios.post(`http://localhost:8000/api/users/${userEmail}/library`, { id: router.currentRoute.value.params.entryId });
                alert('Successfully added to Library');
            } catch (error) {
                console.error('Error adding to library:', error);
                alert('Failed to add to library. Please try again later.');
            }
        };

        const editEntry = async () => {
            try {
                await axios.put(`http://localhost:8000/api/search/${router.currentRoute.value.params.entryId}`);
                alert('Successfully Updated entry');
                router.push('/search');
            } catch (error) {
                console.error('Error updating entry:', error);
                alert('Failed to update entry. Please try again later.');
            }
        };

        const removefromLibrary = async () => {
            try {
                await axios.delete(`http://localhost:8000/api/search/${router.currentRoute.value.params.entryId}`);
                alert('Successfully Deleted Entry');
                router.push('/search');
            } catch (error) {
                console.error('Error deleting entry:', error);
                alert('Failed to delete entry. Please try again later.');
            }
        };

        onMounted(async () => {
            const response = await axios.get(`http://localhost:8000/api/search/${router.currentRoute.value.params.entryId}`);
            entry.value = response.data[0];
        });

        return { isLoggedIn, entry, addtoLibrary, editEntry, removefromLibrary };
    }
};
</script>
