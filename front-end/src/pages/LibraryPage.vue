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
                        <td>{{ entry[0].First }} {{ entry[0].Middle }} {{  entry[0].Last }}</td>
                        <td>{{ entry[0].year }}</td>
                        <router-link :to="'/search/'+ entry[0].id">
                            <td>{{ entry[0].title }}</td>
                        </router-link>
                        <td><button @click="removeFromLibrary(entry[0].id)">Remove</button></td>
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
            libraryItems: {},
        };
    },
    methods: {
        async removeFromLibrary(entryId){
            const response = await axios.delete(`/api/users/12345/library/${entryId}`);
            const updatedLibrary = response.data;
            this.libraryItems = updatedLibrary;
        }
    },
   async created(){
            const response = await axios.get('/api/users/12345/library');
            const libraryItems = response.data;
            this.libraryItems = libraryItems;
        },
};
</script>
