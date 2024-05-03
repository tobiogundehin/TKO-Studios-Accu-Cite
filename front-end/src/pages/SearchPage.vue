<template>
    <div class="search">
        <input type="text" id="searchbar" v-model="searchQuery" placeholder="SEARCH" name="searchbar">
        <button id="searchbutton"><img src="../assets/search.png"></button>
    </div>
    
    <div class="grid-wrap">
        <div
        class="article-item"
        v-for="entry in filteredEntries"
        :key="entry.id"
        >
            <h3 class="article-name">{{ entry.title }}</h3>
            <p class="article-author">{{ entry.authors }}</p>
            <p class="article-summary">{{ entry.summary }}</p>
            <p class="article-year">{{ entry.day }} {{ entry.month }} {{ entry.year }} - {{ entry.publisher }}</p>
            <router-link :to="'/search/'+ entry.id">
                <button class="details-button">View Details</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "SearchPage",
    data() {
        return {
            entries: [],
            searchQuery: '', 
        };
    },
    async created() {
        try {
            const response = await axios.get('http://localhost:8000/api/search');
            const entries = response.data;
            this.entries = entries;
        } catch (error) {
            console.error('Failed to fetch entries:', error);
        }
    },
    computed: {
    filteredEntries() {
        // Convert the search query to lowercase and trim whitespace
        const query = this.searchQuery.toLowerCase().trim();
        
        // Map over the entries to clean up authors and filter entries
        return this.entries
            .map(entry => {
                // Clean up the authors by removing brackets
                entry.authors = entry.authors.replace(/^\[|\]$/g, '');

                // Return the entry if the title includes the query
                if (entry.title.toLowerCase().includes(query)) {
                    return entry;
                }
            })
            // Filter out undefined entries (entries that did not match the query)
            .filter(entry => entry !== undefined);
    }
}

}
</script>
