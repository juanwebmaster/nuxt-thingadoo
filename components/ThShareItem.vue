<template>
  <div class="flex">
    <button
      class="btn"
      @click="
        $modal.show('th-modal-share', {
          item: item
        })
      "
    >
      <ThIcon
        icon="Share"
        :class="`w-6 h-6 md:mr-4 text-white fill-current`"
      /><span class="hidden md:block">{{ labelText }}</span>
    </button>
  </div>
</template>

<script>
import ThIcon from './ThIcon'
export default {
  name: 'ThShareItem',
  components: { ThIcon },
  props: {
    item: {
      type: Object,
      required: true,
      default: null
    },
    size: {
      type: Number,
      default: 6
    },
    labelText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.btn {
  @apply bg-primary-80 text-white;
}
.btn:hover {
  @apply bg-primary-70;
}
</style>
