<template>
  <div @click="handleClick" class="text-4xl text-gray-700 cursor-pointer">
    <transition name="like-smooth" mode="out-in">
      <fa v-if="isLiked" :icon="['fas', 'heart']" key="fas" />
      <fa v-if="!isLiked" :icon="['far', 'heart']" key="far" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class AppLike extends Vue {
  @Prop() postId: number;

  isLiked: boolean = false;

  handleClick() {
    this.isLiked = !this.isLiked;
  }
}
</script>

<style lang="scss">
.like-smooth {
  &-enter-active,
  &-leave-active {
    transition: 0.25s all;
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
