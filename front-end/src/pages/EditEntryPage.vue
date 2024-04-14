<template>
    <h1>Update Entry</h1>
    <div class="create-form-container">
        <div class="center">
            <form @submit.prevent="submitForm">
                <div class="txt_field">
                    <input v-model="Model.Entry.title" type="text" name="title" required>
                    <span></span>
                    <label>Title</label>
                </div>
                <div class="txt_field">
                    <input v-model="Model.Entry.Last" type="text" name="Last">
                    <span></span>
                    <label>Author's Last Name</label>
                </div>
                <div class="txt_field">
                    <input v-model="Model.Entry.First" type="text" name="First">
                    <span></span>
                    <label>Author's First Name</label>
                </div>
                <div class="txt_field">
                    <input v-model="Model.Entry.Middle" type="text" name="Middle">
                    <span></span>
                    <label>Author's Middle Name</label>
                </div>
                <div class="txt_field">
                    <input v-model="Model.Entry.year" type="text" name="year">
                    <span></span>
                    <label>Year</label>
                </div>
                <div class="txt_field">
                    <input v-model="Model.Entry.publisher" type="text" name="publisher">
                    <span></span>
                    <label>Publisher</label>
                </div>
                <div class="txt_field">
                    <input v-model="Model.Entry.format" type="text" name="format">
                    <span></span>
                    <label>Format</label>
                </div>
                <div class="txt_field">
                    <input v-model="Model.Entry.summary" type="text" name="abstract">
                    <span></span>
                    <label>Abstract</label>
                </div>
                <router-link :to="'/search/'">
                     <button @click="updateEntry(this.$route.params.entryId)">Update</button>
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
            Model: {
                Entry: {
                    title: "",
                    Last: "",
                    First: "",
                    Middle: "",
                    year: "",
                    publisher: "",
                    format: "",
                    summary: ""
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
          updateEntry(entryId) {
            console.log(this.Model.Entry);
            axios.put(`http://localhost:8080/api/search/${entryId}/editEntryPage`, this.Model.Entry)
            .then(res => {
                console.log(res.this.Model.Entry);
                console.log(res.data);
                alert("Successfully Updated Table");
            })
            .catch(function (error){
            if(error.response){
                if(error.response.status == 422){
                    alert(error.response.data.message);
                }
                if(error.response.status == 404){
                    alert(error.response.data.message);
                }
            }
        }); 
        // .then((response) =>{
        //     console.log(response);
        // }).catch((error) =>{
        //     console.log(error);
        // })
    }}
};
</script>