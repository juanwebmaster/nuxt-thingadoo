<template>
  <img :src="url" :width="width" :height="50" class="rounded-full" />
</template>
<script>
export default {
  name: 'ThAvatar',
  props: {
    image: {
      type: String,
      default: null,
      required: true
    },
    width: {
      type: Number,
      default: 59
    },
    height: {
      type: Number,
      default: 59
    }
  },
  computed: {
    url() {
      return `https://ui-avatars.com/api/?name=${this.image}`
    }
  }
}
</script>
