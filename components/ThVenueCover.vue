<template>
  <div
    :class="`w-${width} h-${height} bg-white bg-cover`"
    :style="`background-image: url('${image}');`"
  ></div>
</template>
<script>
export default {
  name: 'ThVenueCover',
  props: {
    image: {
      type: String,
      default: null
    },
    width: {
      type: String,
      default: '24'
    },
    height: {
      type: String,
      default: '24'
    }
  }
}
</script>
