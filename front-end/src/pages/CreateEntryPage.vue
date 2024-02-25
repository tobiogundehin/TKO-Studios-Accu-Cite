<template>
    <h1>Create New Entry</h1>
    <div class="create-form-container">
        <div class="center">
            <form @submit.prevent="submitForm">
                <div class="txt_field">
                    <input v-model="title" type="text" name="title" required>
                    <span></span>
                    <label>Title</label>
                </div>
                <div class="txt_field">
                    <input v-model="last_name" type="text" name="last_name">
                    <span></span>
                    <label>Author's Last Name</label>
                </div>
                <div class="txt_field">
                    <input v-model="first_name" type="text" name="first_name">
                    <span></span>
                    <label>Author's First Name</label>
                </div>
                <div class="txt_field">
                    <input v-model="middle_name" type="text" name="middle_name">
                    <span></span>
                    <label>Author's Middle Name</label>
                </div>
                <div class="txt_field">
                    <input v-model="year" type="text" name="year">
                    <span></span>
                    <label>Year</label>
                </div>
                <div class="txt_field">
                    <input v-model="publisher" type="text" name="publisher">
                    <span></span>
                    <label>Publisher</label>
                </div>
                <div class="txt_field">
                    <input v-model="format" type="text" name="format">
                    <span></span>
                    <label>Format</label>
                </div>
                <div class="txt_field">
                    <input v-model="summary" type="text" name="summary">
                    <span></span>
                    <label>Summary</label>
                </div>
                <input name="submit" type="Submit" value="Create">
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "CreateEntryPage",
    data() {
        return {
            title: "",
            author: "",
            year: "",
            type: "",
            abstract: ""
        };
    },
    methods: {
        submitForm() {
        axios.post("http://10.3.158.186:8080/backend/server.go", {
            title: this.title,
            author: this.author,
            year: this.year,
            type: this.type,
            abstract: this.abstract
        }).then((response) =>{
            console.log(response.data);
        }).catch((error) =>{
            console.log(error);
        })
}}
};
</script>
