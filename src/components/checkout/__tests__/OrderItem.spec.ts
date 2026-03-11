import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import OrderItem from '../OrderItem.vue';
import type { Product } from '../../../types/product';

describe('OrderItem.vue', () => {
  it('renders the component', () => {
    const product: Product = {
      name: 'Test Product',
      price: 50,
      image: 'test.jpg',
      quantity: 1
    };

    const wrapper = mount(OrderItem, {
      props: {
        product
      }
    });

    expect(wrapper.find('[data-testid="order-item-image-Test Product"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="order-item-name-Test Product"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="order-item-quantity-Test Product"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="order-item-price-Test Product"]').exists()).toBe(true);
  });

  it('renders all data-testids with correct content', () => {
    const product: Product = {
      name: 'Laptop',
      price: 1200,
      image: 'laptop.jpg',
      quantity: 2
    };

    const wrapper = mount(OrderItem, {
      props: {
        product
      }
    });

    expect(wrapper.find('[data-testid="order-item-name-Laptop"]').text()).toBe('Laptop');
    expect(wrapper.find('[data-testid="order-item-quantity-Laptop"]').text()).toContain('Qty: 2');
    expect(wrapper.find('[data-testid="order-item-price-Laptop"]').text()).toContain('1200 USD');
  });
});
