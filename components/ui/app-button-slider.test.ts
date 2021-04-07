import { shallowMount, Wrapper } from '@vue/test-utils';
import AppButtonSlider from './app-button-slider.vue';

describe('components/ui/app-logo.vue', () => {
  let FAKE_TEXTS = ['fake_1', 'fake_2'];
  let wrapper: Wrapper<AppButtonSlider>;

  beforeEach(() => {
    wrapper = shallowMount(AppButtonSlider, {
      propsData: {
        texts: FAKE_TEXTS
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders FAKE_TEXTS[0]', () => {
    const btn = findBtn(FAKE_TEXTS[0]);

    expect(btn?.exists()).toBe(true);
  });

  it('change button text when click', () => {
    clickBtn(FAKE_TEXTS[0]);

    const newBtn = findBtn(FAKE_TEXTS[1]);

    expect(newBtn?.exists()).toBe(true);
  });

  it('emits [text, index] when click btn', async () => {
    await clickBtn(FAKE_TEXTS[0]);
    await clickBtn(FAKE_TEXTS[1]);

    expect(wrapper.emitted('click')).toStrictEqual([
      [FAKE_TEXTS[0], 0],
      [FAKE_TEXTS[1], 1]
    ]);
  });

  async function clickBtn(text: string) {
    const btn = findBtn(text);
    console.log(wrapper.html());

    btn?.trigger('click');

    await wrapper.vm.$nextTick();
  }

  function findBtn(text: string) {
    return wrapper.findAll('div').wrappers.find(w => w.text() === text);
  }
});
