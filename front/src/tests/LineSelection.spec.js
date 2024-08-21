/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import LineSelection from '../components/LineSelection.vue'

test('LineSelection starts on line 1', () => {
  const wrapper = mount(LineSelection, {
    props: {
        maxLines: 10
    } 
  })
  const lineText = wrapper.find('p')
  expect(lineText.text()).toMatch('Currently on line 1/10')
})

test('Clicking navigation buttons increments or decrements the currentline respectively', async () => {
    const wrapper = mount(LineSelection, {
      props: {
          maxLines: 10
      } 
    })
    const navigationButtons = wrapper.findAll('v-btn')
    const lineText = wrapper.find('p')
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


// Keyboard events do not seem to work at the moment.
/*
  test('Navigating via arrow keys increments or decrements the currentline respectively', async () => {
    const wrapper = mount(LineSelection, {
      props: {
          maxLines: 10
      } 
    })
    const lineText = wrapper.find('p')
    expect(lineText.text()).toMatch('Currently on line 1/10')

    await navigationButtons[1].trigger('keydown.left')
    expect(lineText.text()).toMatch('Currently on line 10/10')

  })
    */