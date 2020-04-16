<template>
  <div class="flex items-center pb-4 text-lg">
    <ThIcon :icon="icon" class="mr-5" />
    <div>
      <span class="text-white">{{ start }}</span>
      <span v-if="end" class="text-white">- {{ end }}</span>
    </div>
  </div>
</template>
<script>
import ThIcon from './ThIcon'

export default {
  name: 'ThEventDetailTime',
  components: {
    ThIcon
  },
  props: {
    icon: {
      type: String,
      default: null
    },
    start: {
      type: String,
      default: null
    },
    end: {
      type: String,
      default: null
    }
  },
  computed: {
    isUrl() {
      return this.title.includes('http')
    }
  }
}
</script>
