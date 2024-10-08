import { mount } from '@vue/test-utils'
import App from '../App.vue'
import axios from 'axios'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { expect, test, vi } from 'vitest'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')


test('Valid data functions correctly', async () => {
    // Resolves TypeError textDisplayContainer.value.$el.scrollIntoView is not a function
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    vi.mock('axios')

    const firstTestFile = new File(
      ['This is the first test file.'], 
      'firstTestFile.txt',
      {type: "text/plain"}
    )
    const secondTestFile = new File(
      ['This is the second test file.'],
      'secondTestFile.txt',
      {type: "text/plain"}
    )
    const mockDataReceived = 
      { data: {
        first_file: 
          { title: "First mocked text",
            language: "en",
            lines: {
              raw: ['First sentence in first text', 'Second sentence in first text'],
              pos: [
                    [
                      ['some', 'KEY1'], ['PoS', 'KEY2'], ['value', 'KEY3'], 
                      ['second', 'KEY4'],['line', 'KEY5'], ['values', 'KEY6']
                    ]
                  ]
            },
          },
        second_file: 
        { title: "Second mocked text",
          language: "en",
          lines: {
            raw: ['First sentence in second text', 'Second sentence in second text'],
            pos: [
              [
                ['some', 'KEY1'], ['PoS', 'KEY2'], ['value', 'KEY3'], 
                ['second', 'KEY4'],['line', 'KEY5'], ['values', 'KEY6']
              ]
            ]
          },
        },
        comparison: [['Comparison for first line'], ['Comparison for second line']]
        } 
      }
      axios.post.mockResolvedValue(mockDataReceived)

  const wrapper = mount(
    App, 
    {
      global: {
        plugins: [vuetify]
    }
    })

    const lineSelectionComponent = wrapper.findComponent({name: 'LineSelection'})

    const lineText = lineSelectionComponent.find('p')

    const inputFields = wrapper.findAllComponents({name: 'VFileInput'})

    await inputFields[0].setValue(firstTestFile)
    await inputFields[1].setValue(secondTestFile)

    // NEED TO WAIT FOR NEXT TICK FOR EACH FILETYPE RULE!
    // Note this throws an error in ruleFileExtensionIsCorrect that is impossible to trace. 
      // It does not affect the outcome of the test though. 
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    const submitButton = wrapper.findAllComponents({name: 'VBtn'})[2]
    expect(submitButton.text()).toMatch('Submit')
    await submitButton.trigger('submit')
  
    expect(lineText.text()).toMatch('Currently on line 1/2')

    expect(wrapper.vm.currentlyDisplayedLines['usedTags']).toContain('KEY1'), 
    expect(wrapper.vm.currentlyDisplayedLines['usedTags']).toContain('KEY2'), 
    expect(wrapper.vm.currentlyDisplayedLines['usedTags']).toContain('KEY3'), 
    expect(wrapper.vm.currentlyDisplayedLines['usedTags']).toContain('KEY4'), 
    expect(wrapper.vm.currentlyDisplayedLines['usedTags']).toContain('KEY5'), 
    expect(wrapper.vm.currentlyDisplayedLines['usedTags']).toContain('KEY6'), 

    vi.resetAllMocks()
})


test('About view toggles correctly', async () => {
  // Resolves TypeError textDisplayContainer.value.$el.scrollIntoView is not a function
  window.HTMLElement.prototype.scrollIntoView = vi.fn();


const wrapper = mount(
  App, 
  {
    global: {
      plugins: [vuetify]
  }
  })
  
  expect(wrapper.vm.toggleAboutViewRef).toBe(false)
  let headLineText = wrapper.find('h1')
  expect(headLineText.text()).toMatch('Parallel text')

  const aboutButton = wrapper.findAllComponents({name: 'VBtn'})[1]
  expect(aboutButton.text()).toMatch('About')
  await aboutButton.trigger('click')
  expect(wrapper.vm.toggleAboutViewRef).toBe(true)

  headLineText = wrapper.find('h1')
  expect(headLineText.text()).toMatch('About')

})