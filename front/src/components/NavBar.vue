<script setup>
import { store } from '../store.js'

const handleExampleUseClick = () => {
	store.toggleExampleUse()
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container">
					<a class="navbar-brand button-universal" href="index.html"><span class="fas fa-home"></span></a>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<v-btn class="nav-link ml-auto button-universal" @click="handleExampleUseClick">Example use</v-btn>
				</div>
			</div>
		</nav> 
</template>