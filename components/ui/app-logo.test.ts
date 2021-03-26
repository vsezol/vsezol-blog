import { shallowMount } from '@vue/test-utils';
import AppLogo from './app-logo.vue';

describe('components/ui/app-logo.vue', () => {
  it('display logo', () => {
    const wrapper = shallowMount(AppLogo);

    expect(wrapper.text()).toContain('vsezol : blog');
  });
});
