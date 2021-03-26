<template>
  <div>
    <h2 class="text-xl mb-1 font-bold">{{ post.title }}</h2>

    <div class="flex justify-between items-center mb-1">
      <h3 class="text-lg">{{ post.description }}</h3>
      <div>{{ post.date }}</div>
    </div>

    <div v-if="isLongPost">
      <p class="text-lg mb-4" v-html="formatToHtml(shortText)" />
      <div class="flex justify-end">
        <nuxt-link
          :to="'popa/jopa'"
          class="bg-gray-700 text-white text-lg py-2 px-4"
        >
          read more
        </nuxt-link>
      </div>
    </div>
    <div v-else>
      <p class="text-lg" v-html="formatToHtml(post.text)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Post } from '~/types/post';

@Component
export default class PostPreview extends Vue {
  @Prop() post!: Post;

  get isLongPost() {
    return this.post.text.length > 300;
  }

  formatToHtml(text: string) {
    return text.replace(/\n/gi, '<br />');
  }

  get shortText() {
    return this.post.text.slice(0, 300);
  }
}
</script>
