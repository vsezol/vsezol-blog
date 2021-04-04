<template>
  <button
    @click="handleClick"
    :class="classes"
    style="outline: none !important"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator';

@Component
export default class AppButton extends Vue {
  @Prop({ default: 'auto' }) width: number | string;
  @Prop({ default: 10 }) height: number | string;

  @Emit('click')
  handleClick() {}

  get classes() {
    return [
      'overflow-hidden',
      'bg-gray-700',
      'text-white',
      'text-lg',
      'py-2',
      'px-2',
      'h-10',
      'relative',
      'h-' + this.height,
      'w-' + this.width,
      'min-w-' + this.width
    ];
  }
}
</script>
