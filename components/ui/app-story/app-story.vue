<template>
  <div
    class="w-screen h-screen absolute"
    :style="{
      top: position.y + 'px',
      left: position.x + 'px',
      transition: `all ${transition}s`
    }"
  >
    <div
      class="w-screen h-screen"
      :style="{
        background: `url(${story.image})`,
        'background-size': 'cover'
      }"
    >
      <div class="w-100 h-100 p-5">
        <h1 class="text-center w-100 mb-5">
          {{ story.title }}
        </h1>
        <p>{{ story.text }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Story } from '@/types/story';
import { Direction, Position } from '@/types/swipes';

@Component
export default class AppStory extends Vue {
  @Prop() story: Story;
  @Prop() position: Position;
  @Prop({ default: 1 }) transition: number;

  // onSwipeMove(direction: Direction, positionDiff: Position) {
  //   this.$emit('swipe-move', direction, positionDiff);
  // }

  // onSwipeEnd(direction: Direction) {
  //   this.$emit('swipe-end', direction);
  // }
}
</script>
