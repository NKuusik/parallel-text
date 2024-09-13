import { mount } from '@vue/test-utils'
import NavBar from '../components/NavBar.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { expect, test } from 'vitest'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

test('Test whether toggling example use button changes style of the button', async () => {
  const wrapper = mount(
    NavBar, 
    {
      global: {
        plugins: [vuetify]
      }
    })
  expect(wrapper.findComponent({name: 'VBtn'}).exists()).toBe(true)
  const exampleUseButton = wrapper.findComponent({name: 'VBtn'})
  expect(exampleUseButton.text()).toMatch('Example use')
  expect(exampleUseButton.classes()).toContain('button-universal')  
  expect(exampleUseButton.classes()).not.toContain('navbar-button-active')  

  await exampleUseButton.trigger('click')
  expect(exampleUseButton.classes()).toContain('navbar-button-active')  

  await exampleUseButton.trigger('click')
  expect(exampleUseButton.classes()).not.toContain('navbar-button-active')
})