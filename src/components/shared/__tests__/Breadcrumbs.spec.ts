import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Breadcrumbs from '../Breadcrumbs.vue';

describe('Breadcrumbs.vue', () => {
  const mockBreadcrumbs = [
    { name: 'Home', link: '/home' },
    { name: 'Products', link: '/products' },
    { name: 'Details', link: '/details' }
  ];

  it('renders the component', () => {
    const wrapper = mount(Breadcrumbs, {
      props: {
        pageBreadcrumbs: mockBreadcrumbs,
        currentPage: '/home'
      }
    });

    expect(wrapper.find('[data-testid="breadcrumbs"]').exists()).toBe(true);
  });

  it('renders all breadcrumb items', () => {
    const wrapper = mount(Breadcrumbs, {
      props: {
        pageBreadcrumbs: mockBreadcrumbs,
        currentPage: '/home'
      }
    });

    expect(wrapper.find('[data-testid="breadcrumb-Home"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="breadcrumb-Products"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="breadcrumb-Details"]').exists()).toBe(true);
  });


  it('highlights current page breadcrumb', () => {
    const wrapper = mount(Breadcrumbs, {
      props: {
        pageBreadcrumbs: mockBreadcrumbs,
        currentPage: '/products'
      }
    });

    const productsBreadcrumb = wrapper.find('[data-testid="breadcrumb-Products"]');
    expect(productsBreadcrumb.classes()).toContain('text-[#41C4C3]');
    expect(productsBreadcrumb.classes()).toContain('font-bold');
  });

  it('does not highlight non-current page breadcrumbs', () => {
    const wrapper = mount(Breadcrumbs, {
      props: {
        pageBreadcrumbs: mockBreadcrumbs,
        currentPage: '/products'
      }
    });

    const homeBreadcrumb = wrapper.find('[data-testid="breadcrumb-Home"]');
    const detailsBreadcrumb = wrapper.find('[data-testid="breadcrumb-Details"]');

    expect(homeBreadcrumb.classes()).not.toContain('text-[#41C4C3]');
    expect(homeBreadcrumb.classes()).not.toContain('font-bold');
    expect(detailsBreadcrumb.classes()).not.toContain('text-[#41C4C3]');
    expect(detailsBreadcrumb.classes()).not.toContain('font-bold');
  });
});
