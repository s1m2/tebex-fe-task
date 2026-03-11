import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Accordion from '../Accordion.vue';

describe('Accordion.vue', () => {
  const mockItems = [
    { id: 'item-1', title: 'First Item' },
    { id: 'item-2', title: 'Second Item' },
    { id: 'item-3', title: 'Third Item' }
  ];

  it('renders the accordion container', () => {
    const wrapper = mount(Accordion, {
      props: {
        items: mockItems
      }
    });

    expect(wrapper.find('[data-testid="accordion"]').exists()).toBe(true);
  });

  it('renders all accordion items', () => {
    const wrapper = mount(Accordion, {
      props: {
        items: mockItems
      }
    });

    expect(wrapper.find('[data-testid="accordion-item-item-1"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="accordion-item-item-2"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="accordion-item-item-3"]').exists()).toBe(true);
  });

  it('opens the first item on mount', async () => {
    const wrapper = mount(Accordion, {
      props: {
        items: mockItems
      }
    });

    await flushPromises();

    expect(wrapper.find('[data-testid="accordion-content-item-1"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="accordion-content-item-2"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="accordion-content-item-3"]').exists()).toBe(false);
  });

  it('displays minus icon for expanded item', async () => {
    const wrapper = mount(Accordion, {
      props: {
        items: mockItems
      }
    });

    await flushPromises();

    expect(wrapper.find('[data-testid="accordion-icon-item-1"]').text()).toBe('−');
    expect(wrapper.find('[data-testid="accordion-icon-item-2"]').text()).toBe('+');
  });

  it('toggles item expansion on button click', async () => {
    const wrapper = mount(Accordion, {
      props: {
        items: mockItems
      }
    });

    await flushPromises();

    await wrapper.find('[data-testid="accordion-button-item-2"]').trigger('click');
    await flushPromises();

    expect(wrapper.find('[data-testid="accordion-content-item-1"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="accordion-content-item-2"]').exists()).toBe(true);
  });

  it('closes expanded item when clicked again', async () => {
    const wrapper = mount(Accordion, {
      props: {
        items: mockItems
      }
    });

    await flushPromises();

    await wrapper.find('[data-testid="accordion-button-item-1"]').trigger('click');
    await flushPromises();

    expect(wrapper.find('[data-testid="accordion-content-item-1"]').exists()).toBe(false);
  });
});
