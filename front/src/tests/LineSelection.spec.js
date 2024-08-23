import { mount } from '@vue/test-utils'
import LineSelection from '../components/LineSelection.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { describe, expect, it, test } from 'vitest'
import { store } from '../store.js'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

test('LineSelection starts on line 1', () => {
  const wrapper = mount(LineSelection, {
    props: {
        maxLines: 10
    },
    global: {
      plugins: [vuetify]
    } 
  })
  const lineText = wrapper.find('p')
  expect(lineText.text()).toMatch('Currently on line 1/10')
})

test('Clicking navigation buttons increments or decrements the currentline respectively', async () => {
    store.isDataReceived = true
    const wrapper = mount(LineSelection, {
      props: {
          maxLines: 10
      },
      global: {
        plugins: [vuetify]
      } 
    })
    const navigationButtons = wrapper.findAllComponents({name: 'VBtn'})
    const lineText = wrapper.find('p')
    expect(navigationButtons[0].text()).toMatch('Prev')
    expect(navigationButtons[1].text()).toMatch('Next')
    expect(lineText.text()).toMatch('Currently on line 1/10')

    await navigationButtons[0].trigger('click')
    expect(lineText.text()).toMatch('Currently on line 10/10')
    
    await navigationButtons[0].trigger('click')
    expect(lineText.text()).toMatch('Currently on line 9/10')

    await navigationButtons[1].trigger('click')
    expect(lineText.text()).toMatch('Currently on line 10/10')

    await navigationButtons[1].trigger('click')
    expect(lineText.text()).toMatch('Currently on line 1/10')

    await navigationButtons[1].trigger('click')
    expect(lineText.text()).toMatch('Currently on line 2/10')

  })


  test('Navigating via arrow keys increments or decrements the currentline respectively', async () => {
    store.isDataReceived = true

    const wrapper = mount(LineSelection, {
      props: {
          maxLines: 10
      },
      global: {
        plugins: [vuetify]
      } 
    })
    const lineText = wrapper.find('p')
    expect(lineText.text()).toMatch('Currently on line 1/10')


    const moveLeftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    window.dispatchEvent(moveLeftEvent);
    await wrapper.vm.$nextTick()

    expect(lineText.text()).toMatch('Currently on line 10/10')

    window.dispatchEvent(moveLeftEvent);
    await wrapper.vm.$nextTick()
    expect(lineText.text()).toMatch('Currently on line 9/10')


    window.dispatchEvent(moveLeftEvent);
    await wrapper.vm.$nextTick()
    expect(lineText.text()).toMatch('Currently on line 8/10')
    
    const moveRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });

    window.dispatchEvent(moveRightEvent);
    await wrapper.vm.$nextTick()
    expect(lineText.text()).toMatch('Currently on line 9/10')

    window.dispatchEvent(moveRightEvent);
    await wrapper.vm.$nextTick()
    expect(lineText.text()).toMatch('Currently on line 10/10')

    window.dispatchEvent(moveRightEvent);
    await wrapper.vm.$nextTick()
    expect(lineText.text()).toMatch('Currently on line 1/10')
  })



  test('Jump to line via enter', async () => {
    store.isDataReceived = true

    const wrapper = mount(LineSelection, {
      props: {
          maxLines: 10
      },
      global: {
        plugins: [vuetify]
      } 
    })
    const lineText = wrapper.find('p')
    expect(lineText.text()).toMatch('Currently on line 1/10')


    const inputField = wrapper.find('input')
    inputField.setValue(6)
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    
    window.dispatchEvent(enterEvent);
    await wrapper.vm.$nextTick()
    expect(lineText.text()).toMatch('Currently on line 6/10')


    inputField.setValue(60)
    window.dispatchEvent(enterEvent);
    await wrapper.vm.$nextTick()
    expect(lineText.text()).toMatch('Currently on line 10/10')

    inputField.setValue(-7)
    window.dispatchEvent(enterEvent);
    await wrapper.vm.$nextTick()
    expect(lineText.text()).toMatch('Currently on line 1/10')
  })
