import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AmountRow from '../AmountRow.vue';

describe('AmountRow.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(AmountRow, {
      props: {
        label: 'Subtotal:',
        amount: 100
      }
    });

    expect(wrapper.find('[data-testid="amount-row-label-Subtotal:"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="amount-row-amount-Subtotal:"]').exists()).toBe(true);
  });

  it('shows badge when discount is present', () => {
    const wrapper = mount(AmountRow, {
      props: {
        label: 'Discounts:',
        amount: 10,
        isDiscount: true,
        couponCode: 'SAVE10'
      }
    });

    expect(wrapper.find('[data-testid="amount-row-discount-Discounts:"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="amount-row-discount-Discounts:"]').text()).toBe('SAVE10');
  });

  it('adds minus sign for discount amounts', () => {
    const wrapper = mount(AmountRow, {
      props: {
        label: 'Discounts:',
        amount: 10,
        isDiscount: true,
        couponCode: 'SAVE10'
      }
    });

    const amountText = wrapper.find('[data-testid="amount-row-amount-Discounts:"]').text();
    expect(amountText).toContain('-');
    expect(amountText).toBe('-10 USD');
  });

  it('applies total styles when isTotal is true', () => {
    const wrapper = mount(AmountRow, {
      props: {
        label: 'Total:',
        amount: 100,
        isTotal: true
      }
    });

    const labelElement = wrapper.find('[data-testid="amount-row-label-Total:"]');
    const amountElement = wrapper.find('[data-testid="amount-row-amount-Total:"]');

    expect(labelElement.classes()).toContain('text-lg');
    expect(labelElement.classes()).toContain('font-bold');
    expect(amountElement.classes()).toContain('text-lg');
    expect(amountElement.classes()).toContain('font-bold');
  });
});
