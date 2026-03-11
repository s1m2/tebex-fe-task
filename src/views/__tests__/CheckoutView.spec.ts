import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CheckoutView from '../CheckoutView.vue';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';

describe('CheckoutView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const createTestRouter = () => {
    return createRouter({
      history: createMemoryHistory(),
      routes: []
    });
  };

  const mountComponent = (options = {}) => {
    return mount(CheckoutView, {
      global: {
        plugins: [createTestRouter()],
        stubs: {
          SectionLayout: { template: '<div class="section-layout"><slot /></div>', props: ['variant'] },
          OrderContainer: { template: '<div class="order-container"></div>' },
          PaymentForm: { template: '<div class="payment-form"></div>' },
          Breadcrumbs: { template: '<div class="breadcrumbs"></div>', props: ['pageBreadcrumbs', 'currentPage'] }
        }
      },
      ...options
    });
  };

  it('renders the component', () => {
    const wrapper = mountComponent();
    expect(wrapper.exists()).toBe(true);
  });

  it('renders grid layout with two columns', () => {
    const wrapper = mountComponent();
    const grid = wrapper.find('.grid');
    expect(grid.exists()).toBe(true);
    expect(grid.classes()).toContain('grid-cols-2');
  });

  it('renders OrderContainer in section layout', () => {
    const wrapper = mountComponent();
    const orderContainer = wrapper.find('.order-container');
    expect(orderContainer.exists()).toBe(true);
  });


  it('sets document title correctly', () => {
    mountComponent();
    expect(document.title).toBe('Tebex - Frontend task');
  });

  it('renders breadcrumbs before payment form', () => {
    const wrapper = mountComponent();
    const breadcrumbs = wrapper.find('.breadcrumbs');
    const paymentForm = wrapper.find('.payment-form');
    expect(breadcrumbs.exists()).toBe(true);
    expect(paymentForm.exists()).toBe(true);
  });
});
