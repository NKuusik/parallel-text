<script setup>
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from 'vue'
import { store } from '../store.js'


const props = defineProps({
	maxLines: Number
})

const emit = defineEmits(['updateSelectedLine'])
const currentLine = ref(1)
const prevButtonStyleRef = ref(false)
const nextButtonStyleRef = ref(false)

const chooseNextLine = () => {
	if (currentLine.value < props.maxLines) {
		currentLine.value++
	} else {
		currentLine.value = 1
	}

	emit('updateSelectedLine', currentLine.value)
}

const choosePreviousLine = () => {
	if (currentLine.value > 1) {
		currentLine.value--
	} else {
		currentLine.value = props.maxLines
	}
	emit('updateSelectedLine', currentLine.value)
}

const keyDownHandler = (event) => {
	if (store.isDataReceived) {
		if (event.key === 'ArrowLeft') {
			prevButtonStyleRef.value = true
			choosePreviousLine()
		} else if (event.key === 'ArrowRight') {
			nextButtonStyleRef.value = true
			chooseNextLine()
		} else if (event.key === 'Enter') {

			if (currentLine.value < 1) {
				currentLine.value = 1
			} else if (currentLine.value > props.maxLines) {
				currentLine.value = props.maxLines
			}
			emit('updateSelectedLine', currentLine.value)
		}
	}
};

const keyUpHandler = () => {
	prevButtonStyleRef.value = false
	nextButtonStyleRef.value = false
};

    onMounted(() => {
      window.addEventListener('keydown', keyDownHandler);
    });

    onMounted(() => {
      window.addEventListener('keyup', keyUpHandler);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', keyDownHandler);
    });

	onUnmounted(() => {
      window.removeEventListener('keyup', keyUpHandler);
    });
</script>

<template>
    <div class="col-12">
			<p>Currently on line {{currentLine}}/{{ maxLines }}</p>
			<p>Choose the number of the line and press enter.</p>
		</div>
			
		<div class="row">
			<div class="col-4">
			<v-btn :class="{ 'active-button': prevButtonStyleRef }" :disabled="!store.isDataReceived" @click="choosePreviousLine" prepend-icon="mdi-arrow-left" size="small">
  				Prev
			</v-btn>
			</div>
			<div class="col-4">
				<input :disabled="!store.isDataReceived" class="form-control text-center" id="input-form" type="number" v-model="currentLine">
			</div>
			<div class="col-4">
				<v-btn :class="{ 'active-button': nextButtonStyleRef }" :disabled="!store.isDataReceived" @click="chooseNextLine" append-icon="mdi-arrow-right" size="small">
  					Next
				</v-btn>
			</div>
			
		</div>
</template>