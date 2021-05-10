import { shallowMount, Wrapper } from '@vue/test-utils';
import { AppButton } from '@/components/ui';

describe('components/ui/app-button', () => {
  const FAKE_TEXT = 'fake_text';
  let wrapper: Wrapper<AppButton>;

  beforeEach(() => {
    wrapper = shallowMount(AppButton, {
      slots: {
        default: FAKE_TEXT
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('emits click when cliked', () => {
    const btn = wrapper
      .findAll('button')
      .wrappers.find(w => w.text() === FAKE_TEXT);

    btn?.trigger('click');

    expect(wrapper.emitted('click')?.length).toBe(1);
  });
});
