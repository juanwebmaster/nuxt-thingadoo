<template>
  <div
    class="cursor-pointer"
    @click="
      $modal.show('th-modal-share', {
        item: item
      })
    "
  >
    <ThIcon icon="Share" class="w-6 h-6 text-blue fill-current" />
  </div>
</template>

<script>
import ThIcon from './ThIcon'
export default {
  name: 'ThShareItemSimple',
  components: { ThIcon },
  props: {
    item: {
      type: Object,
      required: true,
      default: null
    }
  }
}
</script>
