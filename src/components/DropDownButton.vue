<script setup>

const props = defineProps({
  buttonText: String,
  id: String
})

</script>


<template>
<div class="dropdown">
    <button class="dropbtn" :id="id">{{ buttonText }}</button>
    <div class="dropdown-content">
        <p>ENG</p>
        <p>EST</p>
        <p>GER</p>
        <p>FRA</p>
    </div>
</div>
</template>
