<template>
    <div>
      <h1 v-if="!isLoggedIn">Welcome to Accu-Cite</h1>
      <h1 v-if="isLoggedIn">Welcome to Accu-Cite, {{ userFirstName }}</h1>
      <p>The home of scholarly articles and research material</p>
      <div class="product-container">
        <img src="../assets/Minimal book Logo.jpg">
        <div class="details-wrap">
          <h2>Research Lives Here</h2>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  export default {
    name: "HomePage",
    setup() {
      const isLoggedIn = ref(false);
      const userFirstName = ref("");
      const router = useRouter();
      let auth;
  
      onMounted(() => {
        auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          isLoggedIn.value = !!user;
          if (user) {
            const userEmail = user.email; // Get the email of the logged-in user
            // Fetch user's first name from the backend using the user's email
            axios.get(`http://localhost:8000/api/users/${userEmail}`)
              .then(response => {
                userFirstName.value = response.data.first_name; // Assuming the response contains the user's first name
              })
              .catch(error => {
                console.error("Error fetching user's first name:", error);
              });
          }
        });
      });
  
      const handleSignOut = () => {
        signOut(auth).then(() => {
          console.log("Signed Out Success");
          router.push('/home');
        });
      };
  
      return { isLoggedIn, userFirstName, handleSignOut };
    },
  };
  </script>
  