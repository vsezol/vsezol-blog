<template>
  <div @click="handleClick" class="text-4xl text-gray-700 cursor-pointer">
    <transition name="like-smooth" mode="out-in">
      <fa v-if="isLiked" :icon="['fas', 'heart']" key="fas" />
      <fa v-if="!isLiked" :icon="['far', 'heart']" key="far" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { Post } from '~/types/post';

@Component
export default class AppLike extends Vue {
  @Prop() isLiked: boolean;
  @Prop() postId: boolean;

  handleClick() {
    this.setLikeToStorage(!this.isLiked);
    this.$emit('like', this.getLikeFromStorage());
  }

  mounted() {
    this.$emit('like', this.getLikeFromStorage());
  }

  getLikeFromStorage() {
    if (!localStorage) return this.isLiked;

    const postJSON = localStorage.getItem(this.postStorageKey);

    if (!postJSON) return this.isLiked;
    const post: Partial<Post> = JSON.parse(postJSON);

    return post?.isLiked ?? this.isLiked;
  }

  setLikeToStorage(isLiked: boolean) {
    if (!localStorage) return;

    const postJSON = localStorage.getItem(this.postStorageKey);

    let post: Partial<Post>;

    if (!!postJSON) {
      post = { ...JSON.parse(postJSON), isLiked };
    } else {
      post = { isLiked };
    }

    localStorage.setItem(this.postStorageKey, JSON.stringify(post));
  }

  get postStorageKey() {
    return `post-${this.postId}`;
  }
}
</script>

<style lang="scss">
.like-smooth {
  &-enter-active,
  &-leave-active {
    transition: 0.1s all;
  }

  &-enter {
    opacity: 0.75;
    transform: scale(0.75);
  }

  &-enter-to {
    opacity: 1;
    transform: scale(1);
  }

  &-leave {
    opacity: 1;
  }

  &-leave-to {
    transform: scale(0.75);
    opacity: 0.75;
  }
}
</style>
