<template>
  <AppButton :width="width" :height="height">
    <transition v-for="slide in slides" :key="slide.index" name="btn-slide">
      <div
        v-if="slide.isShow"
        :class="slideClasses"
        @click="handleClick(slide.index)"
      >
        {{ slide.text }}
      </div>
    </transition>
  </AppButton>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

import AppButton from '@/components/ui/app-button.vue';

@Component({
  components: {
    AppButton
  }
})
export default class AppButtonSlider extends Vue {
  @Prop() texts: string[];
  @Prop({ default: 24 }) width: number | string;
  @Prop({ default: 10 }) height: number | string;

  currentIndex: number = 0;

  handleClick(index: number) {
    this.currentIndex = index;

    this.currentIndex === this.texts.length - 1
      ? (this.currentIndex = 0)
      : (this.currentIndex = index + 1);

    this.$emit('click', this.texts[index], index);
  }

  get slides() {
    return this.texts.map((text, index) => ({
      text,
      index,
      isShow: index === this.currentIndex
    }));
  }

  get slideClasses() {
    return [
      'absolute',
      'flex',
      'items-center',
      'justify-center',
      'top-0',
      'right-0',
      'w-' + this.width,
      'h-' + this.height
    ];
  }
}
</script>

<style lang="scss" scoped>
.btn-slide {
  &-enter-active,
  &-leave-active {
    transition: 0.75s all;
  }

  &-enter {
    right: -100%;
  }

  &-enter-to,
  &-leave {
    right: 0%;
  }

  &-leave-to {
    right: 100%;
  }
}
</style>
