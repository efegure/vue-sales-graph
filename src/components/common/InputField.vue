<script setup lang="ts">
const modelValue = defineModel<string>({ default: '' })
const props = defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  displayError: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: 'text',
  },
})
</script>
<template>
  <div class="flex flex-col gap-1">
    <input
      v-model="modelValue"
      class="p-2 border border-gray-300 rounded"
      :type="props.type"
      :placeholder="props.placeholder"
    />
    <span class="text-red-500 font-medium" v-if="modelValue.length === 0 && displayError"
      >{{ props.placeholder }} is required</span
    >
  </div>
</template>
