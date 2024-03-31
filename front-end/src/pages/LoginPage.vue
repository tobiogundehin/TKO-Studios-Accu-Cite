<template>
<h1>Login to Accu-Cite</h1>
<div class="container">
      <div class="center">
          <h1>Login</h1>
          <div class="txt_field">
            <p><input type="text" placeholder="Email" v-model="email" /></p>
            <hr>
          </div>
          <div class="txt_field">
            <p><input type="password" placeholder="Password" v-model="password" /></p>
            <hr>
          </div>
            <p v-if="errMsg">{{ errMsg }}</p>
              <!-- Add Forgot Password Func -->
              <div class="pass">Forget Password?</div>
              <p><button @click="login">Login</button></p>
              <div class="signup_link">
                  Not a Member ? <a href="./signup">Signup</a>
              </div>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';

export default{
    name:"LoginPage",
    setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const errMsg = ref() //Error Message

    const login = () => {
      signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(() => {
          console.log("Successfully Signed In!");
          router.push('/home');
        })
        .catch((error) => {
          console.log(error.code);
          switch(error.code){
            case "auth/invalid-email":
                errMsg.value = "Invalid Email";
                break;
            case "auth/user-not-found":
            errMsg.value = "No Account with that email was found";
            break;
            case "auth/wrong-password":
                errMsg.value = "Incorrect Password";
                break;
            case "auth/invalid-credential":
                errMsg.value = "Invalid Credentials"
                break;
            default:
                errMsg.value = "Email or password was incorrect"
                break;
          }
        });
    };

    const signInWithGoogle = () => {
      // Implement Google sign-in logic here
    };

    return { email, password, login, signInWithGoogle };
  },
};
</script>