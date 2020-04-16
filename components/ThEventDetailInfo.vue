<template>
  <div class="flex items-center pb-4 text-lg">
    <ThIcon :icon="icon" class="mr-5" />
    <div>
      <div v-if="isUrl">
        <a :href="title" class="text-blue-500">{{ title }}</a>
      </div>

      <p v-else class="text-white">{{ title }}</p>
      <p class="text-sm">{{ subTitle }}</p>
    </div>
  </div>
</template>
<script>
import ThIcon from './ThIcon'

export default {
  name: 'ThEventDetailInfo',
  components: {
    ThIcon
  },
  props: {
    icon: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    subTitle: {
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
