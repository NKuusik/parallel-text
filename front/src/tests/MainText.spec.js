/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import MainText from '../components/MainText.vue'
import { store } from '../store.js'


test('MainText when exampleUse is false', () => {
  const wrapper = mount(MainText)
  const conditionalLine = wrapper.findAll('p')[1]
  expect(conditionalLine.text()).toMatch('Pick input texts in .txt format.')
})


test('MainText when exampleUse is true', () => {
    store.exampleUse = true
    const wrapper = mount(MainText)
    const conditionalLine = wrapper.findAll('p')[1]
    expect(conditionalLine.text()).toMatch('Example mode enabled, using pre-defined text')
  })