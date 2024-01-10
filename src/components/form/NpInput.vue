import type { emitChangeFn } from 'element-plus';
<script setup lang="ts">
defineProps({
  value: {
    type: String,
    required: true,
  },
})

const emit = defineEmits<{
  input: [e: Event]
  blur: []
}>()

function handleInput(e: Event) {
  emit('input', e)
}

function handleBlur() {
  emit('blur')
}
</script>

<template>
  <input
    class="border focus:outline focus:outline-blue-300 w-full px-2"
    :value="value"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>
