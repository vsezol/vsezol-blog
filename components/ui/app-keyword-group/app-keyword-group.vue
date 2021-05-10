<template>
  <div class="keywords overflow-x-auto flex">
    <slot />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class AppKeywordGroup extends Vue {}
</script>

<style lang="scss" scoped>
.keywords::-webkit-scrollbar {
  display: none;
}
</style>
