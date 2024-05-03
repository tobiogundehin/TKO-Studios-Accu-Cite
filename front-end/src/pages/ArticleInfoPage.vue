<!-- Page User is redirected to after clicking on an article. Will be dynamically generated for every article based on information provided -->
<template>
    <div v-if="entry" class="article-details" >
        <h1>{{ entry.title }}</h1>
        <h2>Information</h2>
        <div>
            <h3 class="article-author">By: {{ entry.authors }}</h3>
            <h3 class="article-year">Date Published: {{ entry.day }}/{{ entry.month }}/{{ entry.year }}</h3>
        </div>
        <h3 class="article-summary">{{ entry.summary }}</h3>
        <h3 class="article-publisher">Publisher: {{ entry.publisher }}</h3>
        <h3 class="article-format">Entry type: {{ entry.format}}</h3>
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
    <div class="dropdown">
  <!--<button  @click="selectStyle" @onChange="setStyle(this)" class="dropbtn">Select Style</button> -->
  <button  @click="selectStyle(this)"  class="dropbtn">Select Citation Style</button>
  <div id="SelectStyle" class="dropdown-content">
    <a @click="setStyle('APA')" id="APA" @href="setStyle(this)" value="APA">APA</a>
    <a @click="setStyle('MLA')" id="MLA" @href="setStyle(this)" value="MLA">MLA</a>
    <a @click="setStyle('Chicago')" id="Chi" @href="setStyle(this)" value="Chicago">Chicago</a>
    <a @click="setStyle('Vancouver')" id="Van" @href="setStyle(this)" value="Vancouver">Vancouver</a>
    <a @click="setStyle('Harvard1')" id="Van" @href="setStyle(this)" value="Harvard1">Harvard1</a>
  </div>
</div>
    <div>
            <button @click="createCite(this.$route.params.entryId, selectedStyle)" class="details-button" style="background-color: blue;">Citation: {{Cite}}</button>
    </div>
    <div>
        <p id="citation" class="citation"> </p> 
    </div>
</template>


<script>
const Cite = require("citation-js")
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
    },
    methods: {
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
};
</script>
