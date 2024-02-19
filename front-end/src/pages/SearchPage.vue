<!-- Page the User is Redirected to after Selecting Search on any Page -->
<template>
    <h1>Search</h1>
    <div class="grid-wrap">
        <div 
        class="article-item"
        v-for="entry in entries"
        :key="entry.id"
        >
            <h3 class="article-name">{{ entry.name }}</h3>
            <p class="article-author">{{ entry.author }}</p>
            <p class="article-summary">{{ entry.summary }}</p>
            <p class="article-year">{{ entry.year }}</p>
            <router-link :to="'/search/'+ entry.id" >
                <button class="details-button">View Details</button>
            </router-link>
            
        </div>
    </div>
</template>

<script>
import { entries } from '@/temp-data';

export default{
    name: "SearchPage",
    data(){
        return{
            entries,
        }
    }
}
</script>