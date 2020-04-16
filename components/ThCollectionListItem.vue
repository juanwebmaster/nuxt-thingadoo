<template>
  <div
    class="p-5 mb-4 bg-gray-800"
    @click="$emit('loadItem', id, 'collection')"
  >
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'ThCollectionListItem',
  props: {
    id: {
      type: Number,
      required: true,
      default: null
    },
    title: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>
