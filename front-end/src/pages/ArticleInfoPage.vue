<!-- Page User is redirected to after clicking on an article. Will be dynamically generated for every article based on information provided -->
<template>
    <div class="article-details" >
        <h1>{{ entry.title }}</h1>
        <div>
        <h3 class="article-author">{{ entry.First}} {{ entry.Middle }} {{  entry.Last }}</h3>
        <h3 class="article-year">{{ entry.year }}</h3>
    </div>
        <h2>Abstract</h2>
        <h3 class="article-summary">{{ entry.summary }}</h3>
    </div>
    <div>
        <router-link :to="'/search/'">
            <button @click="addtoLibrary" class="details-button">Add to Library</button>
    </router-link>
        
    </div>

     <div>
    <router-link :to="{ path: '/search/' + this.$route.params.entryId + '/editEntryPage'}">
	<button @click="editEntry" class="details-button">Update Entry</button>
    </router-link>
    </div>
    <div>
        <router-link :to="'/search/'">
            <button @click="removefromLibrary" class="details-button" style="background-color: red;">DELETE ENTRY</button>
            </router-link>
    </div>
    
</template>

<script>
import axios from 'axios';

export default{
        name: "ArticleInfoPage",
        data(){
            return{
                entry: [],
            }  
        },
        methods:{
            async addtoLibrary(){
                await axios.post(`/api/users/12345/library`, {id: this.$route.params.entryId});
                alert('Successfully added to Library')
            },
         /*   async editEntry(){
                await axios.update(`http://localhost:8000/api/search/${this.$route.params.entryId}`);
                alert('Successfully Updated entry');
                window.location.href = "/search";
            }, */
            async removefromLibrary(){
                await axios.delete(`/api/search/${this.$route.params.entryId}`);
                alert('Successfully Deleted Entry');
                window.location.href = "/search";
            }
        },
        async created(){
            const response = await axios.get(`/api/search/${this.$route.params.entryId}`);
            const entry = response.data;
            this.entry = entry[0];
        }
}
</script>