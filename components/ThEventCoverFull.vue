<template>
  <div
    class="w-full h-32 bg-white bg-cover"
    :style="`background-image: url('${image}');`"
  ></div>
</template>
<script>
export default {
  name: 'ThEventCoverFull',
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
  },
  computed: {
    classInfo() {
      return `w-${this.width} h-${this.height} bg-white bg-cover`
    }
  }
}
</script>
