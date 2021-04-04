<template>
  <div>
    <div v-for="(post, i) in posts" :key="i">
      <PostShort :post="post" />
      <hr class="m-8" v-if="i + 1 !== posts.length" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import PostShort from '~/components/post/post-short.vue';

import { getFiles } from '~/api/get-files';

import { Post } from '@/types/post';

@Component({
  components: {
    PostShort
  },
  async asyncData() {
    try {
      const files = await getFiles();

      const posts = files.map(
        (file, i): Post => {
          return {
            title: file.data.title,
            date: new Date(file.data.date).toLocaleString('en'),
            text: file.content,
            number: i,
            type: file.data.type,
            keywords: file.data?.keywords?.split(' ')
          };
        }
      );

      return { posts };
    } catch (e) {
      console.log('Error while processing files with posts');
      console.log(e)
    }
  }
})
export default class Index extends Vue {
  posts: Post[] = [];
}
</script>
