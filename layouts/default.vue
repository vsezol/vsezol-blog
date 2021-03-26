<template>
  <div class="max-w-xl container mx-auto p-8">
    <AppLogo />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppLogo from '~/components/ui/app-logo.vue';

@Component({
  components: {
    AppLogo
  }
})
export default class DefaultLayout extends Vue {}
</script>
