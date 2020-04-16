<template>
  <div class="flex item-stretch">
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
          itemId: event.id,
          itemType: 'Possibility'
        })
      "
    >
      <ThIcon icon="List" class="w-6 h-6 md:mr-4" />
      <span class="hidden md:block">Add to Collection</span>
    </button>
    <ThAddToCalendar
      :title="event.title"
      :details="event.description"
      :start-date="event.formatted_start_date"
      :end-date="event.formatted_end_date"
      :location="event.location"
    >
    </ThAddToCalendar>
  </div>
</template>

<script>
import ThIcon from './ThIcon'
import ThAddToCalendar from './ThAddToCalendar'

export default {
  name: 'ThEventDetailActions',
  components: {
    ThIcon,
    ThAddToCalendar
  },
  props: {
    event: {
      type: Object,
      required: true,
      default: null
    }
  }
}
</script>
<style>
.btn {
  @apply p-3 h-12 flex bg-dark-70 border border-dark-80 mr-5 uppercase leading-snug rounded-md transition duration-500 ease-in-out;
}
.btn:hover {
  @apply bg-dark-80;
}
</style>
