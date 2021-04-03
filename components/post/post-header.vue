<template>
  <div>
    <div class="flex justify-between items-center flex-wrap mb-2">
      <h2 v-if="post.title" class="text-2xl text-gray-700 font-bold">
        {{ post.title }}
      </h2>
      <div class="text-gray-400">{{ post.date }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Post } from '~/types/post';

@Component({})
export default class PostHeader extends Vue {
  @Prop() post!: Post;
}
</script>
