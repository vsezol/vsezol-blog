import { shallowMount, Wrapper } from '@vue/test-utils';

import { AppLike } from '@/components/ui';

describe('components/ui/app-like', () => {
  let wrapper: Wrapper<AppLike>;

  const FAKE_POST_ID = 'FAKE_POST_ID';
  let FAKE_IS_LIKED = false;

  const postKey = `post-like-${FAKE_POST_ID}`;

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => 'bla');
    Storage.prototype.setItem = jest.fn(() => 'bla');

    wrapper = shallowMount(AppLike, {
      propsData: {
        postId: FAKE_POST_ID,
        isLiked: FAKE_IS_LIKED
      },
      stubs: {
        'fa': 'fa'
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('emits isLiked from localStorage if it is there', () => {
    const FAKE_STORAGE = {
      [postKey]: true
    };

    localStorage.getItem = jest.fn().mockImplementation((key: string) => {
      return JSON.stringify(FAKE_STORAGE[key]);
    });

    expect(wrapper.emitted('like')?.[0][0]).toBe(FAKE_STORAGE[postKey]);
  });

  it('emits isLiked from propsData if it is not there', () => {
    localStorage.getItem = jest.fn().mockImplementation((key: string) => '');
    ``;

    expect(wrapper.emitted('like')?.[0][0]).toBe(FAKE_IS_LIKED);
  });
});
