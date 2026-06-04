<script setup lang="ts">

</script>

<template>
  <div class="searchBar-container">
    <input placeholder="TESTING"/>
    <button>search</button>
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