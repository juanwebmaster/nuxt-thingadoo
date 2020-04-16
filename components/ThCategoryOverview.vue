<template>
  <div class="mt-4 p-5">
    <div class="mb-5">
      <div class="flex">
        <ThIcon :icon="'List'" class="w-12 h-12 mr-4" />
        <h2 class="text-3xl text-white mb-4 flex-grow">
          {{ category.title }}
        </h2>
        <ThShareItem :item="category"></ThShareItem>
      </div>
      <p class="text-xl">{{ category.description }}</p>
    </div>
  </div>
</template>

<script>
import ThIcon from './ThIcon'
import ThShareItem from './ThShareItem'

export default {
  components: {
    ThShareItem,
    ThIcon
  },
  props: {
    category: {
      type: Object,
      required: true,
      default: null
    }
  }
}
</script>

<style></style>
