<template>
    <div>
        <h1>My Library</h1>
        <div>
            <router-link to="/createentry" >
                <button class="create-entry">Create Entry</button>
            </router-link>
        </div>
        <div v-if="libraryItems.length > 0">
            <table class="library-table">
                <thead>
                    <tr>
                        <th>AUTHOR</th>
                        <th>YEAR</th>
                        <th>TITLE</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="entry in libraryItems" :key="entry.id">
                        <td>{{ entry.author }}</td>
                        <td>{{ entry.year }}</td>
                        <td>{{ entry.title }}</td>
                        <td><button @click="removeEntry(entry)">Remove</button></td>
                    </tr>
                </tbody>    
            </table>
        </div>

        <div v-if="libraryItems.length === 0">
            You have no entries in your Library
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "LibraryPage",
    data() {
        return {
            libraryItems: []
        };
    },
    methods: {
        async fetchEntries() {
            try {
                const response = await axios.get('http://localhost:8080/entries');
                this.libraryItems = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async removeEntry(entry) {
            try {
                await axios.delete(`http://localhost:8080/entries/${entry.id}`);
                this.libraryItems = this.libraryItems.filter(item => item.id !== entry.id);
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.fetchEntries();
    }
};
</script>
