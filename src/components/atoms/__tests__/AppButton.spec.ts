import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppButton from '../AppButton.vue';

describe('AppButton.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(AppButton, {
      props: {
        variant: 'primary'
      }
    });
    
    expect(wrapper.find('[data-testid="app-button"]').exists()).toBe(true);
  });
});
