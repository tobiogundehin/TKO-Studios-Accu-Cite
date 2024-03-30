<template>
 <div class="container">
      <div class="center">
          <h1>Create an Account</h1>
          <!-- <form method="POST" action="">
              <div class="txt_field">
                  <input type="text" name="name" required>
                  <span></span>
                  <label>Username</label>
              </div>
              <div class="txt_field">
                  <input type="email" name="email" required>
                  <span></span>
                  <label>Email</label>
              </div>
              <div class="txt_field">
                  <input type="password" name="password" required>
                  <span></span>
                  <label>Password</label>
              </div>
              <div class="txt_field">
                  <input type="password" name="cpassword" required>
                  <span></span>
                  <label>Confirm Password</label>
              </div>
              <input name="submit" type="Submit" value="Sign Up">
              <div class="signup_link">
                  Have an Account ? <a href="/login">Login Here</a>
              </div>
          </form> -->
          <p><input type="text" placeholder="Email" v-model="email"/></p>
          <p><input type="password" placeholder="Password" v-model="password"/></p>
          <p><button @click="register">Submit</button></p>
          <p><button @click="signInWithGoogle">Sign in With Google</button></p>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
const email = ref("")
const password = ref("")
const router = useRouter()


// const signInWithGoogle = () =>{

// }
export default{
    name:"SignupPage",
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
}
</script>
