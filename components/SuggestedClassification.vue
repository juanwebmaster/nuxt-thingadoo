<template>
  <div class="bg-dark-80 ml-2 p-2 flex">
    <div class="mr-2">{{ label }}</div>

    <div
      class="text-white font-semibold cursor-pointer hover:text-blue-500"
      @click="$emit('removeClick', label)"
    >
      x
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: null
    }
  }
}
</script>

<style></style>
