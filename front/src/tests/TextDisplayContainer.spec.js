
import { mount } from '@vue/test-utils'
import TextDisplayContainer from '../components/TextDisplayContainer.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { expect, test } from 'vitest'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

test('TextDisplayContainer without lines in displayedTextObject does not display anything', () => {
  const wrapper = mount(TextDisplayContainer, {
    props: {
      displayedTextObject: {
        lines: [null, null],
        comparison: null
        }
    },

    global: {
      plugins: [vuetify]
    } 
  })

  expect(wrapper.find('div').exists()).toBe(false)
})


test('TextDisplayContainer with identical lines in displayedTextObject displays these lines properly', () => {
  const wrapper = mount(TextDisplayContainer, {
    props: {
      displayedTextObject: {
          lines: ['Identical line', 'Identical line'],
          comparison: [['Identical line']]
          }
    },
    global: {
      plugins: [vuetify]
    } 
  })
  expect(true).toBe(true)

  expect(wrapper.find('div').exists()).toBe(true)

  const lines = wrapper.findAll('.displayed-texts')

  expect(lines[0].text()).toMatch('Identical line')
  expect(lines[1].text()).toMatch('Identical line')

})

test('TextDisplayContainer with different lines in displayedTextObject displays these lines properly', () => {
  const wrapper = mount(TextDisplayContainer, {
    props: {
      displayedTextObject: {
          lines: ['First line', 'Second line'],
          comparison: [['First line', 'Second line']]
          }
    },
    global: {
      plugins: [vuetify]
    } 
  })
  expect(true).toBe(true)

  expect(wrapper.find('div').exists()).toBe(true)

  const lines = wrapper.findAll('.displayed-texts')

  expect(lines[0].text()).toMatch('First line')
  expect(lines[1].text()).toMatch('Second line')

})


test('Toggling comparison checkbox works properly', async () => {
  const wrapper = mount(TextDisplayContainer, {
    props: {
      displayedTextObject: {
          lines: ['First line', 'Second line'],
          comparison: [['First line', 'Second line']]
          }
    },
    global: {
      plugins: [vuetify]
    } 
  })
  expect(true).toBe(true)

  expect(wrapper.find('div').exists()).toBe(true)

  const lines = wrapper.findAll('.displayed-texts')

  expect(lines[0].text()).toMatch('First line')
  expect(lines[1].text()).toMatch('Second line')

  const checkbox = wrapper.findComponent({name: 'VCheckbox'})
  expect(wrapper.vm.isComparisonActive).toBe(true);

  await checkbox.setValue(false);

  expect(wrapper.vm.isComparisonActive).toBe(false);

  expect(lines[0].text()).toMatch('First line')
  expect(lines[1].text()).toMatch('Second line')


})

test('If there is no comparison data, ignore checkbox value', async () => {
  const wrapper = mount(TextDisplayContainer, {
    props: {
      displayedTextObject: {
          lines: ['First line', ''],
          comparison: undefined
          }
    },
    global: {
      plugins: [vuetify]
    } 
  })
  expect(true).toBe(true)

  expect(wrapper.find('div').exists()).toBe(true)

  const lines = wrapper.findAll('.displayed-texts')

  expect(lines[0].text()).toMatch('First line')
  expect(lines[1].text()).toMatch('')

  expect(wrapper.vm.isComparisonActive).toBe(true);
})
