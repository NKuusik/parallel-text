/**
 * @jest-environment jsdom
 */
/*
import { mount, render } from '@vue/test-utils'
import FileUploadForm from '../components/FileUploadForm.vue'
import { store } from '../store.js'
import vuetify from "vuetify"


test('FileUploadForm renders correctly', () => {
  const wrapper = mount(FileUploadForm)
  const submitButton = wrapper.find('v-btn')
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

  const wrapper = mount(FileUploadForm)
  const children = wrapper.findAll('*')
  console.log(children)

  const inputFields = wrapper.findAll('v-file-input')
  const fileInput = inputFields[0].findAll('*')
  console.log("inputFields")
  console.log(inputFields[0].element)
  console.log("fileInput")
  console.log(fileInput)
  const submitButton = wrapper.find('v-btn')

  inputFields[0].element.value = firstTestFile
  inputFields[1].element.setValue(secondTestFile)
  await submitButton.trigger('submit')
  expect(inputFields[0].text()).toMatch('firstTestFile.txt')
  expect(inputFields[1].text()).toMatch('secondTestFile.txt')
  store.exampleUse = false
})


test('Cannot submit empty form', async () => {
    const wrapper = mount(FileUploadForm)
    const submitButton = wrapper.find('v-btn')
    await submitButton.trigger('submit')

    //Todo
    const errorMessages = wrapper.findAll('div')
    expect(true).toBe(true)
    //expect(errorMessages[0].text()).toMatch('Required')
  })*/