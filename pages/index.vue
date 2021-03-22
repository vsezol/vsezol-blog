<template>
  <div>
    <div v-for="(post, i) in posts" :key="i">
      <div>
        <div v-if="!!post.title" class="mb-1">
          <h2 class="text-xl mb-1 font-bold">{{ post.title }}</h2>
          <p class="text-lg">{{ post.text }}</p>
        </div>
        <p v-else class="text-xl mb-1">
          {{ post.text }}
        </p>
        <div class="flex justify-end">
          <div>{{ post.time }} {{ post.date }}</div>
        </div>
      </div>
      <hr class="m-8" v-if="i + 1 !== posts.length" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

interface Post {
  title: string
  text: string
  date: string
  time: string
}

@Component({
  async asyncData() {
    const posts = require('@/posts/index.json')
    return { posts }
  },
})
export default class Index extends Vue {
  private posts: Post[] = []

  mounted() {
    console.log(this.posts)
  }
}
</script>
