<template>
    <h1>DOI Search</h1>
    <p>Search for a reference using it's DOI</p>    
    <div class="container">
      <div class="center">
              <div class="txt_field">
                  <input id = "DOI" v-model="cite" type="text" name="text">
              </div>
                  <input @click="searchDOI" name="submit" type="Submit" value="Search">
      </div>
      <p class="output" id="output">Title: </p>
      <output class="output2" id="output2">Author: </output>
      <p class="output4" id="output4">Publisher: </p>
      <p class="output5" id="output5">Date: </p>
      <p class="output6" id="output6">Source Type: </p>
    </div>
    <div>
        <router-link :to="'/search/'">
            <button @click="submitForm()" class="details-button">Add to Database</button>
    </router-link>
    </div>
</template>

<script>
import axios from 'axios';
const Cite = require("citation-js");
export default{
    name: "CreateEntryPage",
    data() {
        return {
            title: "",
            Last: "",
            First: "",
            Middle: "",
            year: "",
            publisher: "",
            format: "",
            abstract: "",
            doi: "",
        };
      },
  methods:{
    async submitForm() {
              const form = document.getElementById('DOI').value;
              const entry = new Cite(form);

              console.log(entry);

              let day = "";
              let month = "";
              let year = "";
              let intMonth = 0;
            if (entry.data[0]['published']['date-parts'][0].length === 3) {
            intMonth = parseInt(entry.data[0]['published']['date-parts'][0][1].toString());
            intMonth = intMonth - 1;
            month = intMonth.toString();
            day = ['published']['date-parts'][0][2].toString();
            year = entry.data[0]['published']['date-parts'][0][0].toString();
            } 
              else if (entry.data[0]['published']['date-parts'][0].length === 2) {
              intMonth = parseInt(entry.data[0]['published']['date-parts'][0][1].toString());
              intMonth = intMonth - 1;
            month = intMonth.toString();
            day = "1";
           year = entry.data[0]['published']['date-parts'][0][0].toString();
              }
              else if (entry.data[0]['published']['date-parts'][0].length === 1) {
            day = "1";
            month = "1";
            year = entry.data[0]['published']['date-parts'][0][0].toString();
        }
        else { 
            month = "5";
            day = "13";
            year = "2024";
        } 
            console.log(month);
            console.log(day);
            console.log(year);
            let first = "";
            let last = "";
            let author = "";
            const authors = [];
            console.log(entry.data[0]['author'].length);
            for(let i = 0; i < entry.data[0]['author'].length; i++){
                first = entry.data[0]['author'][i]['given'];
                last = entry.data[0]['author'][i]['family'];
      

              author = first + " " + last;
              authors[i] = author;
              console.log(author);
            }
            //console.log(authors[0]);
            let title = entry.data[0].title;
            let publisher = entry.data[0].publisher;
            let format = entry.data[0].type;
            let abstract = this.abstract;
            let doi = entry.data[0].DOI;

            let entryData = new FormData();
            entryData.append('title', title);
            entryData.append('month', month);
            entryData.append('day', day);
            entryData.append('year', year);
            entryData.append('publisher', publisher);
            entryData.append('format', format);
            entryData.append('abstract', abstract);
            entryData.append('doi', doi);
            entryData.append('author', JSON.stringify(authors));
            const headers = {
              'Content-Type' : 'application/json',
              'Accept' : 'application/json',
            };

            await axios.post("./api/DOI", entryData, {headers: headers});


          /*  await axios.post("./api/DOI", {
                title: entry.data[0].title,
                author: authors[0],
                month: month, 
                day: day, 
                year: year, 
                publisher: entry.data[0].publisher,
                format: entry.data[0].type,
                abstract: this.abstract,
                doi: entry.data[0].DOI,
    }); */
  },
    async searchDOI(){
      console.log("Hello World!");
      const form = document.getElementById('DOI').value;
      const entry = new Cite(form);
      console.log(entry.data[0]);
      document.getElementById("output").innerHTML = entry.data[0].title;
      document.getElementById("output2").innerHTML = entry.data[0].author[0].given;
      //document.getElementById("output2").innerHTML = example.data[0].author[0].family;
      document.getElementById("output4").innerHTML = entry.data[0].publisher;
      document.getElementById("output5").innerHTML = entry.data[0]['published']['date-parts'][0];
      //document.getElementById("output5").innerHTML = item.published.date[0];
      document.getElementById("output6").innerHTML = entry.data[0].type;
      //10.1016/j.proeng.2011.08.552
      //10.1029/rg013i001p00001
    }
  }
}
</script>