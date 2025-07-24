<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
const { state } = useStore()

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
<template>
  <div class="mx-8 my-12 h-full">
    <h1>Chart page</h1>
  </div>
</template>
