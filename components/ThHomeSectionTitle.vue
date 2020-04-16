<template>
  <div class="border-b border-dark-80 pb-2">
    <nuxt-link
      :to="url"
      class="mb-6 mt-3 text-2xl text-green-500 mr-5 uppercase"
      >{{ title }}</nuxt-link
    >

    <span class="block sm:inline-block">{{ subTitle }}</span>
  </div>
</template>
<script>
export default {
  name: 'ThHomeSectionTitle',
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
