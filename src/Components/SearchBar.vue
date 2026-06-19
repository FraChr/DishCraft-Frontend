<script setup lang="ts">
  import { ref } from 'vue'

  const model = defineModel<string>({default: ''});
  const emit = defineEmits<{search: [value: string]}>()
  const search = () => {
    emit('search', model.value)
  }

</script>

<template>
  <div class="searchBar-container">
    <input
      v-model="model"
      placeholder="Search by name or ingredient"
      @keyup.enter="search"
    />
    <button @click="search">search</button>
  </div>
</template>

<style scoped>
.searchBar-container {
  display: flex;
  gap: 0.5rem;
  align-items: stretch;
  margin: 1rem 0.5rem;
}

input {
  flex: 1;
  padding: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
}
</style>
