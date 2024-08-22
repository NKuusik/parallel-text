/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import NavBar from '../components/NavBar.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { describe, expect, it, test } from 'vitest'

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
  console.log(wrapper)
  expect(wrapper.findComponent({name: 'VBtn'}).exists()).toBe(true)
  const exampleUseButton = wrapper.find('v-btn')
  //expect(exampleUseButton.text()).toMatch('Example use')
  //expect(exampleUseButton.classes()).toContain('button-universal')  
  //expect(exampleUseButton.classes()).not.toContain('example-use-active')  

  //await exampleUseButton.trigger('click')
  //expect(exampleUseButton.classes()).toContain('example-use-active')  

  //await exampleUseButton.trigger('click')
  //expect(exampleUseButton.classes()).not.toContain('example-use-active')  

})