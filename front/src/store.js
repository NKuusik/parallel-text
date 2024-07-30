import { reactive } from 'vue'

export const store = reactive({
  isDataReceived: false,
  dataIsReceived() {
    this.isDataReceived = true
  }
})