<template>
  <NuxtLink
    class="flex h-40  transition duration-500 ease-in-out cursor-pointer bg-cover bg-center border-b border-dark-90 rounded-lg carousel h-auto"
    :style="`background-image: url('categories/${slug}.png');`"
    :to="`/categories/${slug}`"
  >
    <div
      class="flex items-center hover:bg-red-800 hover:opacity-75 hover:rounded-lg p-5 w-full min-h-carousel"
    >
      <div
        class="w-full text-2xl text-center content-center items-center font-medium"
      ></div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'ThCategorySummary',
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
