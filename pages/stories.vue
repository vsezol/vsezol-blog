<template>
  <div class="absolute top-0 left-0 w-screen h-screen overflow-hidden">
    <AppSwipable @swipe-move="onSwipeMove" @swipe-end="onSwipeEnd">
      <AppStory
        v-for="(item, i) in stories"
        :key="item.image"
        :story="item"
        :position="currentPositions[i]"
        :transition="transition"
      />
    </AppSwipable>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppStory } from '@/components/ui';
import { Story } from '~/types/story';
import { Direction, Position } from '~/types/swipes';

import AppSwipable from '@/components/ui/app-swipable/app-swipable.vue';

const createPositions = (height: number = 0) => {
  return new Array(3).fill('').map((_, i) => {
    return {
      y: i * height,
      x: 0
    };
  });
};

@Component({
  components: {
    AppStory,
    AppSwipable
  }
})
export default class Index extends Vue {
  stories: Story[] = [
    {
      text: 'Какой-то текст!',
      title: 'Какой-то заголовок',
      image:
        'https://smmplanner.com/blog/content/images/2020/07/27-Stories-samoletiki.jpg',
      date: new Date()
    },
    {
      text: 'dslkndjksndjsndjs',
      title: 'nsdjnsjdnsjdns',
      image:
        'https://petslike.net/media/cache/sylius_blog_item_image/55/13/42391f0aff6f3cd47e24a257853a.jpeg',
      date: new Date()
    },
    {
      text: 'dslkndjksndjsndjsdsdsdsd',
      title: 'nsdjnsjdnsjdnsdsdbshdvs',
      image:
        'https://dogcity.ua/wp-content/uploads/2019/11/file_6048x4024_000972.jpg',
      date: new Date()
    }
  ];

  currentPositions: Position[] = createPositions();
  transition = 0.1;

  mounted() {
    this.currentPositions = createPositions(window.innerHeight);
  }

  onSwipeMove(direction: Direction, newDiff: Position, lastDiff: Position) {
    const diffY = Math.abs(newDiff.y - lastDiff.y);

    // if (diffY > 50) {
    //   this.transition = 0.5;
    // } else {
    //   this.transition = 0.1;
    // }
    // this.transition = Math.round(diffY) / 100;

    if (direction === 'up') {
      this.swipe(diffY > 0 ? -diffY : -10);
    } else if (direction === 'down') {
      this.swipe(diffY > 0 ? diffY : 10);
    }
  }

  onSwipeEnd(direction: Direction) {
    // if (direction === 'up') {
    //   this.swipe(window.innerHeight * -1);
    // } else if (direction === 'down') {
    //   this.swipe(window.innerHeight);
    // }
    // console.log('swipeEnd', direction);

    this.normalize();
  }

  swipe(diff: number) {
    this.currentPositions.forEach(pos => {
      pos.y += diff;
    });
  }

  normalize() {
    // const diff = console.log(diff);
    this.transition = 0.5;

    this.currentPositions.forEach(pos => {
      pos.y = Math.round(pos.y / window.innerHeight) * window.innerHeight;
    });
    setTimeout(() => {
      this.transition = 0.1;
    }, 500);
  }
}
</script>
