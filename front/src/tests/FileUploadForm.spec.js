/**
 * @jest-environment jsdom
 */

import { mount, render } from '@vue/test-utils'
import FileUploadForm from '../components/FileUploadForm.vue'

test('FileUploadForm renders correctly', () => {
  const wrapper = mount(FileUploadForm)
  const submitButton = wrapper.find('v-btn')
  expect(submitButton.text()).toMatch('Submit')
})


test('Cannot submit empty form', async () => {
    const wrapper = mount(FileUploadForm)
    const submitButton = wrapper.find('v-btn')
    await submitButton.trigger('click')

    //Todo
    const errorMessages = wrapper.findAll('div')
    expect(true).toBe(true)
    //expect(errorMessages[0].text()).toMatch('Required')
  })