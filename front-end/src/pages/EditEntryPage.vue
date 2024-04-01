<template>
    <h1>Update Entry</h1>
    <div class="create-form-container">
        <div class="center">
            <form @submit.prevent="submitForm">
                <div class="txt_field">
                    <input v-model="model.entry.title" type="text" name="title" required>
                    <span></span>
                    <label>Title</label>
                </div>
                <div class="txt_field">
                    <input v-model="model.entry.Last" type="text" name="Last">
                    <span></span>
                    <label>Author's Last Name</label>
                </div>
                <div class="txt_field">
                    <input v-model="model.entry.First" type="text" name="First">
                    <span></span>
                    <label>Author's First Name</label>
                </div>
                <div class="txt_field">
                    <input v-model="model.entry.Middle" type="text" name="Middle">
                    <span></span>
                    <label>Author's Middle Name</label>
                </div>
                <div class="txt_field">
                    <input v-model="model.entry.year" type="text" name="year">
                    <span></span>
                    <label>Year</label>
                </div>
                <div class="txt_field">
                    <input v-model="model.entry.publisher" type="text" name="publisher">
                    <span></span>
                    <label>Publisher</label>
                </div>
                <div class="txt_field">
                    <input v-model="model.entry.format" type="text" name="format">
                    <span></span>
                    <label>Format</label>
                </div>
                <div class="txt_field">
                    <input v-model="model.entry.abstract" type="text" name="abstract">
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
    name: "editEntryPage",
    data() {
        return {
            errorList: '',
            model: {
                entry: {
                    title: '',
                    Last: '',
                    First: '',
                    Middle: '',
                    year: '',
                    publisher: '',
                    format: '',
                    abstract: ''
                }
            }
        }
    },
    mounted(){
       console.log(this.$route.params.entryId);
       this.getEntryData(this.$route.params.entryId);
    },
    methods: {
        getEntryData(entryId){
            axios.get(`http://localhost:8080/api/search/${entryId}/editEntryPage`)
            .then(res => {
                console.log(res.data);

                this.model.entry.First = res.data.entry;
        });
    },
        async submitForm() {
            await axios.post("./api/editEntry", {
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