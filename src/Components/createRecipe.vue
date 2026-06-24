<script setup lang="ts">
import { watch } from 'vue'
  import { useLookupsStore } from '@/Stores/lookups.ts'

  const lookups = useLookupsStore();


  const selected = defineModel<string[]>();

  watch(selected, () => {
    console.log("test val: ", selected.value);
  });

</script>

<template>
  <h1>Create Recipe</h1>
  <div>
    <form>
      <label v-for="tag in lookups.tags" :key="tag.id">
        <input type="checkbox" value="option" v-model="selected"/>
        {{ tag.name }}
      </label>
    </form>
  </div>
</template>

<style scoped>

</style>