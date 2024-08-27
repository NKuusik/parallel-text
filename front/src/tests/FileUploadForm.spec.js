
import { mount } from '@vue/test-utils'
import FileUploadForm from '../components/FileUploadForm.vue'
import { store } from '../store.js'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { expect, test } from 'vitest'

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

test('Valid input data does not raise validation error', async () => {

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

  const inputFields = wrapper.findAllComponents({name: 'VFileInput'})
  await inputFields[0].setValue(firstTestFile)
  await inputFields[1].setValue(secondTestFile)

  expect(inputFields[0].text()).toMatch('firstTestFile.txt')
  expect(inputFields[1].text()).toMatch('secondTestFile.txt')
})


test('Using example mode provides example input files', async () => {

  const wrapper = mount(
    FileUploadForm, 
    {
      global: {
        plugins: [vuetify]
      }
    })
  const inputFields = wrapper.findAllComponents({name: 'VFileInput'})

  store.exampleUse = true
  await wrapper.vm.$nextTick()
  expect(inputFields[0].text()).toMatch('firstExample.txt')
  expect(inputFields[1].text()).toMatch('secondExample.txt')

})

test('Empty form raises validation error', async () => {

  const wrapper = mount(
    FileUploadForm, 
    {
      global: {
        plugins: [vuetify]
      }
    })
    const submitButton = wrapper.findComponent({name: 'VBtn'})

    await submitButton.trigger('submit')

    const errorMessages = wrapper.findAll('.v-messages__message')

    expect(errorMessages[0].text()).toMatch('Required')
  })

  test('Too long filename raises validation error', async () => {
    const firstTestFile = new File(
      ['This is the first test file.'], 
      'firstTestFileIsVeryLoooooooooooooooooooooooooooooooong.txt',
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

      const inputFields = wrapper.findAllComponents({name: 'VFileInput'})
      await inputFields[0].setValue(firstTestFile)
      await inputFields[1].setValue(secondTestFile)
      const submitButton = wrapper.findComponent({name: 'VBtn'})
  
      await submitButton.trigger('submit')
  
      const errorMessages = wrapper.findAll('.v-messages__message')
  
      expect(inputFields[0].text()).toMatch('')
      expect(inputFields[1].text()).toMatch('secondTestFile.txt')
      expect(errorMessages[0].text()).toMatch('File name is too long')
    })



  test('Empty file raises validation error', async () => {

    

    const firstTestFile = new File(
      [''], 
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

      const inputFields = wrapper.findAllComponents({name: 'VFileInput'})
      await inputFields[0].setValue(firstTestFile)
      await inputFields[1].setValue(secondTestFile)
      const submitButton = wrapper.findComponent({name: 'VBtn'})
  
      await submitButton.trigger('submit')
  
      const errorMessages = wrapper.findAll('.v-messages__message')
  
      expect(inputFields[0].text()).toMatch('')
      expect(inputFields[1].text()).toMatch('secondTestFile.txt')
      expect(errorMessages[0].text()).toMatch('File is empty')
    })


  test('Invalid file extension raises validation error', async () => {

    const firstTestFile = new File(
      ['This is the first test file'], 
      'firstTestFile.exe',
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

      const inputFields = wrapper.findAllComponents({name: 'VFileInput'})
      await inputFields[0].setValue(firstTestFile)
      await inputFields[1].setValue(secondTestFile)
      const submitButton = wrapper.findComponent({name: 'VBtn'})
  
      await submitButton.trigger('submit')
  
      const errorMessages = wrapper.findAll('.v-messages__message')
      expect(inputFields[0].text()).toMatch('')
      expect(inputFields[1].text()).toMatch('secondTestFile.txt')
      expect(errorMessages[0].text()).toMatch('Only .txt files are permitted')
    })

// Todo: investigate why this fails.
/*
  test('Invalid file type raises validation error', async () => {

    const firstTestFile = new File(
      ['This is the first test file'], 
      'firstTestFile.txt',
      {type: "text/javascript"}
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

      const inputFields = wrapper.findAllComponents({name: 'VFileInput'})
      await inputFields[0].setValue(firstTestFile)
      await inputFields[1].setValue(secondTestFile)
      const submitButton = wrapper.findComponent({name: 'VBtn'})
  
      await submitButton.trigger('submit')
  
      const errorMessages = wrapper.findAll('.v-messages__message')
      expect(inputFields[0].text()).toMatch('')
      expect(inputFields[1].text()).toMatch('secondTestFile.txt')
      expect(errorMessages[0].text()).toMatch('Plain text file required.')
    })*/