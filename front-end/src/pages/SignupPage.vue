<template>
 <div class="container">
      <div class="center">
          <h1>Register</h1>
          <form method="POST" action="">
              <div class="txt_field">
                  <input type="text" name="name" required>
                  <span></span>
                  <label>Name</label>
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
          </form>
      </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default{
    name:"SignupPage",
    methods: {
        const auth = getAuth(firebaseApp);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
     })
    .catch((err) => {
        console.log(err.code);
        console.log(err.message);
    });
    }
}
</script>
