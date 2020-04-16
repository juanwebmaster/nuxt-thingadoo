<template>
  <div
    class="w-24 h-24 bg-white bg-cover relative"
    :style="`background-image: url('${image}'); background-position:center;`"
  >
    <span
      class="absolute bottom-0 w-full text-center text-black uppercase bg-green-500"
      >{{ label }}</span
    >
  </div>
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
    },
    label: {
      type: String,
      default: null
    }
  },
  computed: {
    classInfo() {
      return `w-${this.width} h-${this.height} bg-white bg-cover`
    }
  }
}
</script>
