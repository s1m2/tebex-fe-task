import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import OrderContainer from '../OrderContainer.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useProductStore } from '../../../stores/product';

describe('OrderContainer.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders the component', async () => {
    const store = useProductStore();
    
    // Mock the basketItems
    store.basketItems = {
      id: "1",
      products: [
        { name: 'Test Product', price: 50, image: 'test.jpg', quantity: 1 }
      ],
      subTotal: 50,
      salesTax: 5,
      total: 55,
      couponCode: null
    };

    const wrapper = mount(OrderContainer, {
      global: {
        stubs: {
          OrderItem: true,
          ApplyCoupon: true,
          AmountRow: true
        }
      }
    });
    
    expect(wrapper.find('[data-testid="order-container-title"]').exists()).toBe(true);
  });
});
