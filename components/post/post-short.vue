<template>
  <div>
    <PostHeader :post="post" />

    <div v-if="isLongPost">
      <div class="preview__long" ref="textLong">
        <p class="text-lg mb-4" v-html="postHtml" />
        <div class="preview__keywords overflow-x-auto flex mt-2">
          <AppKeyword v-for="(kw, i) in post.keywords" :value="kw" :key="i" />
        </div>
      </div>

      <div class="flex justify-end">
        <AppButtonSlider
          @click="handleShowMore"
          :width="24"
          :texts="['expand', 'hide']"
        />
      </div>
    </div>

    <div v-else>
      <p
        :class="['preview__short', 'mb-4', post.title ? 'text-lg' : 'text-xl']"
        v-html="postHtml"
      />
      <div class="preview__keywords overflow-x-auto flex mt-2">
        <AppKeyword v-for="(kw, i) in post.keywords" :value="kw" :key="i" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Post, PostTypes } from '~/types/post';

import PostHeader from './post-header.vue';
import AppKeyword from '@/components/ui/app-keyword.vue';
import AppButtonSlider from '@/components/ui/app-button-slider.vue';

@Component({
  components: {
    PostHeader,
    AppKeyword,
    AppButtonSlider
  }
})
export default class PostShort extends Vue {
  @Prop() post!: Post;

  isCollapsed: boolean = true;

  get urlToPost() {
    return 'posts/' + this.post.number;
  }

  get postHtml() {
    return this.formatToHtml(this.postText);
  }

  get postText() {
    return this.post.text;
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

  get isLongPost() {
    return this.post.type === PostTypes.LONG;
  }
}
</script>

<style lang="scss" scoped>
.preview__long {
  display: block;
  max-height: 200px;
  overflow-y: hidden;
  transition: 0.5s all;
}
</style>
