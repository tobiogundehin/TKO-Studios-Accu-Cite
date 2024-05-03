<template>
    <div>
      <h1>Create New Entry</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="title">Title:</label>
          <input v-model="title" type="text" id="title" required />
        </div>
        <div>
          <label for="year">Year:</label>
          <input v-model="year" type="text" id="year" />
        </div>
        <div>
          <label for="month">Month:</label>
          <input v-model="month" type="text" id="month" />
        </div>
        <div>
          <label for="day">Day:</label>
          <input v-model="day" type="text" id="day" />
        </div>
        <div>
          <label for="publisher">Publisher:</label>
          <input v-model="publisher" type="text" id="publisher" />
        </div>
        <div>
          <label for="format">Format:</label>
          <input v-model="format" type="text" id="format" />
        </div>
        <div>
          <label for="summary">Summary:</label>
          <input v-model="summary" type="text" id="summary" />
        </div>
        <div>
          <label for="authors">Authors(Seperate by ','):</label>
          <input v-model="authors" type="text" id="authors" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: '',
        year: '',
        month: '',
        day: '',
        publisher: '',
        format: '',
        summary: '',
        authors: ''
      };
    },
    methods: {
      async submitForm() {
        try {
          // Send the entry details to the server
          const response = await axios.post("http://localhost:8000/api/createentry", {
            title: this.title,
            year: this.year,
            month: this.month,
            day: this.day,
            publisher: this.publisher,
            format: this.format,
            summary: this.summary,
            authors: this.authors
          });
  
          console.log("Entry created successfully:", response.data);
          // Handle successful creation (e.g., navigate to another page, display a success message, etc.)
        } catch (error) {
          console.error("Error creating entry:", error);
          // Handle error (e.g., display an error message)
        }
      }
    }
  };
  </script>
  