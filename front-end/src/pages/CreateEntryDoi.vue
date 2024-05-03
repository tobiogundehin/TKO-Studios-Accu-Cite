<template>
    <h1>Create Entry from DOI</h1>
    <div class="center">
        <form @submit.prevent="submitForm">
            <div class="txt_field">
                    <input v-model="doi" type="text" name="doi">
                    <span></span>
                    <label>DOI</label>
                </div>
                <button @click="submitForm()">Create</button>
        </form>
    </div>
</template>

<script>
export default{
    name: "CreateEntryDoi",
}
</script>