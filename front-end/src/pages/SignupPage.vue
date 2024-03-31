<template>
    <div class="container">
      <div class="center">
        <h1>Create an Account</h1>
        <div class="txt_field">
          <p><input type="text" placeholder="First Name" v-model="firstName" /></p>
          <hr>
        </div>
        <div class="txt_field">
          <p><input type="text" placeholder="Last Name" v-model="lastName" /></p>
          <hr>
        </div>
        <div class="txt_field">
          <p><input type="text" placeholder="Email" v-model="email" /></p>
          <hr>
        </div>
        <div class="txt_field">
          <p><input type="password" placeholder="Password" v-model="password" /></p>
          <hr>
        </div>
        <p><button @click="register">Register</button></p>
        <div class="signup_link">
          Have an Account ? <a href="/login">Login Here</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue';
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from 'vue-router';
  
  export default {
    name: "SignupPage",
    setup() {
      const firstName = ref("");
      const lastName = ref("");
      const email = ref("");
      const password = ref("");
      const router = useRouter();
  
      const register = async () => {
        
          const newUser = {
            first_name: firstName.value, 
            last_name: lastName.value,   
            email: email.value,
            libraryItems: []
          };
          console.log("This is the new User's info", newUser)
          await createUserWithEmailAndPassword(getAuth(), email.value, password.value);
          await axios.post(`http://localhost:8000/api/users`, {newUser});
          router.push('/home');
        
      };
  
      return { firstName, lastName, email, password, register };
    },
  };
  </script>
  