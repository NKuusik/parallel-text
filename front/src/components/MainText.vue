<script setup>
import { store } from '../store.js'

</script>

<template>
    <div class="col-12">
			<h1>Parallel text</h1>
			<p>This website allows to compare two input texts line by line.</p>
			<p v-if="!store.exampleUse">Pick input texts in .txt format.</p>
			<p v-else>Example mode enabled, using pre-defined text</p>
		</div>
</template>