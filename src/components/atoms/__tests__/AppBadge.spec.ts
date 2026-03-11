import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppBadge from '../AppBadge.vue';

describe('AppBadge.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(AppBadge);
    expect(wrapper.find('[data-testid="app-badge"]').exists()).toBe(true);
  });
});
