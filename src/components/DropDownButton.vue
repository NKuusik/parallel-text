<script setup>

import { defineEmits, ref } from 'vue'

const props = defineProps({
  initialButtonText: String,
  id: String
})

const emit = defineEmits(['updateSelectedLanguage'])

const currentButtonText = ref(props.initialButtonText)

const handleClick = (input) => {
  currentButtonText.value = input
  emit('updateSelectedLanguage', currentButtonText.value, props.id)
}

</script>


<template>
<div class="dropdown">
    <button class="dropbtn" :id="id">{{ currentButtonText }}</button>
    <div class="dropdown-content">
        <p @click="handleClick('ENG')">ENG</p>
        <p @click="handleClick('EST')">EST</p>
        <p @click="handleClick('GER')">GER</p>
        <p @click="handleClick('FRA')">FRA</p>
    </div>
</div>
</template>
