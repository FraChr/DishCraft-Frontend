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

    if(props.multiple)
      selectMultiple(name, current);
    else {
      selectSingle(name, current);
    }
  }

  const deselect = (name: string, current: string[]) => {
    selected.value = current.filter(n => n !== name);
  }

  const selectMultiple = (name: string, current: string[]) => {
    if(current.includes(name))
      deselect(name, current);
    else {
      selected.value = [...current, name];
    }
  }
  const selectSingle = (name: string, current: string[]) => {
    if(current.includes(name))
      deselect(name, current);
    else
      selected.value = [name]
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

  <div class="filter-wrapper">
    <h4>{{filterType}}</h4>

    <div class="button-wrapper">
      <div>
        <button @click="clearAll" class="button-clear reset-button">🗑️</button>
      </div>
      <div v-for="opt in options" :key="opt.id">
        <button
          class="button-clear filter-button"
          :class="{active: selected?.includes(opt.name)}"
          @click="selectedOption(opt.name)">{{opt.name}}</button>
      </div>

    </div>
  </div>

</template>

<style scoped>

  .reset-button {
    cursor: pointer;
  }

  .filter-button.active {
      background: darkgray;
  }

  .button-clear.filter-button {
    cursor: pointer;
    border: 0.2rem solid black;
    border-radius: 0.5rem;
    padding: 0.3rem;
  }



  .filter-wrapper {
    /*border: 0.2rem solid black;*/
    border-top: 0.2rem solid black;
    border-left: 0.2rem solid black;
    border-right: 0.2rem solid black;
    border-bottom: 0.2rem solid rgba(0,0,0, 0.59);
    padding: 0.3rem;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .button-clear {
    background: none;
    border: none;
    font: inherit;
  }

  .button-wrapper  {
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