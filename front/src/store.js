import { reactive } from 'vue'

export const store = reactive({
  isDataReceived: false,
  dataIsReceived() {
    this.isDataReceived = true
    this.currentLine = 1
  },
  exampleUse: false,
  toggleExampleUse() {
    this.exampleUse = !this.exampleUse
  },
  currentLine: 1
})
