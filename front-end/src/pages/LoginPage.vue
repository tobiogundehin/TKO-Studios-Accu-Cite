<template>
<h1>Login to Accu-Cite</h1>
<div class="container">
      <div class="center">
          <h1>Login</h1>
          <form action="" method="POST">
              <div class="txt_field">
                  <input type="text" name="text" required>
                  <span></span>
                  <label>Username</label>
              </div>
              <div class="txt_field">
                  <input type="password" name="password" required>
                  <span></span>
                  <label>Password</label>
              </div>
              <!-- Add Forgot Password Func -->
              <div class="pass">Forget Password?</div>
              <input name="submit" type="Submit" value="Login">
              <div class="signup_link">
                  Not a Member ? <a href="./signup">Signup</a>
              </div>
          </form>
      </div>
    </div>
</template>

<script>
export default{
    name:"LoginPage",
}
</script>