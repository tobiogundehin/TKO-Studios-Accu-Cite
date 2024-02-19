<template>
    <h1>Create New Entry</h1>
    <div class="container">
      <div class="center">
          <form action="" method="POST">
              <div class="txt_field">
                  <input type="text" name="text" required>
                  <span></span>
                  <label>Title</label>
              </div>
              <div class="txt_field">
                  <input type="text" name="text" required>
                  <span></span>
                  <label>Author</label>
              </div>
              <div class="txt_field">
                  <input type="text" name="text">
                  <span></span>
                  <label>Year</label>
              </div>
              <div class="txt_field">
                  <input type="text" name="text">
                  <span></span>
                  <label>Type</label>
              </div>
              <div class="txt_field">
                  <input type="text" name="text">
                  <span></span>
                  <label>Abstract</label>
              </div>
              <input name="submit" type="Submit" value="Create">
          </form>
      </div>
    </div>
</template>

<script>

export default{
    name: "CreateEntryPage",
    data(){
        return{

        }
    },
}
</script>