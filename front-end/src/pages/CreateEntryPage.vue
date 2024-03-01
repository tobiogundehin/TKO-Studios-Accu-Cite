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
                    <input v-model="Last" type="text" name="Last">
                    <span></span>
                    <label>Author's Last Name</label>
                </div>
                <div class="txt_field">
                    <input v-model="First" type="text" name="First">
                    <span></span>
                    <label>Author's First Name</label>
                </div>
                <div class="txt_field">
                    <input v-model="Middle" type="text" name="Middle">
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
                    <input v-model="abstract" type="text" name="abstract">
                    <span></span>
                    <label>Abstract</label>
                </div>
                <router-link :to="'/search/'">
                    <button @click="submitForm()">Create</button>
            </router-link>

                
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
            Last: "",
            First: "",
            Middle: "",
            year: "",
            publisher: "",
            format: "",
            abstract: ""
        };
    },
    methods: {
        async submitForm() {
            await axios.post("./api/createentry", {
                title: this.title,
                Last: this.Last,
                First: this.First,
                Middle: this.Middle,
                year: this.year,
                publisher: this.publisher,
                format: this.format,
                abstract: this.abstract
            
            })
        // .then((response) =>{
        //     console.log(response);
        // }).catch((error) =>{
        //     console.log(error);
        // })
}}
};
</script>
