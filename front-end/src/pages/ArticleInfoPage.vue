<!-- Page User is redirected to after clicking on an article. Will be dynamically generated for every article based on information provided -->
<template>
    <div class="article-details">
        <h1>{{ article.name }}</h1>
        <div>
        <h3 class="article-author">{{ article.author }}</h3>
        <h3 class="article-year">{{ article.year }}</h3>
    </div>
        <h2>Abstract</h2>
        <h3 class="article-summary">{{ article.summary }}</h3>
    </div>
</template>

<script>
import { articles } from '@/temp-data';

export default{
        name: "ArticleInfoPage",
        data(){
            return{
                article: articles.find(article => article.id === this.$route.params.articleId),
            }
        },
}
</script>