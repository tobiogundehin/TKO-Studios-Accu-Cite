<!-- Page User is redirected to after clicking on an article. Will be dynamically generated for every article based on information provided -->
<template>
    <div class="article-details">
        <h1>{{ entry.name }}</h1>
        <div>
        <h3 class="article-author">{{ entry.author }}</h3>
        <h3 class="article-year">{{ entry.year }}</h3>
    </div>
        <h2>Abstract</h2>
        <h3 class="article-summary">{{ entry.summary }}</h3>
    </div>
    <div>
        <button @click="addtoLibrary" class="details-button">Add to Library</button>
    </div>
    
</template>

<script>
import axios from 'axios';

export default{
        name: "ArticleInfoPage",
        data(){
            return{
                entry: {},
            }  
        },
        methods:{
            async addtoLibrary(){
                await axios.post(`/api/users/12345/library`, {id: this.$route.params.entryId});
                alert('Successfully added to Library')
            }
        },
        async created(){
            const response = await axios.get(`/api/search/${this.$route.params.entryId}`);
            const entry = response.data;
            this.entry = entry;
        }
}
</script>