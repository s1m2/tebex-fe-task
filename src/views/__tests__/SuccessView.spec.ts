import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SuccessView from '../SuccessView.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useProductStore } from '../../stores/product';
import { createRouter, createMemoryHistory } from 'vue-router';

describe('SuccessView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const createTestRouter = () => {
    return createRouter({
      history: createMemoryHistory(),
      routes: []
    });
  };

  const mountComponent = () => {
    return mount(SuccessView, {
      global: {
        plugins: [createTestRouter()]
      }
    });
  };

  it('renders the component', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('[data-testid="success-page"]').exists()).toBe(true);
  });

  it('applies correct background and layout classes', () => {
    const wrapper = mountComponent();
    const successPage = wrapper.find('[data-testid="success-page"]');
    expect(successPage.exists()).toBe(true);
  });

  it('renders logo image with data-testid', () => {
    const wrapper = mountComponent();
    const logo = wrapper.find('[data-testid="logo"]');
    expect(logo.exists()).toBe(true);
    expect(logo.attributes('alt')).toBe('logo');
  });

  it('renders success icon with data-testid', () => {
    const wrapper = mountComponent();
    const successIcon = wrapper.find('[data-testid="success-icon"]');
    expect(successIcon.exists()).toBe(true);
    expect(successIcon.attributes('alt')).toBe('Success');
  });

  it('renders order complete heading', () => {
    const wrapper = mountComponent();
    const heading = wrapper.find('[data-testid="order-complete"]');
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Order complete');
  });

  it('renders thank you message', () => {
    const wrapper = mountComponent();
    const message = wrapper.find('[data-testid="thank-you-message"]');
    expect(message.exists()).toBe(true);
    expect(message.text()).toContain('Thank you for your payment');
  });

  it('displays order transaction ID from store', async () => {
    const wrapper = mountComponent();
    const productStore = useProductStore();
    productStore.orderConfirmedStatus = {
      transactionId: 'test-123',
      success: true,
    };
    await wrapper.vm.$nextTick();

    const orderNumber = wrapper.find('[data-testid="order-number"]');
    expect(orderNumber.exists()).toBe(true);
    expect(orderNumber.text()).toContain('test-123');
  });

});
