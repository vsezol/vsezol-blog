<template>
  <div @click="handleClick" class="text-2xl text-gray-700 cursor-pointer">
    <transition name="like-smooth" mode="out-in">
      <fa v-if="isLiked" :icon="['fas', 'heart']" key="fas" />
      <fa v-if="!isLiked" :icon="['far', 'heart']" key="far" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class AppLike extends Vue {
  @Prop() isLiked: boolean;
  @Prop() postId: boolean;

  handleClick() {
    this.setIsLikedToStorage(!this.isLiked);
    this.emitLike();
  }

  mounted() {
    this.emitLike();
  }

  @Emit('like')
  emitLike() {
    return this.getLikeFromStorage();
  }

  getLikeFromStorage() {
    if (!localStorage) return this.isLiked;

    const isLikedJSON = localStorage.getItem(this.likeStorageKey);

    if (!isLikedJSON) return this.isLiked;

    const isLiked: boolean = JSON.parse(isLikedJSON);

    return isLiked ?? this.isLiked;
  }

  setIsLikedToStorage(isLiked: boolean) {
    if (!localStorage) return;

    localStorage.setItem(this.likeStorageKey, JSON.stringify(isLiked));
  }

  get likeStorageKey() {
    return `post-like-${this.postId}`;
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
