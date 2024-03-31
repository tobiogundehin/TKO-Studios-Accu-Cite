<template>
 <div class="container">
      <div class="center">
          <h1>Create an Account</h1>
          <p><input type="text" placeholder="Email" v-model="email" /></p>
          <p><input type="password" placeholder="Password" v-model="password" /></p>
          <p><button @click="register">Submit</button></p>
          <div class="signup_link">
                  Have an Account ? <a href="/login">Login Here</a>
              </div>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';

export default {
  name: "SignupPage",
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const register = () => {
      createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(() => {
          console.log("Successfully Registered!");
          router.push('/home');
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.message);
        });
    };

    const signInWithGoogle = () => {
      // Implement Google sign-in logic here
    };

    return { email, password, register, signInWithGoogle };
  },
};
</script>