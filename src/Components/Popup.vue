<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

  defineProps<{
    visible: boolean;
  }>();

  const emit = defineEmits(['update:visible']);

  const popup = ref<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent) => {
    if(!popup.value) return;
    if(event.target === popup.value) {
      emit('update:visible', false);
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClick);
  })

</script>

<template>
  <teleport to="body">
    <div v-if="visible" ref="popup" class="popup-overlay">
      <div class="popup-content">
        <slot />
      </div>
    </div>
  </teleport>
</template>

<style scoped>
  .popup-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .popup-content {
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
</style>