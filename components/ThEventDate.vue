<template>
  <time :datetime="date" class="w-12 mx-2 text-center">
    <span class="text-4xl block">{{ $moment(date).format('D') }}</span>
    <span class="uppercase block text-sm">{{
      $moment(date).format('MMM')
    }}</span>
  </time>
</template>
<script>
export default {
  name: 'TheEventDate',
  props: {
    date: {
      type: String,
      default: null,
      required: true
    }
  }
}
</script>
