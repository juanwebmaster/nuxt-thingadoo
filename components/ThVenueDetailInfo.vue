<template>
  <div class="flex items-center py-5">
    <ThIcon :icon="icon" class="mr-5" />
    <div>
      <p class="text-white">{{ title }}</p>
      <p class="text-sm">{{ subTitle }}</p>
    </div>
  </div>
</template>
<script>
import ThIcon from './ThIcon'

export default {
  name: 'ThVenueDetailInfo',
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
  }
}
</script>
