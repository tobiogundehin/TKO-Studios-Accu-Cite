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
              const example = new Cite(form);
            await axios.post("./api/DOI", {
                title: example.data[0].title,
                author: example.data[0].author[0].family,
                year: example.data[0].created.date_parts,
                publisher: example.data[0].publisher,
                format: example.data[0].type,
                abstract: this.abstract,
                doi: example.data[0].DOI,
    });
  },
    async searchDOI(){
      console.log("Hello World!");
      const form = document.getElementById('DOI').value;
      const example = new Cite(form);
      console.log(example.data[0]);
      document.getElementById("output").innerHTML = example.data[0].title;
      document.getElementById("output2").innerHTML = example.data[0].author[0].given;
      //document.getElementById("output2").innerHTML = example.data[0].author[0].family;
      document.getElementById("output4").innerHTML = example.data[0].publisher;
      document.getElementById("output5").innerHTML = example.data[0].created.date_parts;
      document.getElementById("output6").innerHTML = example.data[0].type;
      //10.1016/j.proeng.2011.08.552
    }
  }
}
</script>