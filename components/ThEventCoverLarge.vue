<template>
  <div
    class="w-2/5 h-48 bg-white bg-cover"
    :style="`background-image: url('${image}'); background-position:center;`"
  ></div>
</template>
<script>
export default {
  name: 'ThEventCover',
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
