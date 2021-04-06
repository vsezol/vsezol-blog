<template>
  <div>
    <div v-for="(post, i) in posts" :key="i">
      <AppPost :post="post" />
      <hr class="my-8" v-if="i + 1 !== posts.length" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import AppPost from '@/components/post/app-post.vue';

import { getFiles } from '@/api/get-files';

import { PostImpl } from '@/modules/post';

import { Post } from '@/types/post';

type PostPOJO = Omit<Post, 'like' | 'isLiked'>;

@Component({
  components: {
    AppPost
  },
  async asyncData() {
    try {
      const files = await getFiles();

      const posts = files.map(
        (file, i): PostPOJO => {
          return {
            title: file.data.title,
            date: new Date(file.data.date).toLocaleString('en'),
            text: file.content,
            id: i,
            type: file.data.type,
            keywords: file.data?.keywords?.split(' ')
          };
        }
      );

      return { posts };
    } catch (e) {
      console.log('Error while processing files with posts');
      console.log(e);
    }
  }
})
export default class Index extends Vue {
  posts: Post[] | PostPOJO[] = [];

  created() {
    this.posts = this.posts.map((p: PostPOJO) => new PostImpl(p));
  }
}
</script>
