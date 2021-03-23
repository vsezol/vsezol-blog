<template>
  <div>
    <div v-for="(post, i) in posts" :key="i">
      <div>
        <div class="mb-1">
          <h2 class="text-xl mb-1 font-bold">{{ post.title }}</h2>
          <div class="flex justify-between items-center mb-1">
            <h3 class="text-lg">{{ post.description }}</h3>
            <div>{{ post.date }}</div>
          </div>

          <p class="text-lg" v-html="post.text" />
        </div>
      </div>
      <hr class="m-8" v-if="i + 1 !== posts.length" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getFiles } from '@/api/getFiles';

interface Post {
  title: string;
  description: string;
  date: string;
  text: string;
}

@Component({
  async asyncData() {
    try {
      const files = await getFiles();

      const posts = files.map(file => {
        const text = file.content.replace(/\n/gi, '<br />');

        return {
          title: file.data.title,
          description: file.data.description,
          date: new Date(file.data.date).toLocaleString('en'),
          text
        };
      });

      return { posts };
    } catch {}
  }
})
export default class Index extends Vue {
  private posts: Post[] = [];

  mounted() {
    console.log(this.posts);
  }
}
</script>
