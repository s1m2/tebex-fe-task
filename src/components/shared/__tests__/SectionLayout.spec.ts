import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SectionLayout from '../SectionLayout.vue';

describe('SectionLayout.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(SectionLayout, {
      props: {
        variant: 'primary'
      }
    });

    expect(wrapper.find('[data-testid="section-primary"]').exists()).toBe(true);
  });

  it('applies primary variant background class', () => {
    const wrapper = mount(SectionLayout, {
      props: {
        variant: 'primary'
      }
    });

    const section = wrapper.find('[data-testid="section-primary"]');
    expect(section.classes()).toContain('bg-[#1a1a1a]');
  });

  it('applies secondary variant background class', () => {
    const wrapper = mount(SectionLayout, {
      props: {
        variant: 'secondary'
      }
    });

    const section = wrapper.find('[data-testid="section-secondary"]');
    expect(section.classes()).toContain('bg-black');
  });

  it('renders slot content', () => {
    const wrapper = mount(SectionLayout, {
      props: {
        variant: 'primary'
      },
      slots: {
        default: '<h1>Test Content</h1>'
      }
    });

    expect(wrapper.text()).toContain('Test Content');
    expect(wrapper.find('h1').exists()).toBe(true);
  });
});
