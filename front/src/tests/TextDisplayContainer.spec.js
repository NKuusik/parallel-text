
import { mount } from '@vue/test-utils'
import TextDisplayContainer from '../components/TextDisplayContainer.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { expect, test } from 'vitest'

const vuetify = createVuetify({
  components,
  directives,
})

const createTestDisplayedTextObject = 
  (
  first_lang='en',
  second_lang='en',
  first_text='Identical line', 
  second_text='Identical line',
  first_pos=[['Identical', 'ADJ'],['line', 'N']],
  second_pos=[['Identical', 'ADJ'],['line', 'N']],
  comparison=undefined,
  usedTags = new Set(['ADJ', 'N'])
  ) => {
  const testPropdisplayedTextObject = {
    lines: [
      {
        language: first_lang,
        raw: first_text,
        pos: first_pos
      },
      {
        language: second_lang,
        raw: second_text,
        pos: second_pos
      }
    ],
    comparison: comparison,
    usedTags: usedTags
  }
  return testPropdisplayedTextObject
}


const testPropLanguageTable = {
    en: 'English'
  }

  const testPropPosTable = {
    'ADJ': 'Adjective',
    'N': 'Noun'
  }

global.ResizeObserver = require('resize-observer-polyfill')

test('TextDisplayContainer without lines in displayedTextObject does not display anything', () => {
  const wrapper = mount(TextDisplayContainer, {
    props: {
      displayedTextObject: {
        lines: [null, null],
        comparison: null,
        usedTags: new Set()
        }
    },

    global: {
      plugins: [vuetify]
    } 
  })

  expect(wrapper.find('div').exists()).toBe(false)
})


test('TextDisplayContainer with identical lines in displayedTextObject displays these lines properly', async () => {
  const wrapper = mount(TextDisplayContainer, {
    props: {
      displayedTextObject: createTestDisplayedTextObject(),
      languageTable: testPropLanguageTable,
      posTable: testPropPosTable
    },
    global: {
      plugins: [vuetify]
    } 
  })
  await wrapper.vm.$nextTick()

  const lines = wrapper.findAll('.displayed-texts')
  expect(lines[0].text()).toMatch('Identical  line')
  expect(lines[1].text()).toMatch('Identical  line')

  expect(wrapper.vm.receivedFilterTypeRef).toBe('pos');
  const posTags = wrapper.findAll('.pos-entry')

  expect(posTags[2].text()).toMatch('Identical')
  expect(posTags[3].text()).toMatch('line')
  expect(posTags[4].text()).toMatch('Identical')
  expect(posTags[5].text()).toMatch('line')

}) 

test('TextDisplayContainer with different lines in displayedTextObject displays these lines properly in POS view', async () => {
  const wrapper = mount(TextDisplayContainer, {
    props: {
      displayedTextObject: createTestDisplayedTextObject(
        'en',
        'en',
        'First line', 
        'Second line',
        [['First', 'ADJ'],['line', 'N']],
        [['Second', 'ADJ'],['line', 'N']],
        [['Some comparison']],
        new Set(['ADJ', 'N'])),
      languageTable: testPropLanguageTable,
      posTable: testPropPosTable
    },
    global: {
      plugins: [vuetify]
    } 
  })

  await wrapper.vm.$nextTick()

  const lines = wrapper.findAll('.displayed-texts')
  expect(lines[0].text()).toMatch('First  line')
  expect(lines[1].text()).toMatch('Second  line')

})

test('Choosing comparison filter works properly', async () => {
  const wrapper = mount(TextDisplayContainer, {
    props: {
      displayedTextObject: createTestDisplayedTextObject(
        'en',
        'en',
        'This is the first test text.', 
        'This is the second test text.',
        // Ignore POS for this test
        [],
        [],
        [['This is the '], ['first test text ', 'second test text'], ['in comparison mode.', '.']],
        new Set()),
      languageTable: testPropLanguageTable,
      posTable: testPropPosTable 
    },
    global: {
      plugins: [vuetify]
    } 
  })

  // This is a way how to access component refs.
  expect(wrapper.vm.receivedFilterTypeRef).toBe('pos');

  let lines = wrapper.findAll('.displayed-texts');
  expect(lines[0].text()).toMatch('');
  expect(lines[1].text()).toMatch('');

  const filterSelect = wrapper.findComponent({name: 'VSelect'});
  expect(filterSelect.exists()).toBeTruthy();

  await filterSelect.vm.$emit('update:modelValue', 'diff');
  expect(wrapper.vm.receivedFilterTypeRef).toBe('diff');
  //await filterSelect.trigger('click')
  
  // Need to explicitly reassign in order to get updated values.
  lines = wrapper.findAll('.displayed-texts');
  expect(lines[0].text()).toMatch('This is the first test text in comparison mode.');
  expect(lines[1].text()).toMatch('This is the second test text.');
})

test('Default to regular view with comparison filter if there is no comparison data', async () => {
  const wrapper = mount(TextDisplayContainer, {
    props: {
      displayedTextObject: createTestDisplayedTextObject(
        'en',
        'en',
        'First line in regular view', 
        'Second line in regular view',
        [],
        [],
        undefined,
        new Set(['ADJ', 'N'])),
      languageTable: testPropLanguageTable,
      posTable: testPropPosTable
    },
    global: {
      plugins: [vuetify]
    } 
  })

  const filterSelect = wrapper.findComponent({name: 'VSelect'});
  await filterSelect.vm.$emit('update:modelValue', 'diff');
  expect(wrapper.vm.receivedFilterTypeRef).toBe('diff');

  const lines = wrapper.findAll('.displayed-texts')
  expect(lines[0].text()).toMatch('First line in regular view')
  expect(lines[1].text()).toMatch('Second line in regular view')
})


test('Disabling/enabling PoS filter depending on whether displayedTextObject contains English text', async () => {
  
  const wrapper = mount(TextDisplayContainer, {
    props: {
      displayedTextObject: createTestDisplayedTextObject(
        'et',
        'fr',
        'Eestikeelne tekst', 
        'Bonjour',
        [],
        [],
        [['Eestikeelne tekst', 'Bonjour']],
        new Set()),
      languageTable: testPropLanguageTable,
      posTable: testPropPosTable
    },
    global: {
      plugins: [vuetify]
    } 
  })
 
  // As neither language supports PoS, default filter is 'diff'
  await wrapper.vm.$nextTick()

  const filterSelectionForm = wrapper.findAllComponents({name: 'FilterSelectionForm'})
  expect(filterSelectionForm[0].vm.selectedFilterTypeRef).toBe('diff');
  expect(filterSelectionForm[0].vm.filterTypesRef.length).toBe(2);

  // After changing input text to English, default filter is 'pos'
  await wrapper.setProps({displayedTextObject: createTestDisplayedTextObject()})
  expect(filterSelectionForm[0].vm.selectedFilterTypeRef).toBe('pos')
  expect(filterSelectionForm[0].vm.filterTypesRef.length).toBe(3);
})