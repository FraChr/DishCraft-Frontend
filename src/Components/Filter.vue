<script setup lang="ts">
  import type { Lookup } from '@/Types/Lookup.ts'

  const props = defineProps<{
    options: Lookup[];
    filterType: string;
    multiple: boolean;
  }>();


  const selected = defineModel<string[]>();
  const getSelected = () => selected.value ?? [];


  const selectedOption = (name: string) => {
    const current = getSelected();

    if(!props.multiple) selected.value = [name];
    else {
      if(current.includes(name))
        selected.value = current.filter(n => n !== name);
      else {
        selected.value = [...current, name];
      }
    }
  }

  const clearAll = () => {
    selected.value = [];
  }

</script>

<template>
<!--  <div class="filter-popup">
    <select v-model="selected" class="filter-select">
      <option :value="null">Select</option>
      <option v-for="opt in options" :key="opt.id" :value="opt.name">
        {{opt.name}}
      </option>
    </select>
  </div>-->

  <div class="wrapper">
    <h4>{{filterType}}</h4>
    <button @click="clearAll">clear all</button>
    <div v-for="opt in options" :key="opt.id">
      <button
        :class="{active: selected?.includes(opt.name)}"
        @click="selectedOption(opt.name)">{{opt.name}}</button>
    </div>

  </div>

</template>

<style scoped>
  .wrapper  {
    max-width: 20rem;
    display: flex;
    flex-direction: row;
    overflow: auto;
    gap: 0.5rem;
  }

  .filter-select {
    /*margin: 0.4rem;
    padding: 0.2rem;*/

    flex-direction: row;
    gap: 1rem;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: row;
  }

  select{
    margin: 0.4rem;
    padding: 0.2rem;
  }


</style>