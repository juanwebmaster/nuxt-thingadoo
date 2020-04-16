<template>
  <div class="mb-10">
    <div class="p-5 mb-1 bg-gray-800">
      {{ title }}
    </div>
    <div v-if="adminIds.includes(user.id)">
      <nuxt-link :to="{ name: 'edit-collection', params: { slug: slug } }"
        >edit</nuxt-link
      >
      <button @click="$emit('delete', id)">delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThCollectionAdminListItem',
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
    },
    adminIds: {
      type: Array,
      default: null
    },
    user: {
      type: Object,
      required: true,
      default: null
    },
    slug: {
      type: String,
      default: null
    }
  }
}
</script>
<style scoped>
a,
button {
  @apply text-blue-500;
}
</style>
