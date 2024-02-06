<!-- Page the User is Redirected to after Selecting Search on any Page -->
<template>
    <h1>Search</h1>
    <div class="grid-wrap">
        <div 
        class="article-item"
        v-for="article in articles"
        :key="article.id"
        >
            <h3 class="article-name">{{ article.name }}</h3>
            <p class="article-author">{{ article.author }}</p>
            <p class="article-summary">{{ article.summary }}</p>
            <p class="article-year">{{ article.year }}</p>
            <router-link :to="'/search/'+ article.id" >
                <button class="details-button">View Details</button>
            </router-link>
            
        </div>
    </div>
</template>

<script>
import { articles } from '@/temp-data';

export default{
    name: "SearchPage",
    data(){
        return{
            articles,
        }
    }
}
</script>