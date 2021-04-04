<template>
  <div>
    <PostHeader :post="post" />

    <div v-if="isLongPost">
      <AppShowMore
        :isCollapsed="isCollapsed"
        :collapsedHeight="collapsedHeight"
      >
        <p class="text-lg mb-4" v-html="postHtml" ref="text" />
        <div class="keywords overflow-x-auto flex mt-2">
          <AppKeyword v-for="(kw, i) in post.keywords" :value="kw" :key="i" />
        </div>
      </AppShowMore>

      <div class="flex justify-between items-center mt-2" v-if="isLongPost">
        <AppLike />
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
import AppShowMore from '@/components/ui/app-show-more.vue';
import AppLike from '@/components/ui/app-like.vue';

import { calcLineHeight } from '@/modules/calc-line-height';

@Component({
  components: {
    PostHeader,
    AppKeyword,
    AppButtonSlider,
    AppShowMore,
    AppLike
  }
})
export default class PostShort extends Vue {
  @Prop() post!: Post;

  isCollapsed: boolean = true;
  postLineHeight: number = 0;

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
    this.isCollapsed = !this.isCollapsed;
  }

  get collapsedHeight() {
    const lineHeight = this.postLineHeight > 0 ? this.postLineHeight : 28;
    return lineHeight * 7;
  }

  get isLongPost() {
    return this.post.type === PostTypes.LONG;
  }

  mounted() {
    const element: HTMLElement = this.$refs.text as HTMLElement;
    if (element) {
      this.postLineHeight = calcLineHeight(element);
    }
  }
}
</script>

<style lang="scss" scoped>
.keywords::-webkit-scrollbar {
  display: none;
}
</style>
