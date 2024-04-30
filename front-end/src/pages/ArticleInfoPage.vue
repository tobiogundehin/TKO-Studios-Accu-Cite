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
  <!--<button  @click="selectStyle" @onChange="setStyle(this)" class="dropbtn">Select Style</button> -->
  <button  @click="selectStyle(this)"  class="dropbtn">Select Style</button>
  <div id="SelectStyle" class="dropdown-content">
    <a @click="setStyle('APA')" id="APA" @href="setStyle(this)" value="APA">APA</a>
    <a @click="setStyle('MLA')" id="MLA" @href="setStyle(this)" value="MLA">MLA</a>
    <a @click="setStyle('Chicago')" id="Chi" @href="setStyle(this)" value="Chicago">Chicago</a>
    <a @click="setStyle('Vancouver')" id="Van" @href="setStyle(this)" value="Vancouver">Vancouver</a>
    <a @click="setStyle('Harvard1')" id="Van" @href="setStyle(this)" value="Harvard1">Harvard1</a>
  </div>
</div>
    <div>
            <button @click="createCite(this.$route.params.entryId, selectedStyle)" class="details-button" style="background-color: blue;">Cite</button>
    </div>
    <div>
        <p id="citation" class="citation"> </p> 
    </div>
</template>

<script>
const Cite = require("citation-js")
import axios from 'axios';
//var curStyle = document.getElementById('SelectStyle');

export default{
        name: "ArticleInfoPage",
        data(){
            return{
                entry: [],
                selectedStyle: '',
            }  
        },
        mounted(){
       console.log(this.$route.params.entryId);
       this.getEntryData(this.$route.params.entryId);
       //this.setStyle("APA");
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
            async createCite(entryId, selectedStyle){
                axios.get(`/api/search/${entryId}`)
            .then(res => {
                //console.log(res.doi);

                const myDOI = res.data[0].doi;
                const example = new Cite(myDOI);

                //console.log(example);
                console.log(selectedStyle);

                switch(selectedStyle){
                    case 'APA': {
                //alert("APA Selected");
                //console.log(example);
                document.getElementById("citation").innerHTML = example.format('bibliography', {
                    format: 'html',
                    template: 'apa'
                });
                break;
                }
                case 'MLA': {
                //alert("MLA Selected");
                document.getElementById("citation").innerHTML = example.format('bibliography', {
                    format: 'html',
                    template: 'mla'
                });
                break;
                }
                case 'Chicago': {
                //alert("Chicago Selected");
                document.getElementById("citation").innerHTML = example.format('bibliography', {
                    format: 'html',
                    template: 'chicago'
                });
                break;
                }
                case 'Vancouver': {
                //alert("Chicago Selected");
                document.getElementById("citation").innerHTML = example.format('bibliography', {
                    format: 'html',
                    template: 'vancouver'
                });
                break;
             }
             case 'Harvard1': {
                //alert("Chicago Selected");
                document.getElementById("citation").innerHTML = example.format('bibliography', {
                    format: 'html',
                    template: 'harvard-cite-them-right'
                });
                break;
             }
            }
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
                var text = document.getElementById("citation");
                if (text.style.display === "none") {
                text.style.display = "block";
                } else {
                text.style.display = "none";
                }
            },
        selectStyle(){
            document.getElementById("SelectStyle").classList.toggle("show");
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
    setStyle(curStyle){
        switch (curStyle) {
        case 'APA':  {
          //document.getElementById("feelimg").src = "Images/questionSun.jpg";
          document.getElementById("SelectStyle").value
          alert("APA Selected");
          this.selectedStyle = curStyle;
          break;
        }
        case 'MLA': {
          //document.getElementById("feelimg").src = "Images/happySun.jpg";
          document.getElementById("SelectStyle").value
          alert("MLA Selected");
          this.selectedStyle = curStyle;
          //return curStyle;
          break;
        }
        case 'Chicago': {
          //document.getElementById("feelimg").src = "Images/sadSun.jpg";
          document.getElementById("SelectStyle").value
          alert("Chicago Selected");
          this.selectedStyle = curStyle;
          break;
        }
        case 'Vancouver': {
          //document.getElementById("feelimg").src = "Images/sadSun.jpg";
          document.getElementById("SelectStyle").value
          alert("Vancouver Selected");
          this.selectedStyle = curStyle;
          break;
        }
        case 'Harvard1': {
          //document.getElementById("feelimg").src = "Images/sadSun.jpg";
          document.getElementById("SelectStyle").value
          alert("Harvard1 Selected");
          this.selectedStyle = curStyle;
          break;
        }
    }
    return curStyle;
    },
    }
}
</script>