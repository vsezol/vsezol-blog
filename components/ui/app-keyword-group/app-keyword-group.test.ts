import { VNode, CreateElement } from 'vue';

import { shallowMount, Wrapper } from '@vue/test-utils';
import { AppKeywordGroup, AppKeyword } from '@/components/ui';

describe('components/ui/app-keyword-group', () => {
  let wrapper: Wrapper<AppKeywordGroup>;

  const KEYWORDS_COUNT = 5;

  const appKeywordList = {
    render(h: CreateElement): VNode {
      return h(
        'div',
        new Array(KEYWORDS_COUNT)
          .fill('')
          .map((_, i) => h(AppKeyword, { props: { value: 'fake_text_' + i } }))
      );
    }
  };

  beforeEach(() => {
    wrapper = shallowMount(AppKeywordGroup, {
      slots: {
        default: appKeywordList
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('contains all AppKeywords with right props', () => {
    const valueList = wrapper
      .findAllComponents(AppKeyword)
      .wrappers.map(w => w.props('value'));

    expect(valueList).toStrictEqual(
      new Array(KEYWORDS_COUNT).fill('').map((_, i) => 'fake_text_' + i)
    );
  });
});
