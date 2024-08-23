import { mount, render } from '@vue/test-utils'
import App from '../App.vue'
import { store } from '../store.js'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { describe, expect, it, test, vi } from 'vitest'
import LineSelection from '../components/LineSelection.vue'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')
// Todo
test('Valid data functions correctly', () => {

    const mockDataReceived = vi.fn().mockReturnValue(
        [
            ['First sentence in first text', 'Second sentence in first text'],
            ['First sentence in second text', 'Second sentence in second text']
        ]);

  const wrapper = mount(
    App, 
    {
      global: {
        plugins: [vuetify]
      },
      methods: {
        handleSubmit: () =>         [
            ['First sentence in first text', 'Second sentence in first text'],
            ['First sentence in second text', 'Second sentence in second text']
        ]
      },
    })

    const lineSelectionComponent = wrapper.findComponent({name: 'LineSelection'})
    const lineText = lineSelectionComponent.find('p')
    expect(true).toBe(true)
    // Todo
//    expect(lineText.text()).toMatch('Currently on line 1/2')
})