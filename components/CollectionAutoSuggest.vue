<template>
  <div
    class="text-lg mb-1 p-2 border-b hover:text-white hover:bg-gray-800 cursor-pointer border-gray-900"
  >
    <div @click="$emit('addToCollection', id, itemType)">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'CollectionAutoSuggest',
  props: {
    id: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    itemType: {
      type: String,
      default: null
    }
  }
}
</script>
