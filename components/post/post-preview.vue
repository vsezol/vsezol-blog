<template>
  <div>
    <h2 v-if="post.title" class="text-xl mb-1 font-bold">{{ post.title }}</h2>

    <div>{{ post.date }}</div>

    <div v-if="isLongPost">
      <p class="preview__long text-lg mb-4" ref="textLong" v-html="postHtml" />
      <div class="flex justify-end">
        <button
          @click="handleShowMore"
          class="bg-gray-700 hover:bg-gray-600 text-white text-lg py-2 w-24"
          style="outline: none !important"
        >
          {{ toggleButtonText }}
        </button>
      </div>
    </div>

    <div v-else>
      <p class="preview__short text-lg mb-4" v-html="postHtml" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Post, PostTypes } from '~/types/post';

@Component
export default class PostPreview extends Vue {
  @Prop() post: Post;

  isCollapsed: boolean = true;

  get urlToPost() {
    return 'posts/' + this.post.number;
  }

  get postHtml() {
    return this.formatToHtml(this.postText);
  }

  formatToHtml(text: string) {
    return text.replace(/\n/i, '').replace(/\n/gi, '<br />');
  }

  handleShowMore() {
    const element: HTMLElement = this.$refs.textLong as HTMLElement;
    const maxHeight = this.isCollapsed ? element.scrollHeight : 200;
    element.style.maxHeight = maxHeight + 'px';
    this.isCollapsed = !this.isCollapsed;
  }

  get postText() {
    return this.post.text;
  }

  get isLongPost() {
    return this.post.type === PostTypes.LONG;
  }

  get toggleButtonText() {
    return this.isCollapsed ? 'expand' : 'hide';
  }
}
</script>

<style lang="scss" scoped>
.preview__long {
  display: block;
  max-height: 200px;
  overflow-y: hidden;
  transition: 1s all;
}
</style>
