<template>
    <div>
      <h1 v-if="!isLoggedIn">Welcome to Accu-Cite</h1>
      <h1 v-if="isLoggedIn">Welcome to Accu-Cite User {{ userFirstName }}</h1>
      <p>The home of scholarly articles and research material</p>
      <div class="product-container">
        <img src="../assets/Minimal book Logo.jpg">
        <div class="details-wrap">
          <h2>Research</h2>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
  import { useRouter } from 'vue-router';
  
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
            // Assuming you have access to the user's first name from Firebase Auth
            userFirstName.value = user.displayName;
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
  