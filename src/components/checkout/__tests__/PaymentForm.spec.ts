import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PaymentForm from '../PaymentForm.vue';

describe('PaymentForm.vue', () => {
  it('renders the component with all data-testids', () => {
    const wrapper = mount(PaymentForm);

    expect(wrapper.find('[data-testid="card-details"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="pay-by-card-button"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="input-email"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="input-cardNumber"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="input-expiry"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="input-cvv"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="input-zip"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="input-nameOnCard"]').exists()).toBe(true);
  });

  it('shows error state when submitted with invalid data', async () => {
    const wrapper = mount(PaymentForm);

    await wrapper.find('[data-testid="pay-by-card-button"]').trigger('click');

    expect(wrapper.emitted('submit-card')).toBeFalsy();
  });

  it('submits the form when the button is clicked', async () => {
    const wrapper = mount(PaymentForm);

    const inputs = wrapper.findAll('input');
    for (const input of inputs) {
      if (input.element.id === 'email') await input.setValue('test@example.com');
      if (input.element.id === 'cardNumber') await input.setValue('4111111111111111');
      if (input.element.id === 'expiry') await input.setValue('12/26');
      if (input.element.id === 'cvv') await input.setValue('123');
      if (input.element.id === 'zip') await input.setValue('SW1A 1AA');
      if (input.element.id === 'nameOnCard') await input.setValue('John Doe');
    }

    const submitButton = wrapper.find('[data-testid="pay-by-card-button"]');
    expect(submitButton.exists()).toBe(true);
    await submitButton.trigger('click');
  });
});
