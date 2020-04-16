<template>
  <div>
    <div class="flex">
      <button class="btn">
        <ThIcon icon="Star" class="w-6 h-6 md:mr-4" /><span
          class="hidden md:block"
          >Bookmark</span
        >
      </button>
      <button
        class="btn"
        @click="
          $modal.show('th-modal-collection', {
            itemId: resource.id,
            itemType: 'Resource'
          })
        "
      >
        <ThIcon icon="List" class="w-6 h-6 md:mr-4" />
        <span class="hidden md:block">Add to Collection</span>
      </button>
    </div>
  </div>
</template>

<script>
import ThIcon from './ThIcon'

export default {
  name: 'ThResourceDetailActions',
  components: {
    ThIcon
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: null
    }
  }
}
</script>
<style></style>
