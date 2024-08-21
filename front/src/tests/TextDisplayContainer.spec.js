/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import TextDisplayContainer from '../components/TextDisplayContainer.vue'

test('TextDisplayContainer without lines in displayedTextArray does not display anything', () => {
  const wrapper = mount(TextDisplayContainer, {
    props: {
      displayedTextArray: [null, null]
    } 
  })

  expect(wrapper.find('div').exists()).toBe(false)
})

test('TextDisplayContainer with lines in displayedTextArray displays these lines properly', () => {
  const wrapper = mount(TextDisplayContainer, {
    props: {
      displayedTextArray: ['First line', 'Second line']
    } 
  })

  expect(wrapper.find('div').exists()).toBe(true)

  const lines = wrapper.findAll('.displayed-texts')

  expect(lines[0].text()).toMatch('First line')
  expect(lines[1].text()).toMatch('Second line')
})