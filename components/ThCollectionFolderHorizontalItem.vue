<template>
  <div
    class="relative h-64 w-2/5 flex-none p-10 hover:bg-dark transition duration-500 ease-in-out cursor-pointer border-b border-dark-90"
    @click="$emit('loadDetail', id, 'collections')"
  >
    <div v-if="admin" class="absolute top-0 right-0 m-4">
      <button @click="$emit('deleteFromCollection', id, 'Collection')">
        <ThIcon :icon="'Cross'" class="w-4 h-4"></ThIcon>
      </button>
    </div>
    <div
      class="w-full text-2xl text-center content-center items-center font-medium"
    >
      <ThIcon :icon="'List'" class="w-12 h-12 mr-5" />{{ title }}
    </div>
  </div>
</template>
<script>
import ThIcon from './ThIcon'
export default {
  name: 'ThCollectionFolderHorizontalItem',
  components: {
    ThIcon
  },
  props: {
    id: {
      type: Number,
      default: 0,
      required: true
    },
    title: {
      type: String,
      default: null,
      required: true
    },
    description: {
      type: String,
      default: null,
      required: true
    },
    admin: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: ''
    },
    pageType: {
      type: String,
      default: ''
    }
  },
  methods: {
    truncate(input) {
      if (input.length > 30) {
        return input.substring(0, 30) + ' ...'
      } else {
        return input
      }
    }
  }
}
</script>
