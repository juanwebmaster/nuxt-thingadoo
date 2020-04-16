<template>
  <div class="flex">
    <div class="text-xl block text-gray-400 leading-tight">{{ title }}</div>
    <span class="block">{{ $moment(date).format('llll') }}</span>
    <a href="/">{{ address }}</a>
    <p>{{ location }}</p>
  </div>
</template>
<script>
export default {
  name: 'ThEventListItemDescription',
  props: {
    title: {
      type: String,
      default: null,
      required: true
    },
    date: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: null
    },
    address: {
      type: String,
      default: null
    },
    eventType: {
      type: String,
      default: 'Conventional'
    }
  }
}
</script>
<style scoped>
a:hover {
  @apply underline;
}
</style>
