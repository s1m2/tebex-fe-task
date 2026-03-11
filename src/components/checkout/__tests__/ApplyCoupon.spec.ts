import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ApplyCoupon from '../ApplyCoupon.vue';

describe('ApplyCoupon.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(ApplyCoupon);

    expect(wrapper.find('[data-testid="apply-coupon-button"]').exists()).toBe(true);
  });

  it('shows error when no coupon code is entered', async () => {
    const wrapper = mount(ApplyCoupon);

    expect(wrapper.find('[data-testid="no-coupon-applied-error"]').exists()).toBe(false);

    await wrapper.find('[data-testid="apply-coupon-button"]').trigger('click');

    expect(wrapper.find('[data-testid="no-coupon-applied-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="no-coupon-applied-error"]').text()).toBe('Please enter a coupon code.');
  });

  it('hides error and emits when valid coupon code is entered', async () => {
    const wrapper = mount(ApplyCoupon);

    const input = wrapper.find('[data-testid="input-code"]');
    await input.setValue('SAVE10');

    await wrapper.find('[data-testid="apply-coupon-button"]').trigger('click');

    expect(wrapper.find('[data-testid="no-coupon-applied-error"]').exists()).toBe(false);
    expect(wrapper.emitted('apply-coupon')).toBeTruthy();
    expect(wrapper.emitted('apply-coupon')![0]).toEqual(['SAVE10']);
  });
});
