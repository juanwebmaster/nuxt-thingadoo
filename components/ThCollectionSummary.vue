<template>
  <NuxtLink
    class="flex h-40  transition duration-500 ease-in-out cursor-pointer bg-cover bg-center border-b border-dark-90 rounded-lg carousel h-auto"
    :style="`background-image: url('collections/${slug}.png');`"
    :to="`/collections/${slug}`"
  >
    <div
      class="flex items-center hover:bg-blue-800 hover:text-white p-5 w-full min-h-carousel"
    >
      <div
        class="w-full text-2xl text-center content-center items-center font-medium"
      >
        {{ title }}
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'ThCollectionSummary',
  props: {
    id: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.carousel {
  width: auto !important;
  display: flex !important;
}
</style>
