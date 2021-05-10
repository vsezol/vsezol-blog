<template>
  <div
    ref="readMore"
    class="read-more"
    :style="{ 'max-height': collapsedHeight + 'px' }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class AppShowMore extends Vue {
  @Prop() isCollapsed: boolean;
  @Prop({ default: 200 }) collapsedHeight: number;

  @Watch('isCollapsed', { immediate: true })
  onChangeIsCollapsed() {
    const element: HTMLElement = this.$refs.readMore as HTMLElement;

    if (element) {
      const maxHeight = this.isCollapsed
        ? this.collapsedHeight
        : element.scrollHeight;

      element.style.maxHeight = maxHeight + 'px';
    }
  }
}
</script>

<style lang="scss" scoped>
.read-more {
  display: block;
  overflow-y: hidden;
  transition: 0.75s all;
}
</style>
