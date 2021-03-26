import { shallowMount } from '@vue/test-utils';
import DefaultLayout from '@/components/ui/app-logo.vue';
import AppLogo from '@/components/ui/app-logo.vue';

describe('layouts/default.vue', () => {
  it('displays logo', () => {
    const wrapper = shallowMount(DefaultLayout);

    expect(wrapper.findComponent(AppLogo)).toBeTruthy();
  });
});
