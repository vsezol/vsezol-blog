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
        <button
          @click="handleShowMore"
          class="preview__btn bg-gray-700 hover:bg-gray-600 text-white text-lg py-2 h-10 w-24"
          style="outline: none !important"
        >
          <transition name="btn-text-slide">
            <div v-if="isCollapsed" class="preview__btn__text h-10 w-24">
              expand
            </div>
          </transition>
          <transition name="btn-text-slide">
            <div v-if="!isCollapsed" class="preview__btn__text h-10 w-24">
              hide
            </div>
          </transition>
        </button>
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
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Post, PostTypes } from '~/types/post';

import PostHeader from './post-header.vue';
import AppKeyword from '@/components/ui/app-keyword.vue';

@Component({
  components: {
    PostHeader,
    AppKeyword
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

.preview__btn {
  position: relative;
  overflow: hidden;
}

.preview__btn__text {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0%;
}

.preview__keywords::-webkit-scrollbar {
  display: none;
}

.btn-text-slide-enter-active {
  transition: 1s all;
}

.btn-text-slide-leave-active {
  transition: 1s all;
}

.btn-text-slide-enter {
  right: -100%;
}

.btn-text-slide-enter-to {
  right: 0%;
}

.btn-text-slide-leave {
  right: 0%;
}

.btn-text-slide-leave-to {
  right: 100%;
}
</style>

<style lang="scss"></style>
