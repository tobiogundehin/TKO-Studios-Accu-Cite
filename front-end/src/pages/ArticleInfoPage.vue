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
    <div class="dropdown">
  <button @click="selectStyle" class="dropbtn">Select Style</button>
  <div id="myDropdown" class="dropdown-content">
    <a @click="setStyle" id="APA" href="#">APA</a>
    <a @click="setStyle" id="MLA" href="#">MLA</a>
    <a @click="setStyle" id="Chi" href="#">Chicago</a>
  </div>
</div>
    <div>
            <button @click="createCite(this.$route.params.entryId)" class="details-button" style="background-color: blue;">Cite</button>
    </div>
    <div>
        <p id="demo" class="citation"> </p> 
    </div>
</template>

<script>
const Cite = require("citation-js")
import axios from 'axios';

export default{
        name: "ArticleInfoPage",
        data(){
            return{
                entry: [],
            }  
        },
        mounted(){
       console.log(this.$route.params.entryId);
       this.getEntryData(this.$route.params.entryId);
    },
        methods:{
            async addtoLibrary(){
                await axios.post(`/api/users/12345/library`, {id: this.$route.params.entryId});
                alert('Successfully added to Library')
            },
            async removefromLibrary(){
                await axios.delete(`/api/search/${this.$route.params.entryId}`);
                alert('Successfully Deleted Entry');
                window.location.href = "/search";
            },
            async createCite(entryId){
                axios.get(`/api/search/${entryId}`)
            .then(res => {
                //console.log(res.doi);

                const myDOI = res.data[0].doi;
                const example = new Cite(myDOI);

                console.log(example);
                document.getElementById("demo").innerHTML = example.format('bibliography', {
                    format: 'html',
                    template: 'apa'
                });
            })
        },
            getEntryData(entryId){
            axios.get(`http://localhost:8080/api/search/${entryId}/editEntryPage`)
            .then(res => {
                console.log(res.data[0]);

                this.Model.Entry = res.data[0];

        })
        .catch(function (error){
            if(error.response){
                if(error.response.status == 404){
                    alert(error.response.data.message);
                }
            }
        }); 
    },
            toggleText(){
                var text = document.getElementById("demo");
                if (text.style.display === "none") {
                text.style.display = "block";
                } else {
                text.style.display = "none";
                }
            },
        selectStyle(){
            document.getElementById("myDropdown").classList.toggle("show");
            window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                 if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                    }
                 }
            }
        }
    },
    setStyle(){
        console.log("Hello World");
    },
    }
}
</script>