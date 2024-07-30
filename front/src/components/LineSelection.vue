<script setup>
import { defineEmits, ref, onMounted, onUnmounted } from 'vue'
import { store } from '../store.js'

const emit = defineEmits(['updateSelectedLine'])
const currentLine = ref(0)

const chooseNextLine = () => {
	currentLine.value++
	emit('updateSelectedLine', currentLine.value)
}

const choosePreviousLine = () => {
	if (currentLine.value > 0) {
		currentLine.value--
		emit('updateSelectedLine', currentLine.value)
	}
}

const keyDownHandler = (event) => {
	if (store.isDataReceived) {
		if (event.key === 'ArrowLeft') {
			choosePreviousLine()
		} else if (event.key === 'ArrowRight') {
			chooseNextLine()
		} else if (event.key === 'Enter') {
			emit('updateSelectedLine', currentLine.value)
		}
	}
};

    onMounted(() => {
      window.addEventListener('keydown', keyDownHandler);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', keyDownHandler);
    });



</script>

<template>
    <div class="col-12">
			<p>Choose the number of the line and press enter.</p>
		</div>
			
		<div class="row">
			<div class="col-4">
			<v-btn :disabled="!store.isDataReceived" @click="choosePreviousLine" prepend-icon="mdi-arrow-left" size="small">
  				Prev
			</v-btn>
			</div>
			<div class="col-4">
				<input :disabled="!store.isDataReceived" class="form-control text-center" id="input-form" type="number" v-model="currentLine">
			</div>
			<div class="col-4">
				<v-btn :disabled="!store.isDataReceived" @click="chooseNextLine" append-icon="mdi-arrow-right" size="small">
  					Next
				</v-btn>
			</div>
			
		</div>
</template>