<template>
  <div class="inline-block px-2 py-1 mr-2 mb-2 bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300">{{ value }}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class AppKeyword extends Vue {
  @Prop() value: string;
}
</script>
