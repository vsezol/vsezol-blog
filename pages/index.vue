<template>
  <div>
    <div v-for="(post, i) in posts" :key="i">
      <PostPreview :post="post" />
      <hr class="m-8" v-if="i + 1 !== posts.length" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import PostPreview from '@/components/post/post-preview.vue';

import { getFiles } from '~/api/get-files';

import { Post } from '@/types/post';

@Component({
  components: {
    PostPreview
  },
  async asyncData() {
    try {
      const files = await getFiles();

      const posts = files.map(file => {
        return {
          title: file.data.title,
          description: file.data.description,
          date: new Date(file.data.date).toLocaleString('en'),
          text: file.content
        };
      });

      return { posts };
    } catch {}
  }
})
export default class Index extends Vue {
  private posts: Post[] = [];
}
</script>
