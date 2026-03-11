import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppInput from '../AppInput.vue';

describe('AppInput.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(AppInput, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        placeholder: 'Enter text'
      }
    });
    
    expect(wrapper.find('[data-testid="input-test-input"]').exists()).toBe(true);
  });
});

