<!-- Every User's personal library to perform tasks on articles selected by them from search or manually-->
<template>
    <h1>My Library</h1>
    <div v-if="libraryItems.length > 0">
        <table class="library-table">
        <thead>
            <tr>
            <th>AUTHOR</th>
            <th>YEAR</th>
            <th>TITLE</th>
        </tr>
        </thead>
        <tbody>
            <tr
    v-for="article in libraryItems"
    :key="article.id"
    >
        <td>
        {{ article.author }}
    </td>
    <td>
        {{ article.year }}
    </td>
    <td>
        {{ article.name }}
    </td>
    </tr>
        </tbody>    
</table>
    </div>

    <div v-if="libraryItems.length === 0">
        You have no articles in your Library
    </div>

</template>

<script>
import { libraryItems } from '@/temp-data';

export default{
    name: "LibraryPage",
    data(){
        return{
            libraryItems,
        }
    }
}
</script>