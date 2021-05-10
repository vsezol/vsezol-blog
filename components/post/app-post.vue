<template>
  <div>
    <PostHeader :post="post" />

    <component
      :is="wrapperName"
      :isCollapsed="isCollapsed"
      :collapsedHeight="collapsedHeight"
    >
      <p
        :class="['mb-4', post.title ? 'text-lg' : 'text-xl']"
        v-html="postHtml"
      />

      <AppKeywordGroup class="mt-2">
        <AppKeyword v-for="(kw, i) in post.keywords" :value="kw" :key="i" />
      </AppKeywordGroup>
    </component>

    <div class="flex justify-between items-center mt-2">
      <AppLike @like="handleLike" :isLiked="post.isLiked" :postId="post.id" />

      <AppButtonSlider
        v-if="isLongPost"
        @click="handleShowMore"
        :width="24"
        :texts="['expand', 'hide']"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Post, PostTypes } from '@/types/post';

import PostHeader from './post-header.vue';

import {
  AppKeyword,
  AppKeywordGroup,
  AppShowMore,
  AppLike,
  AppButtonSlider
} from '@/components/ui';

import { calcLineHeight } from '@/modules/calc-line-height';

@Component({
  components: {
    PostHeader,
    AppKeyword,
    AppKeywordGroup,
    AppButtonSlider,
    AppShowMore,
    AppLike
  }
})
export default class AppPost extends Vue {
  @Prop() post!: Post;

  isCollapsed: boolean = true;
  postLineHeight: number = 0;

  mounted() {
    const element: HTMLElement = this.$refs.text as HTMLElement;
    if (element) {
      this.postLineHeight = calcLineHeight(element);
    }
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
    this.isCollapsed = !this.isCollapsed;
  }

  get collapsedHeight() {
    const lineHeight = this.postLineHeight > 0 ? this.postLineHeight : 28;
    return lineHeight * 7;
  }

  get isLongPost() {
    return this.post.type === PostTypes.LONG;
  }

  get wrapperName() {
    return this.isLongPost ? 'AppShowMore' : 'div';
  }

  handleLike(value: boolean) {
    this.post.like(value);
  }
}
</script>
