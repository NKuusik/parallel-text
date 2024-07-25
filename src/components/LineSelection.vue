<script setup>
import { defineEmits, ref, onMounted, onUnmounted } from 'vue'

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
	if (event.key === 'ArrowLeft') {
		choosePreviousLine()
	} else if (event.key === 'ArrowRight') {
		chooseNextLine()
	} else if (event.key === 'Enter') {
		emit('updateSelectedLine', currentLine.value)
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
			
		<div class="col-12 row">
			<div class="col-4">
			<v-btn @click="choosePreviousLine" prepend-icon="mdi-arrow-left">
  				Previous
			</v-btn>
			</div>
			<div class="col-4">
				<input id="input-form" type="number" v-model="currentLine">
			</div>
			<div class="col-4">
				<v-btn @click="chooseNextLine" append-icon="mdi-arrow-right">
  					Next
				</v-btn>
			</div>
			
		</div>
</template>