<script setup>
import { ref, onUpdated, onMounted } from "vue";

const props = defineProps({
    currentLanguages: Array,
});
const emit = defineEmits(["updateFilterSelection"]);

const emitFilterValuechange = () => {
  emit("updateFilterSelection", selectedFilterTypeRef.value);
};

const compulsoryFilterTypes = [
  {
    title: "Highlight differences",
    value: "diff",
  },
  {
    title: "None",
    value: null,
  },
];

const extendedFilterTypes = [
  {
    title: "Display Parts of Speech",
    value: "pos",
  },
].concat(compulsoryFilterTypes);

const filterTypesRef = ref(extendedFilterTypes);

const selectedFilterTypeRef = ref(filterTypesRef.value[0].value);

const isPosSupported = () => {
  return (
    props.currentLanguages[0] === "en" ||
    props.currentLanguages[1] === "en"  
  );
};

onMounted(() => {
    emit("updateFilterSelection", selectedFilterTypeRef.value);
})

onUpdated(() => {
  // Changing refs onUpdated is risky business
  // which is why these conditions have to be strictly defined
  // and mutually exclusive.
  if (filterTypesRef.value.length === 3 && !isPosSupported()) {
    filterTypesRef.value = compulsoryFilterTypes;
    selectedFilterTypeRef.value = filterTypesRef.value[0].value;
  } else if (filterTypesRef.value.length === 2 && isPosSupported()) {
    filterTypesRef.value = extendedFilterTypes;
    selectedFilterTypeRef.value = filterTypesRef.value[0].value;
  }
  emit("updateFilterSelection", selectedFilterTypeRef.value);
});
</script>

<template>
  <div>
    <v-select
      v-model="selectedFilterTypeRef"
      @update:modelValue="emitFilterValuechange"
      label="Filter"
      :items="filterTypesRef"
      variant="outlined"
    >
      <!-- Provides background color for selection -->
      <template #prepend-item>
        <v-card flat class="dropdown-selection" />
      </template>
    </v-select>
  </div>
</template>
