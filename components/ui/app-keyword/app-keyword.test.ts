import { shallowMount, Wrapper } from '@vue/test-utils';
import { AppKeyword } from '@/components/ui';

describe('components/ui/app-keyword.vue', () => {
  const FAKE_TEXT = 'fake_text';
  let wrapper: Wrapper<AppKeyword>;

  beforeEach(() => {
    wrapper = shallowMount(AppKeyword, {
      propsData: {
        value: FAKE_TEXT
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('contains FAKE_TEXT', () => {
    expect(wrapper.text()).toContain(FAKE_TEXT);
  });
});
