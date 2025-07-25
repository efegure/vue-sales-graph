<script setup lang="ts">
const day = defineModel<number>({ default: 7 })
defineProps<{
  options: { value: number; label: string }[]
}>()
</script>

<template>
  <div class="flex flex-row gap-1">
    <select class="p-2 border border-gray-300 rounded" name="cars" id="cars" v-model="day">
      <option :value="7">Last 7 Days</option>
      <option :value="14">Last 14 Days</option>
      <option :value="30">Last 30 Days</option>
      <option :value="60">Last 60 Days</option>
    </select>
  </div>
</template>
