
import { mount, render } from '@vue/test-utils'
import FileUploadForm from '../components/FileUploadForm.vue'
import { store } from '../store.js'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { describe, expect, it, test } from 'vitest'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

test('FileUploadForm renders correctly', () => {
  const wrapper = mount(
    FileUploadForm, 
    {
      global: {
        plugins: [vuetify]
      }
    })
  const submitButton = wrapper.findComponent({name: 'VBtn'})
  expect(submitButton.text()).toMatch('Submit')
})

test('Valid input data is properly submitted', async () => {

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

  const wrapper = mount(
    FileUploadForm, 
    {
      global: {
        plugins: [vuetify]
      }
    })
  const children = wrapper.findAll('*')

  const inputFields = wrapper.findAllComponents({name: 'VFileInput'})
  await inputFields[0].setValue(firstTestFile)
  await inputFields[1].setValue(secondTestFile)
  
  expect(inputFields[0].text()).toMatch('firstTestFile.txt')
  expect(inputFields[1].text()).toMatch('secondTestFile.txt')
  /*
  Todo: add submission
  inputFields[0].element.value = firstTestFile
  inputFields[1].element.setValue(secondTestFile)
  await submitButton.trigger('submit')

  store.exampleUse = false
  */
})

/*
test('Cannot submit empty form', async () => {
    const wrapper = mount(FileUploadForm)
    const submitButton = wrapper.find('v-btn')
    await submitButton.trigger('submit')

    //Todo
    const errorMessages = wrapper.findAll('div')
    expect(true).toBe(true)
    //expect(errorMessages[0].text()).toMatch('Required')
  })*/