<template>
  <div class="pb-3 px-5">
    <ThHomeSectionTitle :title="title" :sub-title="subTitle" :url="url" />
  </div>
</template>
<script>
import ThHomeSectionTitle from './ThHomeSectionTitle'

export default {
  name: 'ThHomeSection',
  components: {
    ThHomeSectionTitle
  },
  props: {
    title: {
      type: String,
      default: null
    },
    subTitle: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    }
  }
}
</script>
