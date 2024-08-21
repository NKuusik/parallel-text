/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import NavBar from '../components/NavBar.vue'

test('Test whether toggling example use button changes style of the button', async () => {
  const wrapper = mount(NavBar)
  expect(wrapper.find('v-btn').exists()).toBe(true)
  const exampleUseButton = wrapper.find('v-btn')
  expect(exampleUseButton.text()).toMatch('Example use')
  expect(exampleUseButton.classes()).toContain('button-universal')  
  expect(exampleUseButton.classes()).not.toContain('example-use-active')  

  await exampleUseButton.trigger('click')
  expect(exampleUseButton.classes()).toContain('example-use-active')  

  await exampleUseButton.trigger('click')
  expect(exampleUseButton.classes()).not.toContain('example-use-active')  

})