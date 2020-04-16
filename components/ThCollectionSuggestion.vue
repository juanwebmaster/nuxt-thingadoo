<template>
  <div>
    <div class="flex">
      <div class="flex-grow text-white text-xl mb-3">
        <nuxt-link :to="`/events/${slug}`">{{ title }}</nuxt-link>
      </div>
      <div>
        <div class="flex">
          <div
            class="mr-3 text-blue-500 text-lg hover:underline cursor-pointer"
            @click="$emit('handleSuggestion', id, 'accept')"
          >
            accept
          </div>
          <div
            class="text-blue-500 text-lg hover:underline cursor-pointer"
            @click="$emit('handleSuggestion', id, 'reject')"
          >
            reject
          </div>
        </div>
      </div>
    </div>
    <div class="flex px-3">{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: 'ThCollectionSuggestion',
  props: {
    id: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    slug: {
      type: String,
      default: null
    }
  }
}
</script>
