<template>
  <div
    class="relative w-4/5 lg:w-2/5 flex-none p-5 bg-dark-70 hover:bg-dark transition duration-500 ease-in-out cursor-pointer border-b border-dark-90"
    @click="$emit('loadDetail', id, 'resources')"
  >
    <div v-if="admin" class="absolute top-0 right-0 m-4">
      <button @click="$emit('deleteFromCollection', id, 'Resource')">
        <ThIcon :icon="'Cross'" class="w-4 h-4"></ThIcon>
      </button>
    </div>
    <div>
      <div class="flex">
        <ThResourceIcon
          :icon="pageType.replace(/^\w/, (c) => c.toUpperCase())"
          class="w-4 h-4 mr-2 mt-1 text-white fill-current flex-none"
        />
        <h3 class="text-lg text-white block flex-grow">
          {{ truncate(title) }}
        </h3>
      </div>

      <p class="mt-1">{{ description }}</p>
      <ThEventCover :image="image" class="rounded-md ml-4" />
    </div>
  </div>
</template>
<script>
import ThResourceIcon from './ThResourceIcon'
import ThIcon from './ThIcon'
export default {
  name: 'ThCollectionResourceItem',
  components: {
    ThResourceIcon,
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
